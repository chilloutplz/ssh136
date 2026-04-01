// src/router/modules/inventory.ts
import InventoryList from '@/views/inventory/InventoryList.vue'
import InventoryDetail from '@/views/inventory/InventoryDetail.vue'

export default [
  { path: '/inventory', name: 'InventoryList', component: InventoryList, meta: { title: '재고 현황' } },
  { path: '/inventory/:id', name: 'InventoryDetail', component: InventoryDetail, meta: { title: '재고 상세' }, props: true },
]
