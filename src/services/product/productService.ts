import api from "@/libs/axios"
import type { PaginatedResponse } from "@/types/common"
import { Product } from "@/types/products"

const API_URL = "/api/product/products/"

// 목록 조회
export const fetchProducts = async (): Promise<PaginatedResponse<Product>> => {
  const { data } = await api.get<PaginatedResponse<Product>>(API_URL)
  return data
}

// 생성
export const createProduct = async (payload: Partial<Product>): Promise<Product> => {
  const { data } = await api.post<Product>(API_URL, payload)
  return data
}

// 수정 (PUT으로 전체 업데이트)
export const updateProduct = async (id: number, payload: Partial<Product>): Promise<Product> => {
  const { data } = await api.put<Product>(`${API_URL}${id}/`, payload)
  return data
}

// 삭제
export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`${API_URL}${id}/`)
}
