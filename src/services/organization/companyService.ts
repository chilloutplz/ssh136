import api from "@/libs/axios"
import type { Company } from "@/types/organization"

// 회사 목록 조회
export async function fetchCompanies(): Promise<Company[]> {
  const res = await api.get("/api/organization/companies/")
  return res.data
}

// 회사 단건 조회
export async function fetchCompany(id: number): Promise<Company> {
  const res = await api.get(`/api/organization/companies/${id}/`)
  return res.data
}

// 회사 생성
export async function createCompany(payload: Omit<Company, "id">): Promise<Company> {
  const res = await api.post("/api/organization/companies/", payload)
  return res.data
}

// 회사 수정
export async function updateCompany(id: number, payload: Omit<Company, "id">): Promise<Company> {
  const res = await api.put(`/api/organization/companies/${id}/`, payload)
  return res.data
}

// 회사 삭제
export async function deleteCompany(id: number): Promise<void> {
  await api.delete(`/api/organization/companies/${id}/`)
}
