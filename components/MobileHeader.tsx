'use client';

import { Menu, X } from 'lucide-react';

interface MobileHeaderProps {
    isMenuOpen: boolean;
    onMenuToggle: () => void;
}

export function MobileHeader({ isMenuOpen, onMenuToggle }: MobileHeaderProps) {
    return (
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-soft">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Brand */}
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <span className="font-bold text-white text-sm">C</span>
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight text-slate-900">
                        Crest <span className="text-emerald-500">Dashboard</span>
                    </span>
                </div>

                {/* Hamburger Menu Button */}
                <button
                    onClick={onMenuToggle}
                    className="p-2 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={`w-6 h-6 text-slate-700 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                                }`}
                        />
                        <X
                            className={`w-6 h-6 text-slate-700 absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                                }`}
                        />
                    </div>
                </button>
            </div>
        </header>
    );
}
