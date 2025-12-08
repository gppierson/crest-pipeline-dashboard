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
    <div className="flex-shrink-0 w-80 animate-fade-in flex flex-col h-full">
      <div className="flex flex-col h-full bg-gray-900/30 backdrop-blur-sm rounded-xl border border-white/5 shadow-inner transition-colors hover:border-white/10 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${stage.gradient} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
            <h3 className="font-heading font-semibold text-gray-200 tracking-wide text-sm">{stage.label}</h3>
          </div>
          <span className="text-xs font-mono font-medium text-gray-500 bg-black/20 px-2.5 py-1 rounded-full border border-white/5">
            {deals.length}
          </span>
        </div>

        {/* Deals list */}
        <div className="p-3 space-y-3 flex-1 overflow-y-auto scrollbar-thin">
          {deals.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl m-2 bg-white/[0.01]">
              <p className="text-gray-600 text-xs font-medium">No deals</p>
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
