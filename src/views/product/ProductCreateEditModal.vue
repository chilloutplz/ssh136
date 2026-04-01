<template>
  <ModalLayout @close="$emit('close')">
    <template #header>
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ mode === "create" ? "Add Product" : "Edit Product" }}
      </h2>
    </template>

    <template #body>
      <div class="space-y-6 px-1">
        <!-- 상품명 -->
        <div>
          <label class="block text-sm font-medium">상품명 *</label>
          <input ref="nameInputRef" v-model="name" type="text" class="input-style" required />
        </div>

        <!-- 상품코드 -->
        <div>
          <label class="block text-sm font-medium">상품코드</label>
          <input v-model="code" type="text" class="input-style" />
        </div>

        <!-- 규격 -->
        <div>
          <label class="block text-sm font-medium">규격</label>
          <input v-model="spec" type="text" class="input-style" />
        </div>

        <!-- 단위 -->
        <div>
          <label class="block text-sm font-medium">기본 단위</label>
          <input v-model="baseUnit" type="text" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">매입 단위</label>
          <input v-model="purchaseUnit" type="text" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">매입 환산계수</label>
          <input v-model.number="purchaseConversionFactor" type="number" step="0.01" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">판매 단위</label>
          <input v-model="salesUnit" type="text" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">판매 환산계수</label>
          <input v-model.number="salesConversionFactor" type="number" step="0.01" class="input-style" />
        </div>

        <!-- 옵션 -->
        <div class="flex items-center space-x-4">
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="isResell" />
            <span>재판매 여부</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="isActive" />
            <span>활성 여부</span>
          </label>
        </div>
      </div>
    </template>

    <template #footer>
      <button @click="save" class="btn-primary">
        {{ mode === "create" ? "Save" : "Update" }}
      </button>
      <button @click="$emit('close')" class="btn-secondary">Cancel</button>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue"
import ModalLayout from "@/components/ui/ModalLayout.vue"
import { createProduct, updateProduct } from "@/services/product/productService"
import type { Product } from "@/types/products"

interface Props {
  mode: "create" | "edit"
  product?: Product
}

const props = defineProps<Props>()
const emit = defineEmits(["close", "saved"])

const name = ref("")
const code = ref("")
const spec = ref("")
const baseUnit = ref("")
const purchaseUnit = ref("")
const purchaseConversionFactor = ref(1)
const salesUnit = ref("")
const salesConversionFactor = ref(1)
const isResell = ref(false)
const isActive = ref(true)

const nameInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  if (props.mode === "edit" && props.product) {
    name.value = props.product.name
    code.value = props.product.code || ""
    spec.value = props.product.spec || ""
    baseUnit.value = props.product.base_unit
    purchaseUnit.value = props.product.purchase_unit
    purchaseConversionFactor.value = props.product.purchase_conversion_factor
    salesUnit.value = props.product.sales_unit
    salesConversionFactor.value = props.product.sales_conversion_factor
    isResell.value = props.product.is_resell
    isActive.value = props.product.is_active
  }
  await nextTick()
  nameInputRef.value?.focus()
})

async function save() {
  if (!name.value.trim()) {
    alert("상품명을 입력하세요.")
    return
  }

  const payload = {
    name: name.value,
    code: code.value || "",
    spec: spec.value || "",
    base_unit: baseUnit.value,
    purchase_unit: purchaseUnit.value,
    purchase_conversion_factor: purchaseConversionFactor.value,
    sales_unit: salesUnit.value,
    sales_conversion_factor: salesConversionFactor.value,
    is_resell: isResell.value,
    is_active: isActive.value,
  }

  if (props.mode === "edit" && props.product) {
    await updateProduct(props.product.id, payload)
  } else {
    await createProduct(payload)
  }

  emit("saved")   // 저장 완료 이벤트만 emit → 부모에서 모달 닫기 처리
}
</script>
