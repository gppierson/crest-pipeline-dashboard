import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Deal, DealStatus, DealFormData } from '@/types/deal';
import { saveDeal, updateDeal, deleteDeal } from '@/lib/storage';

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
    notes: '',
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        address: deal.address,
        listing_price: deal.listing_price,
        commission_rate: deal.commission_rate,
        my_share: deal.my_share,
        status: deal.status,
        estimated_close_date: deal.estimated_close_date || '',
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
        notes: '',
      });
    }
  }, [deal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (deal) {
      updateDeal(deal.id, formData);
    } else {
      saveDeal(formData);
    }

    onSuccess();
    onClose();
  };

  const handleDelete = () => {
    if (deal && window.confirm('Are you sure you want to delete this deal?')) {
      deleteDeal(deal.id);
      onSuccess();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in border border-white/10">
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md text-white px-6 py-5 flex justify-between items-center border-b border-white/5 z-10">
          <div>
            <h2 className="text-xl font-heading font-bold text-white tracking-tight">
              {deal ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {deal ? 'Update deal information' : 'Enter deal details to add to pipeline'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Property Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-dark w-full"
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sale Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.listing_price || ''}
                  onChange={(e) => setFormData({ ...formData, listing_price: Number(e.target.value) })}
                  className="input-dark w-full pl-7"
                  placeholder="500000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DealStatus })}
                className="input-dark w-full"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.commission_rate || ''}
                onChange={(e) => setFormData({ ...formData, commission_rate: Number(e.target.value) })}
                className="input-dark w-full"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                My Share (%)
              </label>
              <input
                type="number"
                step="1"
                value={formData.my_share || ''}
                onChange={(e) => setFormData({ ...formData, my_share: Number(e.target.value) })}
                className="input-dark w-full"
                placeholder="40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Estimated Close Date
            </label>
            <input
              type="date"
              value={formData.estimated_close_date || ''}
              onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
              className="input-dark w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="input-dark w-full resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-4">
            {deal && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all font-medium text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete Deal
              </button>
            )}
            <div className={`flex gap-3 ${!deal ? 'ml-auto' : ''}`}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary text-sm border-white/10"
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
