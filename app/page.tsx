'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Target, TrendingUp, CheckCircle2, DollarSign, Briefcase, Wallet } from 'lucide-react';
import { Deal, DealStatus } from '@/types/deal';
import { getDeals } from '@/app/actions';
import { calculateCommission } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import { PipelineColumn } from '@/components/PipelineColumn';
import { AddDealModal } from '@/components/AddDealModal';
import { MetricsCard } from '@/components/MetricsCard';

const PIPELINE_STAGES: { status: DealStatus; label: string; color: string; gradient: string }[] = [
  { status: 'listed', label: 'Listed', color: 'text-blue-400', gradient: 'bg-blue-500' },
  { status: 'under-contract', label: 'Under Contract', color: 'text-amber-400', gradient: 'bg-amber-500' },
  { status: 'closed-won', label: 'Closed Won', color: 'text-emerald-400', gradient: 'bg-emerald-500' },
  { status: 'paid', label: 'Paid', color: 'text-emerald-400', gradient: 'bg-emerald-500' },
  { status: 'lost', label: 'Lost', color: 'text-red-400', gradient: 'bg-red-500' },
];

export default function Dashboard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDeals()
      .then(setDeals)
      .catch((err) => {
        console.error('Failed to load deals:', err);
        setError('Failed to load deals. Please check server logs for details.');
      });
  }, []);

  const refreshDeals = async () => {
    const freshDeals = await getDeals();
    setDeals(freshDeals);
  };

  const metrics = useMemo(() => {
    const activeDeals = deals.filter(d =>
      !['closed-won', 'lost', 'paid'].includes(d.status)
    );

    const wonDeals = deals.filter(d => ['closed-won', 'paid'].includes(d.status));

    const totalPipeline = activeDeals.reduce((sum, deal) =>
      sum + calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share), 0
    );

    const totalClosed = wonDeals.reduce((sum, deal) =>
      sum + calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share), 0
    );

    const underContractDeals = deals.filter(d => d.status === 'under-contract');
    const totalUnderContract = underContractDeals.reduce((sum, deal) =>
      sum + calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share), 0
    );

    return {
      totalDeals: deals.length,
      activeDeals: activeDeals.length,
      wonDeals: wonDeals.length,
      totalPipeline,
      totalClosed,
      totalUnderContract,
    };
  }, [deals]);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto min-h-full">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <button
          onClick={() => {
            setSelectedDeal(null);
            setIsModalOpen(true);
          }}
          className="btn-primary inline-flex items-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add Deal
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-8">
        <MetricsCard
          title="Total Deals"
          value={metrics.totalDeals.toString()}
          color="text-slate-400"
          icon={Briefcase}
          gradient="bg-slate-500"
        />
        <MetricsCard
          title="Active Deals"
          value={metrics.activeDeals.toString()}
          color="text-blue-400"
          icon={Target}
          gradient="bg-blue-500"
        />
        <MetricsCard
          title="Won Deals"
          value={metrics.wonDeals.toString()}
          color="text-emerald-400"
          icon={CheckCircle2}
          gradient="bg-emerald-500"
        />
        <MetricsCard
          title="Pipeline Value"
          value={formatCurrency(metrics.totalPipeline)}
          color="text-blue-400"
          icon={TrendingUp}
          gradient="bg-blue-500"
        />
        <MetricsCard
          title="Under Contract"
          value={formatCurrency(metrics.totalUnderContract)}
          color="text-amber-400"
          icon={Briefcase}
          gradient="bg-amber-500"
        />
        <MetricsCard
          title="Total Commission"
          value={formatCurrency(metrics.totalClosed)}
          color="text-emerald-400"
          icon={Wallet}
          gradient="bg-emerald-500"
        />
      </div>

      {/* Pipeline Board */}
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin">
        {PIPELINE_STAGES.map((stage) => (
          <PipelineColumn
            key={stage.status}
            stage={stage}
            deals={deals.filter(d => d.status === stage.status)}
            onDealClick={(deal) => {
              setSelectedDeal(deal);
              setIsModalOpen(true);
            }}
            onRefresh={refreshDeals}
          />
        ))}
      </div>

      <AddDealModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDeal(null);
        }}
        deal={selectedDeal}
        onSuccess={refreshDeals}
      />
    </div>
  );
}
