'use client';

import {
    LayoutDashboard,
    PieChart,
    LogOut,
    Search,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const handleNavClick = () => {
        // Close mobile menu when a nav link is clicked
        if (onMobileClose) {
            onMobileClose();
        }
    };

    const handleLogout = () => {
        if (onMobileClose) {
            onMobileClose();
        }
        logout();
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onMobileClose}
            />

            {/* Sidebar - Desktop (static) + Mobile (drawer) */}
            <aside
                className={`
                    fixed md:relative 
                    top-0 left-0 
                    w-72 md:w-64 
                    h-full
                    border-r border-slate-200 
                    bg-white 
                    flex flex-col 
                    shadow-soft md:shadow-soft
                    z-50 md:z-auto
                    transition-transform duration-300 ease-out
                    md:translate-x-0 md:flex
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                {/* Mobile Close Button */}
                <button
                    onClick={onMobileClose}
                    className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5 text-slate-500" />
                </button>

                {/* Brand */}
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <span className="font-bold text-white">C</span>
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight text-slate-900">
                            Crest <span className="text-emerald-500">Dashboard</span>
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="px-4 mb-6">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search deals..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1">
                    <Link
                        href="/"
                        onClick={handleNavClick}
                        className={`flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/'
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-100/50'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                            }`}
                    >
                        <LayoutDashboard className={`w-5 h-5 md:w-4 md:h-4 ${pathname === '/' ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        Pipeline
                    </Link>
                    <Link
                        href="/analytics"
                        onClick={handleNavClick}
                        className={`flex items-center gap-3 px-3 py-3 md:py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/analytics'
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-100/50'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                            }`}
                    >
                        <PieChart className={`w-5 h-5 md:w-4 md:h-4 ${pathname === '/analytics' ? 'text-emerald-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        Analytics
                    </Link>
                </nav>

                {/* User Actions */}
                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 ring-2 ring-white shadow-sm border border-slate-200">
                            {user?.email?.substring(0, 2).toUpperCase() || 'GP'}
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-600 transition-colors truncate w-32">
                                {user?.email || 'Guest User'}
                            </p>
                            <p className="text-xs text-slate-500">Pro Plan</p>
                        </div>
                        <LogOut className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </button>
                </div>
            </aside>
        </>
    );
}
