import { Deal } from '@/types/deal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { calculateCommission } from '@/lib/storage';
import { Calendar, DollarSign, Home, Clock, ArrowRight } from 'lucide-react';

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
    urgent: 'bg-red-500/10 border-red-500/20 text-red-400',
    soon: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    normal: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 hover:bg-gray-800/80 hover:shadow-glow transition-all duration-300 cursor-pointer"
    >
      {/* Address with home icon */}
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 p-1.5 rounded-md bg-white/5 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-400/10 transition-colors">
          <Home className="w-3.5 h-3.5" />
        </div>
        <h4 className="font-medium text-gray-200 text-sm leading-snug group-hover:text-white transition-colors line-clamp-2">
          {deal.address}
        </h4>
      </div>

      {/* Commission - highlighted */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Est. Commission</p>
        <p className="text-lg font-bold text-white tracking-tight">{formatCurrency(commission)}</p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-xs text-gray-400 font-mono">{formatCurrency(deal.listing_price)}</span>
        </div>

        {/* Close date with urgency indicator */}
        {deal.estimated_close_date && (
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold ${urgency ? urgencyColors[urgency] : 'bg-gray-800 border-gray-700 text-gray-400'
            } border`}>
            {urgency === 'urgent' ? (
              <Clock className="w-3 h-3" />
            ) : (
              <Calendar className="w-3 h-3" />
            )}
            <span>{formatDate(deal.estimated_close_date)}</span>
          </div>
        )}
      </div>

      {/* Hover visual cue */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
        <ArrowRight className="w-5 h-5 text-emerald-500" />
      </div>
    </div>
  );
}
