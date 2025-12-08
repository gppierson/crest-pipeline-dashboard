import { Deal } from '@/types/deal';
import { Home, Calendar, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate, calculateCommission } from '@/lib/utils';


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
    urgent: 'bg-red-50 border-red-200 text-red-600',
    soon: 'bg-amber-50 border-amber-200 text-amber-600',
    normal: 'bg-blue-50 border-blue-200 text-blue-600',
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-card-hover hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Address with home icon */}
      <div className="flex items-start gap-3 mb-3">
        <div className="mt-0.5 p-1.5 rounded-md bg-slate-50 text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
          <Home className="w-3.5 h-3.5" />
        </div>
        <h4 className="font-medium text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
          {deal.address}
        </h4>
      </div>

      {/* Commission - highlighted */}
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-1">Est. Commission</p>
        <p className="text-lg font-bold text-slate-900 tracking-tight">{formatCurrency(commission)}</p>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-mono">{formatCurrency(deal.listing_price)}</span>
        </div>

        {/* Close date with urgency indicator */}
        {deal.estimated_close_date && (
          <div className={`flex items - center gap - 1.5 px - 2 py - 1 rounded - md text - [10px] uppercase tracking - wider font - bold ${urgency ? urgencyColors[urgency] : 'bg-slate-50 border-slate-200 text-slate-500'
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
