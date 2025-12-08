'use client';

import { useState, useEffect, useMemo } from 'react';
import { getDeals } from '@/app/actions';
import { calculateCommission } from '@/lib/utils';
import { Deal } from '@/types/deal';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, Calendar, TrendingUp, DollarSign } from 'lucide-react';

export default function AnalyticsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);

    useEffect(() => {
        getDeals().then(setDeals);
    }, []);

    const monthlyStats = useMemo(() => {
        const stats: Record<string, { total: number; count: number; monthName: string; sortKey: string }> = {};

        deals.forEach((deal) => {
            if (!deal.estimated_close_date) return;
            if (['lost'].includes(deal.status)) return; // Exclude lost deals

            const date = new Date(deal.estimated_close_date);
            const year = date.getFullYear();
            const month = date.getMonth();
            const key = `${year}-${month}`;
            const sortKey = date.toISOString().slice(0, 7); // YYYY-MM

            const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            const commission = calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share);

            if (!stats[key]) {
                stats[key] = { total: 0, count: 0, monthName, sortKey };
            }

            stats[key].total += commission;
            stats[key].count += 1;
        });

        return Object.values(stats).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
    }, [deals]);

    const maxTotal = Math.max(...monthlyStats.map(s => s.total), 0);
    const totalProjected = monthlyStats.reduce((sum, stat) => sum + stat.total, 0);

    return (
        <div className="p-8 max-w-[1200px] mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Analytics
                </h1>
                <p className="text-slate-500 mt-1">Projected commission totals by month.</p>
            </div>

            {/* Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Projected</p>
                            <h3 className="text-2xl font-bold text-slate-900">{formatCurrency(totalProjected)}</h3>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>Based on estimated close dates</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Monthly Projections</h3>
                        <p className="text-sm text-slate-500">Commission breakdown by month</p>
                    </div>
                </div>

                {monthlyStats.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                        <div className="bg-white p-4 rounded-full shadow-sm inline-block mb-4">
                            <Calendar className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No projections available</h3>
                        <p className="text-slate-500 font-medium mb-4">Add estimated close dates to your deals to see future income.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {monthlyStats.map((stat) => (
                            <div key={stat.monthName} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-slate-700">{stat.monthName}</span>
                                    <div className="text-right">
                                        <span className="block text-lg font-bold text-slate-900">{formatCurrency(stat.total)}</span>
                                        <span className="text-xs text-slate-400 font-medium">
                                            {stat.count} deal{stat.count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="relative h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-xl opacity-90 group-hover:opacity-100 transition-all duration-500 ease-out shadow-sm"
                                        style={{ width: `${maxTotal > 0 ? (stat.total / maxTotal) * 100 : 0}%`, minWidth: '4px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
