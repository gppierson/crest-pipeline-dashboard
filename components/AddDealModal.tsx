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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-5 flex justify-between items-center rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold">
              {deal ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <p className="text-sm text-primary-100 mt-0.5">
              {deal ? 'Update deal information' : 'Enter deal details to add to pipeline'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gray-50">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="input-enhanced"
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sale Price *
              </label>
              <input
                type="number"
                required
                value={formData.listing_price || ''}
                onChange={(e) => setFormData({ ...formData, listing_price: Number(e.target.value) })}
                className="input-enhanced"
                placeholder="500000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DealStatus })}
                className="input-enhanced"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.commission_rate || ''}
                onChange={(e) => setFormData({ ...formData, commission_rate: Number(e.target.value) })}
                className="input-enhanced"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                My Share (%)
              </label>
              <input
                type="number"
                step="1"
                value={formData.my_share || ''}
                onChange={(e) => setFormData({ ...formData, my_share: Number(e.target.value) })}
                className="input-enhanced"
                placeholder="40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estimated Close Date
            </label>
            <input
              type="date"
              value={formData.estimated_close_date || ''}
              onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
              className="input-enhanced"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="input-enhanced resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-200 bg-white px-6 py-4 -mx-6 -mb-6 rounded-b-2xl">
            {deal && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-[1.02] font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Deal
              </button>
            )}
            <div className={`flex gap-3 ${!deal ? 'ml-auto' : ''}`}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
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
