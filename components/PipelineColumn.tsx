import { Deal, DealStatus } from '@/types/deal';
import { DealCard } from './DealCard';

interface PipelineColumnProps {
  stage: {
    status: DealStatus;
    label: string;
    color: string;
    gradient?: string;
  };
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  onRefresh: () => void;
}

export function PipelineColumn({ stage, deals, onDealClick, onRefresh }: PipelineColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 animate-fade-in">
      <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
        {/* Gradient header */}
        <div className={`${stage.gradient || stage.color} text-white px-5 py-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-lg">{stage.label}</h3>
              <div className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <span className="text-sm font-semibold">{deals.length}</span>
              </div>
            </div>
            <p className="text-xs opacity-90">Active in pipeline</p>
          </div>
        </div>
        
        {/* Deals list */}
        <div className="p-3 space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin bg-gray-50/50">
          {deals.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-gray-400 text-sm font-medium">No deals yet</p>
              <p className="text-gray-400 text-xs mt-1">Drag or add deals here</p>
            </div>
          ) : (
            deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => onDealClick(deal)}
                onRefresh={onRefresh}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
