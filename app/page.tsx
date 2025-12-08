'use client';

import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Deal, DealStatus } from '@/types/deal';
import { getDeals, calculateCommission } from '@/lib/storage';
import { formatCurrency } from '@/lib/utils';
import { PipelineColumn } from '@/components/PipelineColumn';
import { AddDealModal } from '@/components/AddDealModal';
import { MetricsCard } from '@/components/MetricsCard';

const PIPELINE_STAGES: { status: DealStatus; label: string; color: string }[] = [
  { status: 'lead', label: 'Leads', color: 'bg-gray-500' },
  { status: 'qualification', label: 'Qualification', color: 'bg-blue-500' },
  { status: 'under-contract', label: 'Under Contract', color: 'bg-yellow-500' },
  { status: 'closed-won', label: 'Closed Won', color: 'bg-green-500' },
  { status: 'closed-lost', label: 'Closed Lost', color: 'bg-red-500' },
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
      !['closed-won', 'closed-lost'].includes(d.status)
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pipeline Dashboard</h1>
              <p className="text-sm text-gray-600">Crest Real Estate Sales</p>
            </div>
            <button
              onClick={() => {
                setSelectedDeal(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Deal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <MetricsCard
            title="Total Deals"
            value={metrics.totalDeals.toString()}
            color="bg-gray-100 text-gray-800"
          />
          <MetricsCard
            title="Active Deals"
            value={metrics.activeDeals.toString()}
            color="bg-blue-100 text-blue-800"
          />
          <MetricsCard
            title="Won Deals"
            value={metrics.wonDeals.toString()}
            color="bg-green-100 text-green-800"
          />
          <MetricsCard
            title="Pipeline Value"
            value={formatCurrency(metrics.totalPipeline)}
            color="bg-yellow-100 text-yellow-800"
          />
          <MetricsCard
            title="Closed Value"
            value={formatCurrency(metrics.totalClosed)}
            color="bg-green-100 text-green-800"
          />
        </div>

        {/* Pipeline Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
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
