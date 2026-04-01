<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="`Purchase #${purchase?.id}`" />

    <div class="p-6 md:p-8" v-if="purchase">
      <h2 class="text-xl font-bold">Supplier: {{ purchase.supplier.name }}</h2>
      <p>Purchased At: {{ new Date(purchase.purchased_at).toLocaleString() }}</p>
      <p>Total Price: {{ purchase.total_price.toLocaleString() }}</p>
      <p>Note: {{ purchase.note || '-' }}</p>

      <h3 class="mt-6 text-lg font-semibold">Items</h3>
      <table class="w-full border-collapse border border-gray-300 mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Product</th>
            <th class="border px-4 py-2">Quantity</th>
            <th class="border px-4 py-2">Unit Price</th>
            <th class="border px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in purchase.items" :key="item.id">
            <td class="border px-4 py-2">{{ item.product.name }}</td>
            <td class="border px-4 py-2">{{ item.quantity }}</td>
            <td class="border px-4 py-2">{{ item.unit_price.toLocaleString() }}</td>
            <td class="border px-4 py-2">{{ (item.quantity * item.unit_price).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-6 flex space-x-4">
        <button @click="goToEdit" class="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
        <button @click="deletePurchaseConfirm" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import { fetchPurchases, deletePurchase } from "@/services/purchase/purchaseService"
import type { Purchase } from "@/types/purchase"

const route = useRoute()
const router = useRouter()
const purchase = ref<Purchase>()

async function loadPurchase() {
  const id = Number(route.params.id)
  const purchases = await fetchPurchases()
  purchase.value = purchases.find(p => p.id === id)
}

function goToEdit() {
  router.push(`/purchases/${purchase.value!.id}/edit`)
}

async function deletePurchaseConfirm() {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deletePurchase(purchase.value!.id)
    router.push("/purchases")
  }
}

onMounted(loadPurchase)
</script>
