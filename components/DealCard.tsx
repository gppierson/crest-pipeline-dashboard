import { Deal } from '@/types/deal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { calculateCommission } from '@/lib/storage';
import { Calendar, DollarSign } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
  onRefresh: () => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const commission = calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share);

  return (
    <div
      onClick={onClick}
      className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-primary cursor-pointer transition-colors"
    >
      <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
        {deal.address}
      </h4>
      
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          <span>List: {formatCurrency(deal.listing_price)}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span className="font-semibold text-primary">
            Est. Commission: {formatCurrency(commission)}
          </span>
        </div>

        {deal.estimated_close_date && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Close: {formatDate(deal.estimated_close_date)}</span>
          </div>
        )}
      </div>

      {deal.notes && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {deal.notes}
        </p>
      )}
    </div>
  );
}
