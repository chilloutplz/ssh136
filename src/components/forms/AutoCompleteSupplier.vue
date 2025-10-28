<!-- /src/components/forms/SupplierSelect.vue -->
<template>
  <div class="relative">
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      거래처명
    </label>
    <input ref="input" v-model="keyword" @input="onInput" @focus="showDropdown = true" @blur="hideDropdown" type="text"
      placeholder="거래처명을 입력하세요"
      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />

    <!-- 후보 리스트 -->
    <ul v-if="showDropdown && suggestions.length"
      class="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-dark-800">
      <li v-for="supplier in suggestions" :key="supplier.id" @mousedown.prevent="selectSupplier(supplier)"
        class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-700">
        {{ supplier.name }}
      </li>

      <!-- 결과 없음 표시 -->
      <li v-if="suggestions.length === 0" class="px-4 py-2 text-sm text-gray-400 dark:text-white/30">
        결과가 없습니다
      </li>

    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import api from '@/libs/axios'

interface Supplier {
  id: number
  name: string
  business_number: string
}

const props = defineProps<{
  modelValue: Supplier | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Supplier | null): void
}>()

const keyword = ref('')
const suggestions = ref<Supplier[]>([])
const showDropdown = ref(false)
const input = ref<HTMLInputElement | null>(null)

// ✅ 외부에서 modelValue가 바뀌면 keyword에 반영
watch(
  () => props.modelValue,
  (supplier) => {
    keyword.value = supplier?.name || ''
  },
  { immediate: true }
)

const onInput = async () => {
  if (keyword.value.length < 2) {
    suggestions.value = []
    return
  }

  try {
    const res = await api.get(`/purchase/suppliers?search=${keyword.value}`)
    suggestions.value = res.data
  } catch (err) {
    console.error('거래처 검색 실패:', err)
  }
}

const selectSupplier = (supplier: Supplier) => {
  keyword.value = supplier.name
  emit('update:modelValue', supplier)
  showDropdown.value = false
}

const hideDropdown = () => {
  nextTick(() => {
    showDropdown.value = false
  })
}
</script>
