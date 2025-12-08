import { Deal, DealStatus } from '@/types/deal';
import { DealCard } from './DealCard';

interface PipelineColumnProps {
  stage: {
    status: DealStatus;
    label: string;
    color: string;
  };
  deals: Deal[];
  onDealClick: (deal: Deal) => void;
  onRefresh: () => void;
}

export function PipelineColumn({ stage, deals, onDealClick, onRefresh }: PipelineColumnProps) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className={`${stage.color} text-white px-4 py-3`}>
          <h3 className="font-semibold">{stage.label}</h3>
          <p className="text-sm opacity-90">{deals.length} deals</p>
        </div>
        <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
          {deals.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No deals</p>
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
