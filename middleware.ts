import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session');
    // Note: For client-side auth with Firebase, we rely on client-side state for extensive checks.
    // Ideally we would verify a session cookie here if we implement server-side session management.
    // For this "simple auth" implementation without a custom server to verify tokens on every request efficiently
    // (without making external calls to Firebase which adds latency), we'll do a basic check
    // or primarily rely on client-side redirect for this specific "cheapest cloud" request which implies minimizing computation.

    // However, protecting the route even superficially is good. 
    // Since we are using client-side SDK for main auth, middleware access to "auth status" is limited 
    // unless we sync tokens to cookies.

    // Strategy: We will skip strict middleware protection for now and rely on client-side AuthContext 
    // to redirect non-authenticated users, as that's the standard pattern for simple Firebase SPA-like apps
    // without a dedicated session cookie syncing mechanism (which adds complexity).

    // BUT, we can at least ensure we don't block static files.

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (login page)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};
