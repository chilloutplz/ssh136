import LoginPage from '@/views/accounts/LoginPage.vue'
import RegisterPage from '@/views/accounts/RegisterPage.vue'
import ProfilePage from '@/views/accounts/ProfilePage.vue'
import PendingPage from '@/views/accounts/PendingPage.vue'
import RejectedPage from '@/views/accounts/RejectedPage.vue'
import SessionExpiredPage from '@/views/accounts/SessionExpired.vue'

export default [
  { path: '/accounts/login', name: 'Login', component: LoginPage, meta: { title: 'Login' } },
  { path: '/accounts/register', name: 'Register', component: RegisterPage, meta: { title: 'Register' } },
  { path: '/accounts/profile', name: 'Profile', component: ProfilePage, meta: { title: 'Profile' } },
  { path: '/accounts/pending', name: 'Pending', component: PendingPage, meta: { title: '승인 대기' } },
  { path: '/accounts/rejected', name: 'Rejected', component: RejectedPage, meta: { title: '가입 거절' } },
  { path: '/accounts/session-expired', name: 'SessionExpired', component: SessionExpiredPage, meta: { title: '세션 만료' } },
]
