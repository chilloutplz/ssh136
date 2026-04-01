<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="mode === 'create' ? 'Create Purchase' : `Edit Purchase #${route.params.id}`" />

    <div class="p-6 md:p-8">
      <form @submit.prevent="save">
        <!-- Supplier -->
        <div class="mb-4">
          <label class="block text-sm font-medium">Supplier *</label>
          <select v-model="supplierId" class="input-style" required>
            <option v-for="party in parties" :key="party.id" :value="party.id">
              {{ party.name }}
            </option>
          </select>
        </div>

        <!-- Purchased At -->
        <div class="mb-4">
          <label class="block text-sm font-medium">Purchased At *</label>
          <input v-model="purchasedAt" type="datetime-local" class="input-style" required />
        </div>

        <!-- Note -->
        <div class="mb-4">
          <label class="block text-sm font-medium">Note</label>
          <textarea v-model="note" class="input-style"></textarea>
        </div>

        <!-- Items -->
        <h3 class="mt-6 text-lg font-semibold">Items</h3>
        <table class="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-4 py-2">Product</th>
              <th class="border px-4 py-2">Quantity</th>
              <th class="border px-4 py-2">Unit Price</th>
              <th class="border px-4 py-2">Subtotal</th>
              <th class="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="border px-4 py-2">
                <select v-model="item.productId" class="input-style" required>
                  <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.name }}
                  </option>
                </select>
              </td>
              <td class="border px-4 py-2">
                <input v-model.number="item.quantity" type="number" step="0.01" class="input-style" required />
              </td>
              <td class="border px-4 py-2">
                <input v-model.number="item.unitPrice" type="number" step="0.01" class="input-style" required />
              </td>
              <td class="border px-4 py-2">
                {{ (item.quantity * item.unitPrice).toLocaleString() }}
              </td>
              <td class="border px-4 py-2">
                <button type="button" @click="removeItem(index)" class="text-red-600">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" @click="addItem" class="mt-2 px-4 py-2 bg-gray-200 rounded">Add Item</button>

        <!-- Total -->
        <div class="mt-6 font-bold">
          Total: {{ totalPrice.toLocaleString() }}
        </div>

        <!-- Save -->
        <div class="mt-6">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ mode === 'create' ? 'Save' : 'Update' }}
          </button>
          <button type="button" @click="cancel" class="ml-2 px-4 py-2 bg-gray-300 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import { fetchPurchases, createPurchase, updatePurchase } from "@/services/purchase/purchaseService"
import { fetchParties } from "@/services/party/partyService"
import { fetchProducts } from "@/services/product/productService"
import type { Purchase, PurchasePayload } from "@/types/purchase"
import type { Party } from "@/types/parties"
import type { Product } from "@/types/products"

const route = useRoute()
const router = useRouter()

const mode = route.name === "PurchaseCreate" ? "create" : "edit"

const supplierId = ref<number>()
const purchasedAt = ref("")
const note = ref("")
const items = ref<{ productId?: number; quantity: number; unitPrice: number }[]>([])

const parties = ref<Party[]>([])
const products = ref<Product[]>([])

const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
)

function addItem() {
  items.value.push({ productId: undefined, quantity: 1, unitPrice: 0 })
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}

async function save() {
  const payload: PurchasePayload = {
    supplier: supplierId.value!, // number
    purchased_at: purchasedAt.value,
    note: note.value,
    items: items.value.map(i => ({
      product: i.productId!, // number
      quantity: i.quantity,
      unit_price: i.unitPrice,
    })),
  }

  if (mode === "edit") {
    const id = Number(route.params.id)
    await updatePurchase(id, payload)
    router.push(`/purchases/${id}`)
  } else {
    const purchase = await createPurchase(payload)
    router.push(`/purchases/${purchase.id}`)
  }
}

function cancel() {
  router.push("/purchases")
}

onMounted(async () => {
  parties.value = await fetchParties()
  products.value = await fetchProducts().then(res => Array.isArray(res) ? res : res.results)

  if (mode === "edit") {
    const id = Number(route.params.id)
    const purchases = await fetchPurchases()
    const purchase = purchases.find(p => p.id === id) as Purchase
    supplierId.value = purchase.supplier.id
    purchasedAt.value = purchase.purchased_at
    note.value = purchase.note || ""
    items.value = purchase.items.map(i => ({
      productId: i.product.id,
      quantity: i.quantity,
      unitPrice: i.unit_price,
    }))
  }
})
</script>
