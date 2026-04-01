<template>
  <div class="min-h-screen bg-[#1C2434] text-white font-sans">
    <!-- Header -->
    <header class="border-b border-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="text-2xl font-bold text-white">{{ appName }}</div>
          <nav class="hidden md:flex space-x-8">
            <a href="#features" class="text-[#8A99AF] hover:text-white transition">기능</a>
            <a href="#pricing" class="text-[#8A99AF] hover:text-white transition">요금제</a>
            <a href="#about" class="text-[#8A99AF] hover:text-white transition">문의</a>
          </nav>

          <!-- 로그인 상태에 따라 버튼 분기 -->
          <template v-if="!isAuthenticated">
            <button @click="$router.push('/accounts/login')"
              class="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition">
              로그인
            </button>
          </template>
          <template v-else>
            <div class="flex gap-3">
              <!-- Home 버튼 (Primary) -->
              <button @click="$router.push('/dashboard')"
                class="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition">
                Home
              </button>

              <!-- 로그아웃 버튼 (Danger) -->
              <button @click="handleLogout"
                class="bg-secondary text-white px-6 py-2 rounded-md hover:bg-secondary-dark transition">
                로그아웃
              </button>
            </div>
          </template>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          숙성회136 운영의 모든 것
          <span class="block text-primary mt-2">하나의 시스템으로 완성하세요</span>
        </h1>
        <p class="text-xl text-[#8A99AF] mb-8 max-w-2xl mx-auto">
          매출, 정산, 매입, 재고, 원가 관리까지 통합 관리 시스템으로
          경영에 투명함과 효율을 더해 보세요.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <!-- 로그인 안 된 경우 -->
          <template v-if="!isAuthenticated">
            <button @click="$router.push('/accounts/register')"
              class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md flex items-center justify-center gap-2 transition">
              회원가입
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button @click="$router.push('/accounts/login')"
              class="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-md transition">
              로그인
            </button>
          </template>

          <!-- 로그인 된 경우 -->
          <template v-else>
            <button @click="$router.push('/dashboard')"
              class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition">
              Go →
            </button>
          </template>
        </div>

      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-[#24303F]">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12">강력한 기능</h2>

        <!-- Multi-tenancy 특별 강조 섹션 -->
        <div class="mb-16 bg-linear-to-r from-primary/10 to-primary/5 border border-primary rounded-lg p-8">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="shrink-0">
              <svg class="w-20 h-20 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold mb-3 text-white">하나의 계정으로 모든 지점 관리</h3>
              <p class="text-[#8A99AF] mb-4">
                여러 지점을 운영하시나요? 각 지점마다 로그인할 필요 없이 하나의 계정으로 모든 지점을 한눈에 관리하세요.
                지점 간 매출 비교, 통합 재고 현황, 원가 분석까지 모두 가능합니다.
              </p>
              <div class="flex flex-wrap gap-3">
                <span class="px-3 py-1 bg-primary text-white rounded-full text-sm">빠른 지점 전환</span>
                <span class="px-3 py-1 bg-primary text-white rounded-full text-sm">통합 대시보드</span>
                <span class="px-3 py-1 bg-primary text-white rounded-full text-sm">지점별 권한 관리</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index"
            class="bg-[#1C2434] p-6 rounded-lg border border-secondary hover:border-primary transition">
            <div class="mb-4" v-html="feature.icon"></div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-[#8A99AF]">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12">매장 규모에 맞는 요금제</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(plan, index) in pricingPlans" :key="index" :class="[
            'bg-[#24303F] p-8 rounded-lg border relative',
            plan.popular ? 'border-primary' : 'border-secondary'
          ]">
            <div v-if="plan.popular"
              class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
              인기
            </div>
            <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
            <div class="mb-6">
              <span class="text-4xl font-bold">{{ plan.price }}</span>
              <span class="text-[#8A99AF]">/월</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li v-for="(feature, i) in plan.features" :key="i" class="flex items-center gap-2 text-[#8A99AF]">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
              </li>
            </ul>
            <button :class="[
              'w-full py-3 rounded-md transition',
              plan.popular
                ? 'bg-primary hover:bg-primary-dark text-white'
                : 'bg-secondary hover:bg-secondary-dark text-white'
            ]">
              선택하기
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-[#24303F]">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">지금 바로 시작하세요</h2>
        <p class="text-xl text-[#8A99AF] mb-8">
          이미 {{ companyName }} 지점이 {{ appName }}로 효율적인 운영을 하고 있습니다.
        </p>

        <!-- 로그인 상태에 따라 버튼 분기 -->
        <template v-if="!isAuthenticated">
          <button @click="$router.push('/accounts/register')"
            class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md flex items-center gap-2 mx-auto transition">
            회원 가입
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </template>

        <template v-else>
          <button @click="$router.push('/dashboard')"
            class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md flex items-center gap-2 mx-auto transition">
            Go →
          </button>
        </template>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-secondary py-8 px-4">
      <div class="max-w-7xl mx-auto text-center text-[#8A99AF]">
        <p>&copy; {{ copyrightYear }} {{ appName }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isAuthenticated = computed(() => !!auth.access)

const appName = import.meta.env.VITE_APP_NAME
const companyName = import.meta.env.VITE_COMPANY_NAME
const copyrightYear = import.meta.env.VITE_COPYRIGHT_YEAR

function handleLogout() {
  auth.logout()
  // 로그아웃 후 Landing 페이지로 이동
  window.location.href = '/'
}

const features = ref([
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg>',
    title: "Dashboard",
    description: "매출, 정산, 매입 현황을 비교 분석하여 한눈에 파악하고 빠른 의사결정을 할 수 있습니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
    title: "매출",
    description: "사용 중인 POS의 매출 데이터를 클롤링하여 다양한 리포트를 생성합니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: "정산",
    description: "배달 플랫폼 수수료, 배달비, 쿠폰 지급 등 경비를 계산하고 실제 수익금을 정확하게 정산합니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: "매입",
    description: "매입 입력을 자동화하고 매입 내역을 체계적으로 관리하여 비용 처리를 간소화합니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>',
    title: "재고",
    description: "매출 대비 자재 매입 주기를 분석하여 재고 부족이나 과다 재고를 방지합니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    title: "직원",
    description: "출퇴근 기록, 급여 계산, 근무 스케줄 관리까지 직원 관리를 효율적으로 처리합니다."
  },
  {
    icon: '<svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
    title: "모바일",
    description: "언제 어디서나 스마트폰으로 모든 기능을 확인하고 관리할 수 있습니다."
  }
]);

const pricingPlans = ref([
  {
    name: "스타터",
    price: "₩49,000",
    features: ["1개 매장", "기본 POS 기능", "재고 관리", "매출 리포트", "이메일 지원"],
    popular: false
  },
  {
    name: "프로페셔널",
    price: "₩99,000",
    features: ["최대 3개 매장", "고급 POS 기능", "재고 + 발주 관리", "상세 매출 분석", "직원 관리", "전화 지원"],
    popular: true
  },
  {
    name: "엔터프라이즈",
    price: "₩199,000",
    features: ["무제한 매장", "모든 기능 포함", "커스텀 리포트", "API 연동", "전담 매니저", "24/7 지원"],
    popular: false
  }
]);

</script>

<style scoped>
/* TailAdmin 스타일은 Tailwind CSS 클래스로 적용됨 */
</style>
