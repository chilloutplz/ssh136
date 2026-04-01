<!-- AutoCompleteSupplier.vue -->
<template>
  <div class="relative">
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      거래처명
    </label>
    <input
      ref="input"
      v-model="keyword"
      @input="onInput"
      @focus="onFocus"
      @blur="hideDropdown"
      type="text"
      placeholder="거래처명을 입력하세요"
      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />

    <!-- 후보 리스트 -->
    <ul v-if="showDropdown && keyword.length >= 1"
      class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-dark-800">

      <!-- 로딩 중 -->
      <li v-if="isLoading" class="px-4 py-2 text-sm text-gray-400 dark:text-white/30">
        검색 중...
      </li>

      <!-- 결과 표시 -->
      <template v-else>
        <li
          v-for="supplier in suggestions"
          :key="supplier.id"
          @mousedown.prevent="selectSupplier(supplier)"
          class="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-dark-700"
        >
          {{ supplier.name }}
          <span class="text-xs text-gray-500 ml-2">({{ supplier.business_number }})</span>
        </li>

        <!-- 결과 없을 때 신규 등록 버튼 -->
        <li v-if="suggestions.length === 0" class="border-t border-gray-200 dark:border-gray-700">
          <button
            @mousedown.prevent="openNewSupplierModal"
            class="w-full px-4 py-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-dark-700 flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            "{{ keyword }}" 신규 거래처 등록
          </button>
        </li>
      </template>
    </ul>

    <!-- 신규 거래처 등록 모달 -->
    <Modal v-if="showNewSupplierModal" @close="closeNewSupplierModal">
      <template #header>
        <h3 class="text-xl font-semibold">신규 거래처 등록</h3>
      </template>

      <template #body>
        <div class="space-y-4">
          <FormInput
            label="거래처명"
            v-model="newSupplier.name"
            placeholder="거래처명"
            :required="true"
          />
          <FormInput
            label="사업자번호"
            v-model="newSupplier.business_number"
            placeholder="123-45-67890"
            :required="true"
          />
          <FormInput
            label="대표자명"
            v-model="newSupplier.representative"
            placeholder="홍길동"
          />
          <FormInput
            label="연락처"
            v-model="newSupplier.contact"
            placeholder="010-1234-5678"
          />
          <TextArea
            label="주소"
            v-model="newSupplier.address"
            placeholder="주소를 입력하세요"
          />
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3 justify-end">
          <Button variant="outline" @click="closeNewSupplierModal">취소</Button>
          <Button variant="primary" @click="createNewSupplier">등록</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import api from '@/libs/axios'
import Modal from '@/components/ui/ModalLayout.vue'
import FormInput from '@/components/forms/FormInput.vue'
import TextArea from '@/components/forms/TextArea.vue'
import Button from '@/components/ui/Button.vue'

onMounted(() => {
  // 페이지 로딩 시 자동 포커스
  input.value?.focus()
})

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
const isLoading = ref(false)
const input = ref<HTMLInputElement | null>(null)

// 신규 등록 모달 관련
const showNewSupplierModal = ref(false)
const newSupplier = ref({
  name: '',
  business_number: '',
  representative: '',
  contact: '',
  address: ''
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.modelValue,
  (supplier) => {
    keyword.value = supplier?.name || ''
  },
  { immediate: true }
)

const onFocus = () => {
  if (keyword.value.length >= 2) {
    showDropdown.value = true
  }
}

const onInput = async () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  if (keyword.value.length < 1) {
    suggestions.value = []
    showDropdown.value = false
    emit('update:modelValue', null)
    return
  }

  showDropdown.value = true

  debounceTimer = setTimeout(async () => {
    isLoading.value = true

    try {
      const res = await api.get(`/purchase/suppliers/`, {
        params: { search: keyword.value }
      })
      suggestions.value = res.data
    } catch (err) {
      console.error('거래처 검색 실패:', err)
      suggestions.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
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

// 신규 거래처 등록 모달
const openNewSupplierModal = () => {
  newSupplier.value.name = keyword.value  // 검색한 키워드를 기본값으로
  showNewSupplierModal.value = true
  showDropdown.value = false
}

const closeNewSupplierModal = () => {
  showNewSupplierModal.value = false
  newSupplier.value = {
    name: '',
    business_number: '',
    representative: '',
    contact: '',
    address: ''
  }
}

const createNewSupplier = async () => {
  if (!newSupplier.value.name || !newSupplier.value.business_number) {
    alert('거래처명과 사업자번호는 필수입니다.')
    return
  }

  try {
    const res = await api.post('/purchase/suppliers/', newSupplier.value)

    // 등록 성공 시 자동 선택
    const createdSupplier: Supplier = res.data
    selectSupplier(createdSupplier)
    closeNewSupplierModal()

    alert('거래처가 성공적으로 등록되었습니다!')
  } catch (err) {
    console.error('거래처 등록 실패:', err)
    alert('거래처 등록에 실패했습니다.')
  }
}

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>
