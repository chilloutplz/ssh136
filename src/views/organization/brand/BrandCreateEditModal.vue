<template>
  <Modal @close="$emit('close')">
    <template #header>
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ mode === "create" ? "Add Brand" : "Edit Brand" }}
      </h2>
    </template>

    <template #body>
      <!-- 회사 선택 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          소속 회사 *
        </label>
        <select v-model="companyId" class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
          <option disabled value="">회사를 선택하세요</option>
          <option v-for="company in companies" :key="company.id" :value="company.id">
            {{ company.name }}
          </option>
        </select>
      </div>

      <!-- 브랜드명 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          브랜드명 *
        </label>
        <input ref="brandNameInputRef" v-model="name" type="text" class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" placeholder="브랜드명을 입력하세요" required />
      </div>

      <!-- 설명 -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          설명
        </label>
        <textarea v-model="description" rows="3" class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                 bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 whitespace-pre-line"
          placeholder="브랜드 설명을 입력하세요"></textarea>
      </div>
    </template>

    <template #footer>
      <button @click="save" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        {{ mode === "create" ? "Save" : "Update" }}
      </button>
      <button @click="$emit('close')" class="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        Cancel
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue"
import Modal from "@/components/ui/ModalLayout.vue"
import api from "@/libs/axios"
import { createBrand, updateBrand } from "@/services/organization/brandService"
import type { Brand } from "@/types/organization"

interface Props {
  mode: "create" | "edit"
  brand?: Brand
}

const props = defineProps<Props>()
const emit = defineEmits(["close", "saved"])

const companies = ref<{ id: number; name: string }[]>([])
const companyId = ref<number | "">("")
const name = ref("")
const description = ref("")

const brandNameInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  const res = await api.get("/api/organization/companies/")
  companies.value = res.data

  if (props.mode === "edit" && props.brand) {
    // Edit 모드일 때 기존 데이터 로드
    companyId.value = props.brand.company_id
    name.value = props.brand.name
    description.value = props.brand.description || ""  // undefined면 빈 문자열
  } else if (companies.value.length > 0) {
    // Create 모드일 때 첫 번째 회사 선택
    companyId.value = companies.value[0].id
  }

  await nextTick()
  brandNameInputRef.value?.focus()
})

watch(companyId, async () => {
  await nextTick()
  brandNameInputRef.value?.focus()
})

async function save() {
  if (!companyId.value) {
    alert("회사를 선택하세요.")
    return
  }

  const payload: { name: string; description?: string; company: number } = {
    name: name.value,
    description: description.value || "",
    company: companyId.value,
  }


  if (props.mode === "edit" && props.brand) {
    await updateBrand(props.brand.id, payload)
  } else {
    await createBrand(payload)
  }
  emit("saved")
  emit("close")
}
</script>
