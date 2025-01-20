import { NextResponse } from "next/server"
import Replicate from "replicate";
import crypto from "crypto"
import { supabaseAdmin } from "@/lib/supabase/admin";
import { Resend } from 'resend';
import EmailTemplate from "@/components/email-telplates/email-template";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})
const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {

    try {
        const body = await req.json()
        const url = new URL(req.url)
        const userId = url.searchParams.get("userId") ?? ""
        const modelName = url.searchParams.get("modelName") ?? ""
        const fileName = url.searchParams.get("fileName") ?? ""

        // to validate the webhook
        const webhookId = req.headers.get("webhook-id") ?? ""
        const webhookTimestamp = req.headers.get("webhook-timestamp") ?? ""
        const webhookSignature = req.headers.get("webhook-signature") ?? ""

        const signedContent = `${webhookId}.${webhookTimestamp}.${JSON.stringify(body)}`
        const secret = await replicate.webhooks.default.secret.get();

        // Base64 decode the secret
        const secretBytes = Buffer.from(secret.key.split('_')[1], "base64");
        const signature = crypto
            .createHmac('sha256', secretBytes)
            .update(signedContent)
            .digest('base64');


        const expectedSignatures = webhookSignature.split(' ').map(sig => sig.split(',')[1]);
        const isValid = expectedSignatures.some(expectedSignature => expectedSignature === signature);
        if (!isValid) {
            return new NextResponse("Invalid signature", { status: 401 })
        }
        //get user data

        console.log(isValid);
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
        if (userError || !userData) {
            return new NextResponse("User not found!", { status: 401 })
        }

        const userEmail = userData.user.email ?? ""
        const userName = userData.user.user_metadata.fullName ?? ""
        console.log(body.status, userEmail, userName, "==>")
        if (body.status === "succeeded") {
            //send asuccessfuly status email
            await resend.emails.send({
                from: 'garron AI <onboarding@resend.dev>',
                to: [userEmail],
                subject: 'Model Training Completed',
                react: EmailTemplate({ userName, message: "Your model training has been completed!" }),
            });
            //update the supabase models table
            await supabaseAdmin.from("models").update({
                training_status: body.status,
                training_time: body.metrics?.total_time ?? null,
                version: body.output?.version.split(":")[1] ?? null,
            }).eq("user_id", userId).eq("model_name", modelName)
        } else {
            //handle the failed and the canceled status
            await resend.emails.send({
                from: 'garron AI <onboarding@resend.dev>',
                to: [userEmail],
                subject: `Model Training ${body.status}`,
                react: EmailTemplate({ userName, message: `Your model training has been ${body.status}!` }),
            });
            //update the supabase models table
            await supabaseAdmin.from("models").update({
                training_status: body.status,
            }).eq("user_id", userId).eq("model_name", modelName)

            //getting old credits
            const { data: userCredits, error: creditsError } = await supabaseAdmin.from("credits").select("model_training_count").eq("user_id", userId).single();
            if (creditsError) {
                throw new Error("Error getting user credits")
            }
            //updating the credits
            await supabaseAdmin.from("credits").update({ model_training_count: userCredits?.model_training_count + 1 }).eq("user_id", userId).single();

        }
        //delete the training data from supabase storage
        await supabaseAdmin.storage.from("training_data").remove([`${fileName}`])
        return new NextResponse("OK", { status: 200 })
    } catch (error) {
        console.log("Webhooks error:", error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}