import { Deal, DealFormData } from '@/types/deal';

const STORAGE_KEY = 'crest-pipeline-deals';

export function getDeals(): Deal[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveDeal(data: DealFormData): Deal {
  const deals = getDeals();
  const newDeal: Deal = {
    id: crypto.randomUUID(),
    user_id: 'local-user',
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  deals.push(newDeal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  return newDeal;
}

export function updateDeal(id: string, data: Partial<DealFormData>): Deal | null {
  const deals = getDeals();
  const index = deals.findIndex(d => d.id === id);
  
  if (index === -1) return null;
  
  deals[index] = {
    ...deals[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  return deals[index];
}

export function deleteDeal(id: string): boolean {
  const deals = getDeals();
  const filtered = deals.filter(d => d.id !== id);
  
  if (filtered.length === deals.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function calculateCommission(price: number, rate: number, share: number): number {
  return (price * (rate / 100) * (share / 100));
}
