'use client';

import { useState, useEffect, useMemo } from 'react';
import { getDeals } from '@/app/actions';
import { calculateCommission } from '@/lib/utils';
import { Deal } from '@/types/deal';
import { formatCurrency } from '@/lib/utils';
import { BarChart3, Calendar } from 'lucide-react';

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

    return (
        <div className="p-8 max-w-[1200px] mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Analytics
                </h1>
                <p className="text-slate-500 mt-1">projected commission totals by month.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Monthly Projections</h3>
                        <p className="text-sm text-slate-500">Based on estimated close dates</p>
                    </div>
                </div>

                {monthlyStats.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No deals with projected dates found.</p>
                        <p className="text-sm text-slate-400 mt-1">Add estimated close dates to your deals to see projections.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {monthlyStats.map((stat) => (
                            <div key={stat.monthName} className="group">
                                <div className="flex justify-between text-sm mb-2 font-medium">
                                    <span className="text-slate-700">{stat.monthName}</span>
                                    <span className="text-slate-900 font-bold">{formatCurrency(stat.total)}</span>
                                </div>
                                <div className="relative h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-emerald-500 rounded-lg opacity-80 group-hover:opacity-100 transition-all duration-500 ease-out"
                                        style={{ width: `${maxTotal > 0 ? (stat.total / maxTotal) * 100 : 0}%`, minWidth: '4px' }}
                                    />
                                    <div className="absolute inset-0 flex items-center px-4">
                                        <span className="text-xs font-medium text-emerald-900/50 relative z-10">
                                            {stat.count} deal{stat.count !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
