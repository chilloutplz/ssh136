// src/types/organization.ts
export interface Company {
  id: number
  name: string
  representative: string
  business_number?: string
  postcode: string
  base_address: string
  detail_address?: string
  phone?: string
  fax?: string
  email?: string
  description?: string
}


// 조회용 Brand (백엔드 조회 Serializer 응답 구조)
export interface Brand {
  id: number
  name: string
  description?: string
  company_id: number
  company_name: string
}

// 생성/수정용 BrandPayload (백엔드 생성/수정 Serializer 요청 구조)
export interface BrandPayload {
  name: string
  description?: string
  company: number   // PK 값
}

export interface Branch {
  id: number
  brand_id: number
  brand_name: string
  name: string
  representative: string
  postcode: string
  base_address: string
  detail_address?: string
  phone?: string
  email?: string
  description?: string
  company_name?: string;
}

export interface BranchPayload {
  brand: number
  name: string
  representative: string
  postcode: string
  base_address: string
  detail_address?: string
  phone?: string
  email?: string
  description?: string
}

