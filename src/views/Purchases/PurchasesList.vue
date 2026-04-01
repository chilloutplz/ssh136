<template>
  <AdminLayout>
    <PageBreadcrumb pageTitle="Purchase List" />

    <div class="p-6 md:p-8">
      <button
        @click="goToCreate"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Purchase
      </button>

      <div v-if="loading" class="mt-6">Loading...</div>
      <div v-else-if="purchases.length === 0" class="mt-6 text-gray-500">No purchases found.</div>

      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard
          v-for="purchase in purchases"
          :key="purchase.id"
          :title="`Purchase #${purchase.id}`"
          :desc="`Supplier: ${purchase.supplier.name}`"
        >
          <p>Purchased At: {{ new Date(purchase.purchased_at).toLocaleString() }}</p>
          <p>Total Price: {{ purchase.total_price.toLocaleString() }}</p>
          <p>Note: {{ purchase.note || '-' }}</p>

          <template #footer>
            <div class="flex justify-end space-x-3">
              <button
                @click="goToDetail(purchase.id)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Detail
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { fetchPurchases } from "@/services/purchase/purchaseService"
import type { Purchase } from "@/types/purchase"

const router = useRouter()
const purchases = ref<Purchase[]>([])
const loading = ref(false)

async function loadPurchases() {
  loading.value = true
  purchases.value = await fetchPurchases()
  loading.value = false
}

function goToCreate() {
  router.push("/purchases/create")
}

function goToDetail(id: number) {
  router.push(`/purchases/${id}`)
}

onMounted(loadPurchases)
</script>
