// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import accountsRoutes from './modules/accounts'
import dashboardRoutes from './modules/dashboards'
import adminRoutes from './modules/admin'
import purchasesRoutes from './modules/purchases'
import salesRoutes from './modules/sales'
import inventoryRoutes from './modules/inventory'
import accountingRoutes from './modules/accounting'

import LandingPage from '@/views/LandingPage.vue'
import IconGallery from '@/views/Pages/IconGallery.vue'
import Calendar from '@/views/Others/CalendarVue.vue'
import NotFoundPage from '@/views/Errors/FourZeroFour.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Landing', component: LandingPage, meta: { title: 'Landing' } },
    { path: '/icon-gallery', name: 'IconGallery', component: IconGallery, meta: { title: 'Icon Gallery' } },
    { path: '/calendar', name: 'Calendar', component: Calendar, meta: { title: 'Calendar' } },

    //  모듈별 라우트 합치기
    ...accountsRoutes,
    ...dashboardRoutes,
    ...adminRoutes,       // Company, Brand, Branch, Party, Product
    ...purchasesRoutes,   // Purchase
    ...salesRoutes,       // Sale
    ...inventoryRoutes,   // Inventory
    ...accountingRoutes,  // Accounting

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage, meta: { title: '404 Not Found' } },
  ],
})

// 인증 가드
router.beforeEach((to, from, next) => {
  document.title = `SSH136 | ${to.meta.title}`

  const auth = useAuthStore()
  const isAuthenticated = !!auth.access

  const publicPages = ['/', '/accounts/login', '/accounts/register', '/accounts/session-expired']

  if (isAuthenticated && (to.path === '/accounts/login' || to.path === '/accounts/register')) {
    return next('/dashboard')
  }

  if (publicPages.includes(to.path)) {
    return next()
  }

  if (!isAuthenticated) {
    return next('/accounts/login')
  }

  next()
})

export default router
