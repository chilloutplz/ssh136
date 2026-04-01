<template>
  <ModalLayout @close="$emit('close')">
    <!-- 헤더 -->
    <template #header>
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ mode === "create" ? "Add Company" : "Edit Company" }}
      </h2>
    </template>

    <!-- 본문 -->
    <template #body>
      <div class="space-y-6 px-1">
        <!-- 회사명 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">회사명 *</label>
          <input ref="nameInputRef" v-model="name" type="text" class="input-style" placeholder="회사명을 입력하세요" required />
        </div>

        <!-- 대표자 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">대표자 *</label>
          <input v-model="representative" type="text" class="input-style" placeholder="대표자 이름 입력" />
        </div>

        <!-- 사업자 등록번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">사업자 등록번호</label>
          <input v-model="businessNumber" type="text" maxlength="10" class="input-style" placeholder="10자리 숫자 입력" />
          <p v-if="businessNumber && businessNumber.length !== 10" class="text-xs text-red-500 mt-1">
            사업자 등록번호는 10자리 숫자여야 합니다.
          </p>
        </div>

        <!-- 우편번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">우편번호 *</label>
          <div class="flex space-x-2">
            <input v-model="postcode" type="text" readonly class="flex-1 input-style" placeholder="주소 검색 시 자동 입력됩니다" />
            <button type="button" @click="openAddressSearch" class="btn-primary">
              검색
            </button>
          </div>
        </div>

        <!-- 주소 검색 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">주소 *</label>
          <input v-model="baseAddress" type="text" readonly class="flex-1 input-style"
              placeholder="주소 검색 버튼을 눌러주세요" />
        </div>

        <!-- 상세 주소 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">상세 주소</label>
          <input ref="detailAddressRef" v-model="detailAddress" type="text" class="input-style"
            placeholder="상세 주소 입력" />
        </div>

        <!-- 전화번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">전화번호</label>
          <input v-model="phone" type="text" class="input-style" placeholder="예: 02-1234-5678" />
        </div>

        <!-- 팩스번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">팩스번호</label>
          <input v-model="fax" type="text" class="input-style" placeholder="예: 02-9876-5432" />
        </div>

        <!-- 이메일 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
          <input v-model="email" type="email" class="input-style" placeholder="예: company@example.com" />
        </div>
      </div>
    </template>

    <!-- 푸터 -->
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
import { createCompany, updateCompany } from "@/services/organization/companyService"
import type { Company } from "@/types/organization"

interface Props {
  mode: "create" | "edit"
  company?: Company
}

const props = defineProps<Props>()
const emit = defineEmits(["close", "saved"])

const name = ref("")
const representative = ref("")
const businessNumber = ref("")
const postcode = ref("")
const baseAddress = ref("")
const detailAddress = ref("")
const phone = ref("")
const fax = ref("")
const email = ref("")

const nameInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  if (props.mode === "edit" && props.company) {
    name.value = props.company.name
    representative.value = props.company.representative
    businessNumber.value = props.company.business_number || ""
    postcode.value = props.company.postcode
    baseAddress.value = props.company.base_address
    detailAddress.value = props.company.detail_address || ""
    phone.value = props.company.phone || ""
    fax.value = props.company.fax || ""
    email.value = props.company.email || ""
  }
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
      nextTick(() => {
        const detailInput = document.querySelector('input[placeholder="상세 주소 입력"]') as HTMLInputElement
        detailInput?.focus()
      })
    }
  }).open()
}

async function save() {
  if (!name.value.trim()) {
    alert("회사명을 입력하세요.")
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
    name: name.value,
    representative: representative.value,
    business_number: businessNumber.value || "",
    postcode: postcode.value,
    base_address: baseAddress.value,
    detail_address: detailAddress.value || "",
    phone: phone.value || "",
    fax: fax.value || "",
    email: email.value || "",
  }

  if (props.mode === "edit" && props.company) {
    await updateCompany(props.company.id, payload)
  } else {
    await createCompany(payload)
  }

  emit("saved")
  emit("close")
}
</script>
