// src/services/party/partyService.ts
import api from "@/libs/axios"
import { Party } from '@/types/parties'

const API_URL = "/api/party/parties/"

// 거래처 목록 조회
export async function fetchParties(): Promise<Party[]> {
  const { data } = await api.get(API_URL)
  return Array.isArray(data) ? data : []
}

// 거래처 등록
export async function createParty(party: Partial<Party>): Promise<Party> {
  const { data } = await api.post(API_URL, party)
  return data
}

// 거래처 수정
export async function updateParty(id: number, party: Partial<Party>): Promise<Party> {
  const { data } = await api.put(`${API_URL}${id}/`, party)
  return data
}

// 거래처 삭제
export async function deleteParty(id: number): Promise<void> {
  await api.delete(`${API_URL}${id}/`)
}
