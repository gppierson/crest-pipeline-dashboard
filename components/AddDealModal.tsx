import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Deal, DealStatus, DealFormData } from '@/types/deal';
import { createDeal, updateDeal, deleteDeal } from '@/app/actions';

interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal?: Deal | null;
  onSuccess: () => void;
}

const STATUS_OPTIONS: { value: DealStatus; label: string }[] = [
  { value: 'listed', label: 'Listed' },
  { value: 'under-contract', label: 'Under Contract' },
  { value: 'closed-won', label: 'Closed Won' },
  { value: 'lost', label: 'Lost' },
];

export function AddDealModal({ isOpen, onClose, deal, onSuccess }: AddDealModalProps) {
  const [formData, setFormData] = useState<DealFormData>({
    address: '',
    listing_price: 0,
    commission_rate: 3,
    my_share: 40,
    status: 'listed',
    estimated_close_date: '',
    actual_close_date: '',
    notes: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (deal) {
      setFormData({
        address: deal.address,
        listing_price: deal.listing_price,
        commission_rate: deal.commission_rate,
        my_share: deal.my_share,
        status: deal.status,
        estimated_close_date: deal.estimated_close_date || '',
        actual_close_date: deal.actual_close_date || '',
        notes: deal.notes || '',
      });
    } else {
      setFormData({
        address: '',
        listing_price: 0,
        commission_rate: 3,
        my_share: 40,
        status: 'listed',
        estimated_close_date: '',
        actual_close_date: '',
        notes: '',
      });
    }
  }, [deal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (deal) {
        await updateDeal(deal.id, formData);
      } else {
        await createDeal(formData);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to save deal:', err);
      setError('Failed to save deal. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (deal && window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(deal.id);
        onSuccess();
        onClose();
      } catch (err) {
        console.error('Failed to delete deal:', err);
        setError('Failed to delete deal. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in border border-slate-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-5 flex justify-between items-center border-b border-slate-100 z-10">
          <div>
            <h2 className="text-xl font-heading font-bold text-slate-900 tracking-tight">
              {deal ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              {deal ? 'Update deal information' : 'Enter deal details to add to pipeline'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Property Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-enhanced w-full"
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sale Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="text"
                  required
                  value={formData.listing_price ? formData.listing_price.toLocaleString() : ''}
                  onChange={(e) => {
                    // Remove non-numeric characters (except decimals if needed, but usually sale price is integer)
                    const rawValue = e.target.value.replace(/,/g, '').replace(/[^\d]/g, '');
                    setFormData({ ...formData, listing_price: Number(rawValue) });
                  }}
                  className="input-enhanced w-full pl-7"
                  placeholder="500,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DealStatus })}
                className="input-enhanced w-full"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="text-slate-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.commission_rate || ''}
                onChange={(e) => setFormData({ ...formData, commission_rate: Number(e.target.value) })}
                className="input-enhanced w-full"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                My Share (%)
              </label>
              <input
                type="number"
                step="1"
                value={formData.my_share || ''}
                onChange={(e) => setFormData({ ...formData, my_share: Number(e.target.value) })}
                className="input-enhanced w-full"
                placeholder="40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estimated Close Date
              </label>
              <input
                type="date"
                value={formData.estimated_close_date || ''}
                onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
                className="input-enhanced w-full"
              />
            </div>
            {formData.status === 'closed-won' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Actual Close Date
                </label>
                <input
                  type="date"
                  value={formData.actual_close_date || ''}
                  onChange={(e) => setFormData({ ...formData, actual_close_date: e.target.value })}
                  className="input-enhanced w-full"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="input-enhanced w-full resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4">
            {deal && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all font-medium text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete Deal
              </button>
            )}
            <div className={`flex gap-3 ${!deal ? 'ml-auto' : ''}`}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary text-sm shadow-emerald-500/20"
              >
                {deal ? 'Update Deal' : 'Add Deal'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
