// src/libs/axios.ts
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

// 요청 인터셉터 → Access Token 자동 추가
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.access) {
    config.headers.Authorization = `Bearer ${auth.access}`
  }
  return config
})

// 응답 인터셉터 → 401 발생 시 refreshToken 시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuthStore()
    const originalRequest = error.config

    if (error.response?.status === 401) {
      // Access Token 만료 → refresh 시도
      if (auth.refresh && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          await auth.refreshToken()
          originalRequest.headers.Authorization = `Bearer ${auth.access}`
          return api(originalRequest)
        } catch (refreshError) {
          // refresh 실패 → 로그아웃 + 안내 페이지 이동
          await auth.logout()
          router.push('/accounts/session-expired') // 안내 페이지로 이동
          return Promise.reject(refreshError)
        }
      } else {
        // 이미 refresh 실패한 상태 → 바로 로그아웃 처리
        await auth.logout()
        router.push('/accounts/session-expired')
      }
    }

    return Promise.reject(error)
  }
)

export default api
