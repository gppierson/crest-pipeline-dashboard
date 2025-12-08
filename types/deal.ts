export type DealStatus = 
  | 'lead'
  | 'qualification'
  | 'under-contract'
  | 'closed-won'
  | 'closed-lost';

export interface Deal {
  id: string;
  user_id: string;
  address: string;
  listing_price: number;
  commission_rate: number;
  my_share: number;
  status: DealStatus;
  estimated_close_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DealFormData {
  address: string;
  listing_price: number;
  commission_rate: number;
  my_share: number;
  status: DealStatus;
  estimated_close_date?: string;
  notes?: string;
}
