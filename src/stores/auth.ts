// src/stores/auth.ts
import router from '@/router'
import { defineStore } from 'pinia'
import api from '@/libs/axios'
import type { AxiosError } from 'axios'

type User = {
  name: string
  email: string
  companyId?: string
  brandId?: string
  branchId?: string
  status?: string
}

type ApiErrorBody = {
  message?: string
  detail?: string
  status?: string
  [key: string]: unknown
}

function getErrorMessage(error: unknown): string {
  const err = error as AxiosError<ApiErrorBody>
  return (
    err.response?.data?.message ??
    err.response?.data?.detail ??
    err.message ??
    '요청 처리 중 오류가 발생했습니다.'
  )
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    access: localStorage.getItem('access') as string | null,
    refresh: localStorage.getItem('refresh') as string | null,
  }),

  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const res = await api.post<{
          access?: string
          refresh?: string
          user?: User
        }>('/api/accounts/auth/login/', { email, password })

        // 응답에서 사용자 상태 먼저 확인
        const userStatus = res.data.user?.status

        // pending이나 rejected 상태면 토큰을 저장하지 않음
        if (userStatus === 'pending') {
          this.logout()
          await router.push('/accounts/pending')
          return
        }

        if (userStatus === 'rejected') {
          this.logout()
          await router.push('/accounts/rejected')
          return
        }

        // 정상 승인된 사용자만 토큰 저장
        this.access = res.data.access ?? null
        this.refresh = res.data.refresh ?? null
        this.user = res.data.user ?? null

        if (this.access) localStorage.setItem('access', this.access)
        if (this.refresh) localStorage.setItem('refresh', this.refresh)

        // 정상 로그인 → 대시보드 이동
        await router.push('/dashboard')
      } catch (error: unknown) {
        const err = error as AxiosError<ApiErrorBody>
        let status = err.response?.data?.status
        let detail = err.response?.data?.detail

        // 배열일 경우 첫 번째 값만 사용
        if (Array.isArray(status)) {
          status = status[0]
        }
        if (Array.isArray(detail)) {
          detail = detail[0]
        }

        // 에러 응답에서도 상태 확인
        if (status === 'pending') {
          this.logout()
          await router.push('/accounts/pending')
          return
        }

        if (status === 'rejected') {
          this.logout()
          await router.push('/accounts/rejected')
          return
        }

        throw new Error(getErrorMessage(error))
      }
    },

    async register(
      email: string,
      password: string,
      name: string,
      companyId: string,
      brandId: string,
      branchId: string,
    ): Promise<void> {
      try {
        await api.post('/api/accounts/auth/register/', {
          email,
          password,
          name,
          companyId,
          brandId,
          branchId,
        })
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
      }
    },

    async refreshToken(): Promise<void> {
      if (!this.refresh) {
        this.logout()
        return
      }
      try {
        const res = await api.post<{ access?: string; refresh?: string }>(
          '/api/accounts/auth/refresh/',
          { refresh: this.refresh },
        )
        this.access = res.data.access ?? null
        if (this.access) localStorage.setItem('access', this.access)

        // refresh 토큰도 갱신되는 경우
        if (res.data.refresh) {
          this.refresh = res.data.refresh
          localStorage.setItem('refresh', this.refresh)
        }
      } catch (error: unknown) {
        this.logout()
        throw new Error(getErrorMessage(error))
      }
    },

    async logout(skipRedirect = false): Promise<void> {
      // 1. 상태 초기화
      this.access = null
      this.refresh = null
      this.user = null

      // 2. 로컬스토리지 정리
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')

      // 3. Landing 페이지로 이동
      if (!skipRedirect) {
        await router.push('/')
      }
    },
  },
})
