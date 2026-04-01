// src/router/modules/purchases.ts
import PurchasesList from '@/views/purchases/PurchasesList.vue'
import PurchaseForm from '@/views/purchases/PurchaseForm.vue'
import PurchaseDetail from '@/views/purchases/PurchaseDetail.vue'

export default [
  {
    path: '/purchases',
    name: 'PurchasesList',
    component: PurchasesList,
    meta: { title: '구매 목록' },
  },
  {
    path: '/purchases/new',
    name: 'PurchaseCreate',
    component: PurchaseForm,
    meta: { title: '구매 등록' },
  },
  {
    path: '/purchases/:id',
    name: 'PurchaseDetail',
    component: PurchaseDetail,
    meta: { title: '구매 상세' },
    props: true,
  },
  {
    path: '/purchases/:id/edit',
    name: 'PurchaseEdit',
    component: PurchaseForm,
    meta: { title: '구매 수정' },
    props: true,
  },
]
