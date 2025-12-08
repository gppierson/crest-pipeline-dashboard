'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user && pathname !== '/login') {
                router.push('/login');
            } else if (user && pathname === '/login') {
                router.push('/');
            } else {
                setAuthorized(true);
            }
        }
    }, [user, loading, pathname, router]);

    // Show nothing while checking auth or redirecting
    // Optionally add a loading spinner here
    if (loading || !authorized) {
        if (pathname === '/login' && !user && !loading) {
            // Allow render if on login page and confirmed not logged in
            return <>{children}</>;
        }
        // Basic loading state
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{children}</>;
}
