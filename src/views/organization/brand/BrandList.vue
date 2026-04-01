<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <!-- 상단 버튼 -->
      <button @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Add Brand
      </button>

      <!-- 로딩 중일 때 Skeleton UI -->
      <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <!-- Skeleton UI -->
        <div v-for="n in 3" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg"></div>
      </div>

      <!-- 데이터 없을 때 메시지 -->
      <div v-else-if="brands.length === 0" class="mt-6 text-center text-gray-500 dark:text-gray-400">
        등록된 브랜드가 없습니다.
      </div>

      <!-- 데이터 있을 때 카드 -->
      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard v-for="brand in brands" :key="brand.id" :title="brand.name"
          :desc="`${brand.company_name}`">
          <!-- 카드 본문 -->
          <p class="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {{ brand.description }}
          </p>

          <!-- 카드 Footer -->
          <template #footer>
            <div class="flex justify-end space-x-3">
              <button @click="editBrand(brand)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                Edit
              </button>
              <button @click="confirmDelete(brand.id)"
                class="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Delete
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>

      <!-- 모달 -->
      <BrandCreateEditModal v-if="showCreate" mode="create" @close="showCreate = false" @saved="loadBrands" />
      <BrandCreateEditModal v-if="showEdit && selectedBrand" mode="edit" :brand="selectedBrand" @close="showEdit = false"
        @saved="loadBrands" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { Brand } from "@/types/organization"
import { fetchBrands, deleteBrand } from "@/services/organization/brandService"
import BrandCreateEditModal from "./BrandCreateEditModal.vue"

const loading = ref(false)
const brands = ref<Brand[]>([])
const showCreate = ref(false)
const showEdit = ref(false)
const selectedBrand = ref<Brand>()

const currentPageTitle = "Brand List"

async function loadBrands() {
  loading.value = true
  try {
    brands.value = await fetchBrands()
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  showCreate.value = true
}

function editBrand(brand: Brand) {
  selectedBrand.value = brand
  showEdit.value = true
}

async function confirmDelete(id: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deleteBrand(id)
    await loadBrands()
  }
}

onMounted(loadBrands)
</script>
