<template>
  <ModalLayout @close="$emit('close')">
    <!-- 헤더 -->
    <template #header>
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ mode === "create" ? "Add Branch" : "Edit Branch" }}
      </h2>
    </template>

    <!-- 본문 - max-h와 overflow-y-auto 추가 -->
    <template #body>
      <div class="space-y-6 px-1">
        <!-- 브랜드 선택 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            소속 브랜드 *
          </label>
          <select
            v-model="brandId"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">브랜드를 선택하세요</option>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>

        <!-- 지점명 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            지점명 *
          </label>
          <input
            ref="nameInputRef"
            v-model="name"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="지점명을 입력하세요"
            required
          />
        </div>

        <!-- 대표자 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            대표자 *
          </label>
          <input
            v-model="representative"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="대표자 이름을 입력하세요"
          />
        </div>

        <!-- 우편번호 + 검색 버튼 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            우편번호 *
          </label>
          <div class="flex mt-1 space-x-2">
            <input
              v-model="postcode"
              type="text"
              readonly
              class="flex-1 rounded-lg border border-gray-300 dark:border-gray-600
                     bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="주소 검색 시 자동 입력됩니다"
            />
            <button
              type="button"
              @click="openAddressSearch"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                     transition-colors whitespace-nowrap"
            >
              검색
            </button>
          </div>
        </div>

        <!-- 기본 주소 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            주소 *
          </label>
          <input
            v-model="baseAddress"
            type="text"
            readonly
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="주소 검색 버튼을 눌러주세요"
          />
        </div>

        <!-- 상세 주소 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            상세주소
          </label>
          <input
            ref="detailAddressInputRef"
            v-model="detailAddress"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="상세 주소를 입력하세요"
          />
        </div>

        <!-- 전화번호 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            전화번호
          </label>
          <input
            v-model="phone"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="예: 02-1234-5678"
          />
        </div>

        <!-- 이메일 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            이메일
          </label>
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="예: branch@example.com"
          />
        </div>

        <!-- 설명 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            설명
          </label>
          <textarea
            v-model="description"
            rows="3"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                   bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-500 whitespace-pre-line"
            placeholder="지점 설명을 입력하세요"
          ></textarea>
        </div>
      </div>
    </template>

    <!-- 푸터 -->
    <template #footer>
      <button
        @click="save"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {{ mode === "create" ? "Save" : "Update" }}
      </button>
      <button
        @click="$emit('close')"
        class="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Cancel
      </button>
    </template>
  </ModalLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue"
import ModalLayout from "@/components/ui/ModalLayout.vue"
import api from "@/libs/axios"
import { createBranch, updateBranch } from "@/services/organization/branchService"
import type { Branch } from "@/types/organization"

interface Props {
  mode: "create" | "edit"
  branch?: Branch
}

const props = defineProps<Props>()
const emit = defineEmits(["close", "saved"])

const brands = ref<{ id: number; name: string }[]>([])
const brandId = ref<number | "">("")
const name = ref("")
const representative = ref("")
const postcode = ref("")
const baseAddress = ref("")
const detailAddress = ref("")
const phone = ref("")
const email = ref("")
const description = ref("")

const nameInputRef = ref<HTMLInputElement | null>(null)
const detailAddressInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  const res = await api.get("/api/organization/brands/")
  brands.value = res.data

  if (props.mode === "edit" && props.branch) {
    brandId.value = props.branch.brand_id
    name.value = props.branch.name
    representative.value = props.branch.representative
    postcode.value = props.branch.postcode
    baseAddress.value = props.branch.base_address
    detailAddress.value = props.branch.detail_address || ""
    phone.value = props.branch.phone || ""
    email.value = props.branch.email || ""
    description.value = props.branch.description || ""
  } else if (brands.value.length > 0) {
    brandId.value = brands.value[0].id
  }

  await nextTick()
  nameInputRef.value?.focus()
})

watch(brandId, async () => {
  await nextTick()
  nameInputRef.value?.focus()
})

function openAddressSearch() {
  if (!window.daum) {
    alert("주소 검색 서비스를 불러올 수 없습니다.")
    return
  }

  new window.daum.Postcode({
    oncomplete: (data: DaumPostcodeData) => {
      postcode.value = data.zonecode
      baseAddress.value = data.address
      detailAddress.value = ""

      // 상세주소 입력칸으로 포커스 이동
      nextTick(() => {
        detailAddressInputRef.value?.focus()
      })
    }
  }).open()
}

async function save() {
  if (!brandId.value) {
    alert("브랜드를 선택하세요.")
    return
  }

  if (!name.value.trim()) {
    alert("지점명을 입력하세요.")
    return
  }

  if (!representative.value.trim()) {
    alert("대표자를 입력하세요.")
    return
  }

  if (!postcode.value || !baseAddress.value) {
    alert("주소를 검색하여 입력하세요.")
    return
  }

  const payload = {
    brand: brandId.value as number,
    name: name.value,
    representative: representative.value,
    postcode: postcode.value,
    base_address: baseAddress.value,
    detail_address: detailAddress.value || "",
    phone: phone.value || "",
    email: email.value || "",
    description: description.value || "",
  }

  if (props.mode === "edit" && props.branch) {
    await updateBranch(props.branch.id, payload)
  } else {
    await createBranch(payload)
  }

  emit("saved")
  emit("close")
}
</script>
