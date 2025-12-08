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
      <div className="flex flex-col h-full bg-slate-50/50 rounded-xl border border-slate-200/60 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full ${stage.gradient} shadow-sm`} />
            <h3 className="font-heading font-semibold text-slate-800 tracking-wide text-sm">{stage.label}</h3>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            {deals.length}
          </span>
        </div>

        {/* Deals list */}
        <div className="p-3 space-y-3 flex-1 overflow-y-auto scrollbar-thin">
          {deals.length === 0 ? (
            <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl m-2 bg-white/50">
              <p className="text-slate-400 text-xs font-medium">No deals</p>
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
