import api from "@/libs/axios"
import { Brand, BrandPayload } from "@/types/organization"

// 브랜드 목록 조회
export async function fetchBrands(): Promise<Brand[]> {
  return (await api.get("/api/organization/brands/")).data
}

// 브랜드 생성
export async function createBrand(payload: BrandPayload): Promise<Brand> {
  return (await api.post("/api/organization/brands/", payload)).data
}

// 브랜드 수정
export async function updateBrand(id: number, payload: Partial<BrandPayload>): Promise<Brand> {
  return (await api.put(`/api/organization/brands/${id}/`, payload)).data
}

// 브랜드 삭제
export async function deleteBrand(id: number): Promise<void> {
  await api.delete(`/api/organization/brands/${id}/`)
}
