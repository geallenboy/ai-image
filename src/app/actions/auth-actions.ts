"use server"

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface AuthResponse {
    error: null | string;
    success: boolean;
    data: unknown | null;
}

export const signupAction = async (formData: FormData): Promise<AuthResponse> => {
    const supbase = await createClient();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                fullName: formData.get("fullName") as string,
            }
        }
    }

    const { data: signupData, error } = await supbase.auth.signUp(data)

    return {
        error: error?.message || "There was an error signing up!",
        success: !error,
        data: signupData || null
    }

}

export const loginAction = async (formData: FormData): Promise<AuthResponse> => {
    const supbase = await createClient();
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    console.log("data:", data)
    const { data: signinData, error } = await supbase.auth.signInWithPassword(data)
    console.log("data:", signinData)
    return {
        error: error?.message || "There was an error login in!",
        success: !error,
        data: signinData || null
    }

}

export const logoutAction = async (): Promise<void> => {
    const supbase = await createClient();
    await supbase.auth.signOut()
    redirect("/login")

}

export const updateProfileAction = async ({ fullName }: { fullName: string }): Promise<AuthResponse> => {
    const supbase = await createClient();

    const { data: profleData, error } = await supbase.auth.updateUser({
        data: { fullName }
    })

    return {
        error: error?.message || "There was an error updating the profile",
        success: !error,
        data: profleData || null
    }

}

export const resetPasswordAction = async ({ email }: { email: string }): Promise<AuthResponse> => {
    const supbase = await createClient();

    const { data: profleData, error } = await supbase.auth.resetPasswordForEmail(email)

    return {
        error: error?.message || "There was an error sending the reset password email!",
        success: !error,
        data: profleData || null
    }

}

export const changePasswordAction = async (newPassword: string): Promise<AuthResponse> => {
    const supbase = await createClient();
    const { data, error } = await supbase.auth.updateUser({
        password: newPassword
    })
    return {
        error: error?.message || "There was an error changing the password!",
        success: !error,
        data: data || null
    }

}


const signInWith = (provider: any) => async () => {
    const supabase = await createClient()
    const auth_callback_url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: auth_callback_url,
        },
    })
    console.log(data)

    if (error) {
        console.log(error)
    }
    redirect(data.url || "")
}

export const signinWithGoogle = signInWith('google')
export const signinWithGithub = signInWith('github')