// src/types/parties.ts
export interface Party {
  id: number
  name: string
  representative?: string
  business_number?: string
  postcode?: string
  base_address?: string
  detail_address?: string
  phone?: string
  fax?: string
  email?: string
  created_at?: string
  updated_at?: string
}
