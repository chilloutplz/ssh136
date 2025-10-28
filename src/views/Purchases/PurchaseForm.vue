<!-- /src/views/Purchases/PurchaseForm.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <form @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-6 sm:col-span-2 lg:col-span-2">

          <!-- 거래처 선택 -->
          <ComponentCard title="거래처">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AutoCompleteSupplier v-model="selectedSupplier" />

              <FormInput label="사업자번호" v-model="form.bussinessNumber" placeholder="사업자번호" readonly />
            </div>
          </ComponentCard>

          <!-- 수량/금액 -->
          <ComponentCard title="수량 및 금액">
            <div class="grid grid-cols-2 gap-4">
              <FormInput label="수량" v-model.number="form.qty" type="number" placeholder="0" />
              <FormInput label="금액 (단가)" v-model.number="form.amount" type="number" placeholder="0" />
            </div>
          </ComponentCard>

          <!-- 추가 정보 -->
          <ComponentCard title="추가 정보">
            <TextArea label="비고 (메모)" v-model="form.memo" placeholder="특이사항을 입력하세요" />
            <div class="pt-4">
              <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                첨부 파일
              </label>
              <input type="file" @change="handleFileChange" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent
                       px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs
                       file:mr-5 file:border-0 file:bg-gray-50 file:py-2 file:text-gray-700 hover:file:bg-gray-100" />
            </div>
          </ComponentCard>
        </div>

        <!-- 작업 버튼 -->
        <div class="space-y-6 lg:col-span-1">
          <ComponentCard title="작업">
            <div class="flex flex-col gap-4 pt-4">
              <Button type="submit" variant="primary">거래명세서 등록</Button>
              <Button type="button" variant="outline" @click="resetForm">초기화</Button>
            </div>
          </ComponentCard>
        </div>
      </div>
    </form>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Button from '@/components/ui/Button.vue'
import FormInput from '@/components/forms/FormInput.vue'
import TextArea from '@/components/forms/TextArea.vue'
import AutoCompleteSupplier from '@/components/forms/AutoCompleteSupplier.vue'

const currentPageTitle = ref('거래명세서 등록')

interface Supplier {
  id: number
  name: string
  business_number: string
}

const form = ref({
  supplier: '',
  bussinessNumber: '',
  qty: 0,
  amount: 0,
  memo: '',
  attachment: null as File | null,
})

const selectedSupplier = ref<Supplier | null>(null)

watch(selectedSupplier, (supplier) => {
  form.value.supplier = supplier?.name || ''
  form.value.bussinessNumber = supplier?.business_number || ''
})


const supplierInput = ref<HTMLElement | null>(null)

onMounted(() => {
  supplierInput.value?.focus()
})


const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  form.value.attachment = target?.files?.[0] || null
}

const resetForm = () => {
  form.value = {
    supplier: '',
    bussinessNumber: '',
    qty: 0,
    amount: 0,
    memo: '',
    attachment: null,
  }
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
  if (fileInput) fileInput.value = ''
}

const handleSubmit = async () => {
  if (!form.value.supplier || form.value.qty <= 0 || form.value.amount <= 0) {
    alert('필수 정보를 입력해주세요.')
    return
  }
  console.log('등록 데이터:', form.value)
  alert('거래명세서가 성공적으로 등록되었습니다!')
}
</script>
