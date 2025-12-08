'use client';

import { useAuth } from '@/context/AuthContext';
import { Sidebar } from '@/components/Sidebar';
import AuthGuard from '@/components/AuthGuard';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <AuthGuard>
            <div className="flex h-screen w-full">
                {!isLoginPage && <Sidebar />}
                <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative ${isLoginPage ? 'w-full' : ''}`}>
                    {/* Background Gradients/Glows - Subtle Light Mode (Only show on non-login pages as login has its own) */}
                    {!isLoginPage && (
                        <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-50" />
                    )}

                    <div className="flex-1 overflow-y-auto scroll-smooth">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
