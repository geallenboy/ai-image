import { createServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: any) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const supabase = await createServer();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            console.log("✅ Auth session exchanged successfully!");

            // 🔹 强制刷新页面，确保 middleware 获取到新的 session
            const response = NextResponse.redirect(`${origin}${next}`);
            return response;
        }

        console.error("❌ Auth session exchange failed!", error);
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
