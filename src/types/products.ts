export interface Product {
  id: number
  code?: string
  name: string

  // 단위 관련
  base_unit: string
  purchase_unit: string
  purchase_conversion_factor: number
  sales_unit: string
  sales_conversion_factor: number

  // 기타 속성
  spec?: string
  is_resell: boolean
  is_stock_managed: boolean
  vat_rate: number

  // BaseModel 상속 필드
  is_active: boolean
  created_at: string
  updated_at: string
}
