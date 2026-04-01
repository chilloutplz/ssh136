// src/env.d.ts
/// <reference types="vite/client" />

export {}

declare global {
  interface DaumPostcodeData {
    zonecode: string // 우편번호
    address: string // 기본 주소
    roadAddress?: string // 도로명 주소
    jibunAddress?: string // 지번 주소
    buildingName?: string // 건물명
    apartment?: string // 아파트 여부
    bname?: string // 법정동명
    bname1?: string // 법정리명
    bname2?: string // 법정동/리명
  }

  interface DaumPostcodeOptions {
    oncomplete: (data: DaumPostcodeData) => void
    width?: string | number
    height?: string | number
  }

  interface DaumPostcodeInstance {
    open: () => void
    embed: (element: HTMLElement) => void
  }

  interface DaumPostcodeConstructor {
    new (options: DaumPostcodeOptions): DaumPostcodeInstance
  }

  interface Window {
    daum?: {
      Postcode: DaumPostcodeConstructor
    }
  }
}
