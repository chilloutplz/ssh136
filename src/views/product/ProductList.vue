<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <!-- 상단 버튼 -->
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Product
      </button>

      <!-- 로딩 중 -->
      <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="n in 3" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg"></div>
      </div>

      <!-- 데이터 없음 -->
      <div v-else-if="products.length === 0" class="mt-6 text-center text-gray-500 dark:text-gray-400">
        등록된 상품이 없습니다.
      </div>

      <!-- 데이터 있음 -->
      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard
          v-for="product in products"
          :key="product.id"
          :title="product.name"
          :desc="product.code ? `코드: ${product.code}` : '코드 없음'"
        >
          <p class="text-sm text-gray-600 dark:text-gray-400">
            규격: {{ product.spec || '-' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            기본 단위: {{ product.base_unit }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            매입 단위: {{ product.purchase_unit }} (환산 {{ product.purchase_conversion_factor }})
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            판매 단위: {{ product.sales_unit }} (환산 {{ product.sales_conversion_factor }})
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            재판매: {{ product.is_resell ? '예' : '아니오' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            상태: {{ product.is_active ? '활성' : '비활성' }}
          </p>

          <template #footer>
            <div class="flex justify-end space-x-3">
              <button
                @click="editProduct(product)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(product.id)"
                class="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>

      <!-- 모달 -->
      <ProductCreateEditModal
        v-if="showCreate"
        mode="create"
        @saved="() => { loadProducts(); showCreate = false }"
        @close="showCreate = false"
      />
      <ProductCreateEditModal
        v-if="showEdit && selectedProduct"
        mode="edit"
        :product="selectedProduct"
        @saved="() => { loadProducts(); showEdit = false }"
        @close="showEdit = false"
      />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { Product } from "@/types/products"
import { fetchProducts, deleteProduct } from "@/services/product/productService"
import ProductCreateEditModal from "./ProductCreateEditModal.vue"

const loading = ref(false)
const products = ref<Product[]>([])
const showCreate = ref(false)
const showEdit = ref(false)
const selectedProduct = ref<Product>()

const currentPageTitle = "Product List"

async function loadProducts() {
  loading.value = true
  try {
    const response = await fetchProducts()
    // pagination을 사용하는 경우 response.results, 아닌 경우 response 자체가 배열
    products.value = Array.isArray(response) ? response : response.results
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  showCreate.value = true
}

function editProduct(product: Product) {
  selectedProduct.value = product
  showEdit.value = true
}

async function confirmDelete(id: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deleteProduct(id)
    await loadProducts()
  }
}

onMounted(loadProducts)
</script>
