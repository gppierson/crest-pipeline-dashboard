'use client';

import {
    LayoutDashboard,
    PieChart,
    Settings,
    LogOut,
    Search,
    User
} from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
    return (
        <aside className="w-64 border-r border-white/10 bg-gray-900/50 backdrop-blur-xl flex flex-col h-full hidden md:flex">
            {/* Brand */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                        <span className="font-bold text-white">C</span>
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-white">
                        Crest<span className="text-emerald-400">.ai</span>
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 mb-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        className="w-full bg-black/20 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-white/5 rounded-lg border border-white/5"
                >
                    <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                    Pipeline
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <PieChart className="w-4 h-4" />
                    Analytics
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <User className="w-4 h-4" />
                    Team
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <Settings className="w-4 h-4" />
                    Settings
                </Link>
            </nav>

            {/* User Actions */}
            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-black">
                        GP
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Garrett Pierson</p>
                        <p className="text-xs text-gray-500">Pro Plan</p>
                    </div>
                    <LogOut className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </button>
            </div>
        </aside>
    );
}
