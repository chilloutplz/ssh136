import api from "@/libs/axios"
import { Branch, BranchPayload } from "@/types/organization"

export async function fetchBranches(): Promise<Branch[]> {
  return (await api.get("/api/organization/branches/")).data
}

export async function createBranch(payload: BranchPayload): Promise<Branch> {
  return (await api.post("/api/organization/branches/", payload)).data
}

export async function updateBranch(id: number, payload: Partial<BranchPayload>): Promise<Branch> {
  return (await api.put(`/api/organization/branches/${id}/`, payload)).data
}

export async function deleteBranch(id: number): Promise<void> {
  await api.delete(`/api/organization/branches/${id}/`)
}
