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
  { status: 'listed', label: 'Listed', color: 'bg-blue-500', gradient: 'bg-gradient-blue' },
  { status: 'under-contract', label: 'Under Contract', color: 'bg-amber-500', gradient: 'bg-gradient-amber' },
  { status: 'closed-won', label: 'Closed Won', color: 'bg-green-500', gradient: 'bg-gradient-primary' },
  { status: 'lost', label: 'Lost', color: 'bg-red-500', gradient: 'bg-gradient-rose' },
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-primary-50/30">
      <header className="glass-strong border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent">
                Pipeline Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">Crest Real Estate Sales</p>
            </div>
            <button
              onClick={() => {
                setSelectedDeal(null);
                setIsModalOpen(true);
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Deal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <MetricsCard
            title="Total Deals"
            value={metrics.totalDeals.toString()}
            color="text-gray-700"
            icon={Briefcase}
            gradient="bg-gradient-to-br from-gray-500 to-gray-600"
          />
          <MetricsCard
            title="Active Deals"
            value={metrics.activeDeals.toString()}
            color="text-blue-600"
            icon={Target}
            gradient="bg-gradient-blue"
          />
          <MetricsCard
            title="Won Deals"
            value={metrics.wonDeals.toString()}
            color="text-green-600"
            icon={CheckCircle2}
            gradient="bg-gradient-primary"
          />
          <MetricsCard
            title="Pipeline Value"
            value={formatCurrency(metrics.totalPipeline)}
            color="text-amber-600"
            icon={TrendingUp}
            gradient="bg-gradient-amber"
          />
          <MetricsCard
            title="Closed Value"
            value={formatCurrency(metrics.totalClosed)}
            color="text-primary-600"
            icon={DollarSign}
            gradient="bg-gradient-primary"
          />
        </div>

        {/* Pipeline Board */}
        <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-thin">
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
      </main>

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
