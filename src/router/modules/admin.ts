// src/router/modules/admin.ts
import CompanyListPage from '@/views/organization/company/CompanyList.vue'
import BrandListPage from '@/views/organization/brand/BrandList.vue'
import BranchListPage from '@/views/organization/branch/BranchList.vue'
import PartyListPage from '@/views/party/PartyList.vue'
import ProductListPage from '@/views/product/ProductList.vue'

export default [
  { path: '/companies', name: 'OrganizationCompanyList', component: CompanyListPage, meta: { title: 'Company List' } },
  { path: '/brands', name: 'OrganizationBrandList', component: BrandListPage, meta: { title: 'Brand List' } },
  { path: '/branches', name: 'OrganizationBranchList', component: BranchListPage, meta: { title: 'Branch List' } },
  { path: '/parties', name: 'PartyList', component: PartyListPage, meta: { title: 'Party List' } },
  { path: '/products', name: 'ProductList', component: ProductListPage, meta: { title: 'Product List' } },
]
