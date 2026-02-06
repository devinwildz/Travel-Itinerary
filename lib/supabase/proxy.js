import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // CRITICAL: Do not run code between createServerClient and getClaims()
    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    console.log('🔥 PATH:', request.nextUrl.pathname);
    console.log('👤 USER:', user ? 'Logged in ✅' : 'Not logged in ❌');

    // Protected routes
    const protectedRoutes = ['/my-trips', '/profile', '/settings'];
    const isProtected = protectedRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Auth routes
    const authRoutes = ['/login', '/register'];
    const isAuth = authRoutes.some(route =>
        request.nextUrl.pathname.startsWith(route)
    );

    // Redirect to login if not authenticated
    if (isProtected && !user) {
        console.log('❌ REDIRECT → /login');
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from auth pages
    if (isAuth && user) {
        console.log('✅ REDIRECT → /');
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    console.log('✅ ALLOW');
    return supabaseResponse;
}