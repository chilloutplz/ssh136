import { Party } from "./parties"
import { Product } from "./products"

// 응답(Response) 구조
export interface PurchaseItem {
  id: number
  product: Product
  quantity: number
  unit_price: number
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: number
  supplier: Party
  purchased_at: string
  total_price: number
  note?: string
  items: PurchaseItem[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// 요청(Request) 구조
export interface PurchaseItemPayload {
  product: number   // product id
  quantity: number
  unit_price: number
}

export interface PurchasePayload {
  supplier: number   // supplier id
  purchased_at: string
  note?: string
  items: PurchaseItemPayload[]
}
