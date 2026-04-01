<!-- src/views/organization/company/CompanyList.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <!-- 상단 버튼 -->
      <button @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Add Company
      </button>

      <!-- 로딩 중일 때 Skeleton UI -->
      <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <!-- Skeleton UI -->
        <div v-for="n in 3" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg"></div>
      </div>

      <!-- 데이터 없을 때 메시지 -->
      <div v-else-if="companies.length === 0" class="mt-6 text-center text-gray-500 dark:text-gray-400">
        등록된 회사가 없습니다.
      </div>

      <!-- 데이터 있을 때 카드 -->
      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard v-for="company in companies" :key="company.id" :title="company.name"
          :desc="`대표자: ${company.representative}`">
          <!-- 카드 본문 -->
          <p class="text-sm text-gray-600 dark:text-gray-400">
            사업자번호: {{ company.business_number }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            ({{ company.postcode }}) {{ company.base_address }} {{ company.detail_address }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Tel. {{ company.phone }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Fax. {{ company.fax }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            e-mail {{ company.email }}
          </p>

          <!-- 카드 헤더 버튼 슬롯 -->
          <template #header-button>
            <!-- <button @click="editCompany(company)"
              class="text-sm text-blue-600 hover:underline focus:outline-none">
              Edit
            </button> -->
          </template>

          <!-- 카드 Footer -->
          <template #footer>
            <div class="flex justify-end space-x-3">
              <!-- Secondary 버튼 -->
              <button @click="editCompany(company)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                Edit
              </button>

              <!-- Primary 버튼 -->
              <button @click="confirmDelete(company.id)"
                class="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Delete
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>

      <!-- 모달 외부 참조 -->
      <CompanyCreateEditModal v-if="showCreate" mode="create" @close="showCreate = false" @saved="loadCompanies" />
      <CompanyCreateEditModal v-if="showEdit && selectedCompany" mode="edit" :company="selectedCompany"
        @close="showEdit = false" @saved="loadCompanies" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { Company } from "@/types/organization"
import { fetchCompanies, deleteCompany } from "@/services/organization/companyService"
import CompanyCreateEditModal from "./CompanyCreateEditModal.vue"

const loading = ref(false)
const companies = ref<Company[]>([])
const showCreate = ref(false)
const showEdit = ref(false)
const selectedCompany = ref<Company>()

const currentPageTitle = "Company List"

async function loadCompanies() {
  loading.value = true
  try {
    companies.value = await fetchCompanies()
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  showCreate.value = true
}

function editCompany(company: Company) {
  selectedCompany.value = company
  showEdit.value = true
}

async function confirmDelete(id: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deleteCompany(id)
    await loadCompanies()
  }
}

onMounted(loadCompanies)
</script>
