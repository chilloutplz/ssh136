<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mt-20 mb-8">
      <!-- 헤더 -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">
          {{ company ? 'Edit Company' : 'Add Company' }}
        </h2>
      </div>

      <!-- 내용 -->
      <div class="p-6">
        <!-- 회사명 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">회사명 *</label>
          <input
            v-model="localForm.name"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="회사명을 입력하세요"
            required
          />
        </div>

        <!-- 대표자 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">대표자</label>
          <input
            v-model="localForm.representative"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="대표자 이름 입력"
          />
        </div>

        <!-- 사업자 등록번호 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">사업자 등록번호</label>
          <input
            v-model="localForm.business_number"
            type="text"
            maxlength="10"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="10자리 숫자 입력"
          />
          <p
            v-if="localForm.business_number && localForm.business_number.length !== 10"
            class="text-xs text-red-500 mt-1"
          >
            사업자 등록번호는 10자리 숫자여야 합니다.
          </p>
        </div>

        <!-- 주소, 전화번호, 팩스, 이메일 등 나머지 필드 동일하게 추가 -->

        <!-- 버튼 -->
        <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="handleSave"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            @click="$emit('close')"
            class="text-white border border-gray-300 dark:border-gray-600 px-4 py-2 rounded
                   hover:bg-gray-700 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface Company {
  id?: number
  name: string
  representative?: string
  business_number?: string
  baseAddress?: string
  detailAddress?: string
  postcode?: string
  phone?: string
  fax?: string
  email?: string
}

const props = defineProps<{
  show: boolean
  company?: Company | null
}>()

const emit = defineEmits<{
  (e: 'save', company: Company): void
  (e: 'close'): void
}>()

// 로컬 상태 복사
const localForm = reactive<Company>({
  name: '',
  representative: '',
  business_number: '',
  baseAddress: '',
  detailAddress: '',
  postcode: '',
  phone: '',
  fax: '',
  email: '',
})

// props.company 변경 시 로컬 상태 업데이트
watch(
  () => props.company,
  (newVal) => {
    if (newVal) {
      Object.assign(localForm, newVal)
    } else {
      Object.assign(localForm, {
        name: '',
        representative: '',
        business_number: '',
        baseAddress: '',
        detailAddress: '',
        postcode: '',
        phone: '',
        fax: '',
        email: '',
      })
    }
  },
  { immediate: true }
)

function handleSave() {
  emit('save', { ...localForm })
}
</script>
