import api from "@/libs/axios"
import { Purchase, PurchasePayload } from "@/types/purchase"

const API_URL = "/api/purchase/purchases/"

export async function fetchPurchases(): Promise<Purchase[]> {
  const { data } = await api.get(API_URL)
  return Array.isArray(data) ? data : data.results
}

export async function createPurchase(payload: PurchasePayload): Promise<Purchase> {
  const { data } = await api.post(API_URL, payload)
  return data
}

export async function updatePurchase(id: number, payload: PurchasePayload): Promise<Purchase> {
  const { data } = await api.put(`${API_URL}${id}/`, payload)
  return data
}

export async function deletePurchase(id: number): Promise<void> {
  await api.delete(`${API_URL}${id}/`)
}
