import { createServer } from "@/lib/supabase/server";
import { Tables } from "@datatypes.types";


interface CreditResponse {
    error: string | null;
    success: boolean;
    data: Tables<"credits"> | null;
}

export async function getCreditsAction(): Promise<CreditResponse> {
    const supabase = await createServer()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: creditsData, error } = await supabase.from("ai_image_credits").select("*").eq("user_id", user?.id).single();

    if (error) {
        return {
            error: error?.message || null,
            success: false,
            data: null
        }
    }
    return {
        error: null,
        success: true,
        data: creditsData
    }

}