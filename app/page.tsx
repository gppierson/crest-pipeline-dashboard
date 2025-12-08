'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus, Target, TrendingUp, CheckCircle2, DollarSign, Briefcase } from 'lucide-react';
import { Deal, DealStatus } from '@/types/deal';
import { getDeals, calculateCommission } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import { PipelineColumn } from '@/components/PipelineColumn';
import { AddDealModal } from '@/components/AddDealModal';
import { MetricsCard } from '@/components/MetricsCard';

const PIPELINE_STAGES: { status: DealStatus; label: string; color: string; gradient: string }[] = [
  { status: 'listed', label: 'Listed', color: 'text-blue-400', gradient: 'bg-blue-500' },
  { status: 'under-contract', label: 'Under Contract', color: 'text-amber-400', gradient: 'bg-amber-500' },
  { status: 'closed-won', label: 'Closed Won', color: 'text-emerald-400', gradient: 'bg-emerald-500' },
  { status: 'lost', label: 'Lost', color: 'text-red-400', gradient: 'bg-red-500' },
];

export default function Dashboard() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    setDeals(getDeals());
  }, []);

  const refreshDeals = () => {
    setDeals(getDeals());
  };

  const metrics = useMemo(() => {
    const activeDeals = deals.filter(d =>
      !['closed-won', 'lost'].includes(d.status)
    );

    const wonDeals = deals.filter(d => d.status === 'closed-won');

    const totalPipeline = activeDeals.reduce((sum, deal) =>
      sum + calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share), 0
    );

    const totalClosed = wonDeals.reduce((sum, deal) =>
      sum + calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share), 0
    );

    return {
      totalDeals: deals.length,
      activeDeals: activeDeals.length,
      wonDeals: wonDeals.length,
      totalPipeline,
      totalClosed,
    };
  }, [deals]);

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <MetricsCard
          title="Total Deals"
          value={metrics.totalDeals.toString()}
          color="text-gray-400"
          icon={Briefcase}
          gradient="bg-gray-500"
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
          color="text-amber-400"
          icon={TrendingUp}
          gradient="bg-amber-500"
        />
        <MetricsCard
          title="Closed Value"
          value={formatCurrency(metrics.totalClosed)}
          color="text-emerald-400"
          icon={DollarSign}
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
