'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import AuthGuard from '@/components/AuthGuard';
import { usePathname } from 'next/navigation';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <AuthGuard>
            <div className="flex h-screen w-full">
                {/* Mobile Header - only on non-login pages */}
                {!isLoginPage && (
                    <MobileHeader
                        isMenuOpen={isMobileMenuOpen}
                        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                )}

                {/* Sidebar with mobile drawer support */}
                {!isLoginPage && (
                    <Sidebar
                        isMobileOpen={isMobileMenuOpen}
                        onMobileClose={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <main className={`flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative ${isLoginPage ? 'w-full' : ''}`}>
                    {/* Background Gradients/Glows - Subtle Light Mode (Only show on non-login pages) */}
                    {!isLoginPage && (
                        <div className="absolute top-0 left-0 w-full h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-50" />
                    )}

                    {/* Main content with padding for mobile header */}
                    <div className={`flex-1 overflow-y-auto scroll-smooth ${!isLoginPage ? 'pt-14 md:pt-0' : ''}`}>
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
