import { Deal } from '@/types/deal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { calculateCommission } from '@/lib/storage';
import { Calendar, DollarSign, Home, Clock } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onClick: () => void;
  onRefresh: () => void;
}

function getCloseDateUrgency(date?: string): 'urgent' | 'soon' | 'normal' | null {
  if (!date) return null;
  
  const closeDate = new Date(date);
  const today = new Date();
  const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilClose < 7) return 'urgent';
  if (daysUntilClose < 30) return 'soon';
  return 'normal';
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const commission = calculateCommission(deal.listing_price, deal.commission_rate, deal.my_share);
  const urgency = getCloseDateUrgency(deal.estimated_close_date);
  
  const urgencyColors = {
    urgent: 'bg-red-50 border-red-200 text-red-700',
    soon: 'bg-amber-50 border-amber-200 text-amber-700',
    normal: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-lg p-4 border border-gray-200 hover:border-primary-400 hover:shadow-card cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Address with home icon */}
      <div className="flex items-start gap-2 mb-3">
        <Home className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-primary-600 transition-colors">
          {deal.address}
        </h4>
      </div>
      
      {/* Sale price */}
      <div className="flex items-center gap-1.5 mb-2">
        <DollarSign className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-xs text-gray-600">Sale:</span>
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(deal.listing_price)}</span>
      </div>
      
      {/* Commission - highlighted */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-lg p-2.5 mb-3 border border-primary-200/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary-700">Est. Commission</span>
          <span className="text-base font-bold text-primary-700">{formatCurrency(commission)}</span>
        </div>
      </div>

      {/* Close date with urgency indicator */}
      {deal.estimated_close_date && (
        <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs font-medium ${
          urgency ? urgencyColors[urgency] : 'bg-gray-50 border-gray-200 text-gray-700'
        } border`}>
          {urgency === 'urgent' ? (
            <Clock className="w-3 h-3" />
          ) : (
            <Calendar className="w-3 h-3" />
          )}
          <span>Close: {formatDate(deal.estimated_close_date)}</span>
        </div>
      )}

      {/* Notes */}
      {deal.notes && (
        <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100 line-clamp-2 leading-relaxed">
          {deal.notes}
        </p>
      )}
    </div>
  );
}
