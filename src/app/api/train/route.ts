import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

const webhook_url = process.env.SITE_URL || 'https://ec97-183-209-148-237.ngrok-free.app'

async function validateUserCredits(userId: string) {
    const { data: userCredits, error } = await supabaseAdmin.from("credits").select("*").eq("user_id", userId).single();
    if (error) {
        throw new Error("Error getting user credits")
    }
    const credits = userCredits?.model_training_count ?? 0;
    if (credits <= 0) {
        throw new Error("No credits left for training!")
    }
    return credits
}

export async function POST(request: NextRequest) {
    try {
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error("The replicate api token is not set!")
        }
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401 })
        }
        const formData = await request.formData();
        const input = {
            fileKey: formData.get("fileKey") as string,
            modelName: formData.get("modelName") as string,
            gender: formData.get("gender") as string
        }
        console.log("input:", input)
        if (!input.fileKey || !input.modelName) {
            return NextResponse.json({
                error: "Missing required fields!"
            }, { status: 400 })
        }

        const oldCredits = await validateUserCredits(user?.id)

        const fileName = input.fileKey.replace("training_data/", "");
        const { data: fileUrl } = await supabaseAdmin.storage.from("training_data").createSignedUrl(fileName, 3600);

        if (!fileUrl?.signedUrl) {
            throw new Error("Failed to get the file URL")
        }
        console.log(fileUrl)
        //create model first
        // const hardware = await replicate.hardware.list()
        // console.log("hardware:", hardware)
        const modelId = `${user.id}_${Date.now()}_${input.modelName.toLowerCase().replaceAll(" ", "_")}`
        await replicate.models.create("geallenboy", modelId, {
            visibility: "private",
            hardware: "gpu-a100-large"
        })

        //start training
        const training = await replicate.trainings.create(
            "ostris",
            "flux-dev-lora-trainer",
            "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
            {
                // You need to create a model on Replicate that will be the destination for the trained version.
                destination: `geallenboy/${modelId}`,
                input: {
                    steps: 1200,
                    resolution: "1024",
                    input_images: fileUrl.signedUrl,
                    trigger_word: "GJL",

                    // lora_rank: 16,
                    // optimizer: "adamw8bit",
                    // batch_size: 1,
                    // autocaption: true,
                    // learning_rate: 0.0004,
                    // wandb_project: "flux_train_replicate",
                    // wandb_save_interval: 100,
                    // caption_dropout_rate: 0.05,
                    // cache_latents_to_disk: false,
                    // wandb_sample_interval: 100
                },
                webhook: `${webhook_url}/api/webhooks/training?userId=${user.id}&modelName=${encodeURIComponent(input.modelName)}&fileName=${encodeURIComponent(fileName)}`,
                webhook_events_filter: ["completed"]
            }
        );
        console.log(training)
        //add model vlues in the supabase

        await supabaseAdmin.from("models").insert({
            model_id: modelId,
            user_id: user.id,
            model_name: input.modelName,
            gender: input.gender,
            training_status: training.status,
            trigger_word: "GJL",
            training_steps: 1200,
            training_id: training.id
        })
        //update credits

        await supabaseAdmin.from("credits").update({ model_training_count: oldCredits - 1 }).eq("user_id", user?.id)

        return NextResponse.json({
            success: true
        }, {
            status: 201
        })

    } catch (error) {
        console.log("Training Error:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to starrt the model training"
        return NextResponse.json({
            error: errorMessage
        }, { status: 500 })

    }
}