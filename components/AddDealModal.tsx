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
  { value: 'lead', label: 'Lead' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'under-contract', label: 'Under Contract' },
  { value: 'closed-won', label: 'Closed Won' },
  { value: 'closed-lost', label: 'Closed Lost' },
];

export function AddDealModal({ isOpen, onClose, deal, onSuccess }: AddDealModalProps) {
  const [formData, setFormData] = useState<DealFormData>({
    address: '',
    listing_price: 0,
    commission_rate: 3,
    my_share: 50,
    status: 'lead',
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
        my_share: 50,
        status: 'lead',
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {deal ? 'Edit Deal' : 'Add New Deal'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Address *
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="123 Main St, City, State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing Price *
              </label>
              <input
                type="number"
                required
                value={formData.listing_price || ''}
                onChange={(e) => setFormData({ ...formData, listing_price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as DealStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commission Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.commission_rate || ''}
                onChange={(e) => setFormData({ ...formData, commission_rate: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                My Share (%)
              </label>
              <input
                type="number"
                step="1"
                value={formData.my_share || ''}
                onChange={(e) => setFormData({ ...formData, my_share: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Close Date
            </label>
            <input
              type="date"
              value={formData.estimated_close_date || ''}
              onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            {deal && (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            )}
            <div className={`flex gap-3 ${!deal ? 'ml-auto' : ''}`}>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors"
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
