// src/router/modules/sales.ts
import SalesList from '@/views/sales/SalesList.vue'
import SaleForm from '@/views/sales/SaleForm.vue'
import SaleDetail from '@/views/sales/SaleDetail.vue'
import SaleEdit from '@/views/sales/SaleEdit.vue'

export default [
  { path: '/sales', name: 'SalesList', component: SalesList, meta: { title: '매출 목록' } },
  { path: '/sales/new', name: 'SaleCreate', component: SaleForm, meta: { title: '매출 등록' } },
  { path: '/sales/:id', name: 'SaleDetail', component: SaleDetail, meta: { title: '매출 상세' }, props: true },
  { path: '/sales/:id/edit', name: 'SaleEdit', component: SaleEdit, meta: { title: '매출 수정' }, props: true },
]
