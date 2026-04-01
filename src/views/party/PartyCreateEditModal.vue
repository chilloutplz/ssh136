<template>
  <ModalLayout @close="$emit('close')">
    <template #header>
      <h2 class="text-xl font-bold text-gray-800 dark:text-white">
        {{ mode === "create" ? "Add Party" : "Edit Party" }}
      </h2>
    </template>

    <template #body>
      <div class="space-y-6 px-1">
        <!-- 거래처명 -->
        <div>
          <label class="block text-sm font-medium">거래처명 *</label>
          <input ref="nameInputRef" v-model="name" type="text" class="input-style" required />
        </div>

        <!-- 대표자 -->
        <div>
          <label class="block text-sm font-medium">대표자</label>
          <input v-model="representative" type="text" class="input-style" />
        </div>

        <!-- 사업자 등록번호 -->
        <div>
          <label class="block text-sm font-medium">사업자 등록번호</label>
          <input v-model="businessNumber" type="text" maxlength="10" class="input-style" />
          <p v-if="businessNumber && businessNumber.length !== 10" class="text-xs text-red-500 mt-1">
            사업자 등록번호는 10자리 숫자여야 합니다.
          </p>
        </div>

        <!-- 주소 (선택 입력) -->
        <div>
          <label class="block text-sm font-medium">우편번호</label>
          <div class="flex space-x-2">
            <input v-model="postcode" type="text" readonly class="flex-1 input-style" />
            <button type="button" @click="openAddressSearch" class="btn-primary">검색</button>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium">주소</label>
          <input v-model="baseAddress" type="text" readonly class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">상세 주소</label>
          <input v-model="detailAddress" type="text" class="input-style" />
        </div>

        <!-- 연락처 -->
        <div>
          <label class="block text-sm font-medium">전화번호</label>
          <input v-model="phone" type="text" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">팩스번호</label>
          <input v-model="fax" type="text" class="input-style" />
        </div>
        <div>
          <label class="block text-sm font-medium">이메일</label>
          <input v-model="email" type="email" class="input-style" />
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
import { createParty, updateParty } from "@/services/party/partyService"
import type { Party } from "@/types/parties"

interface Props {
  mode: "create" | "edit"
  party?: Party
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
  if (props.mode === "edit" && props.party) {
    name.value = props.party.name
    representative.value = props.party.representative || ""
    businessNumber.value = props.party.business_number || ""
    postcode.value = props.party.postcode || ""
    baseAddress.value = props.party.base_address || ""
    detailAddress.value = props.party.detail_address || ""
    phone.value = props.party.phone || ""
    fax.value = props.party.fax || ""
    email.value = props.party.email || ""
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
    alert("거래처명을 입력하세요.")
    return
  }

  const payload = {
    name: name.value,
    representative: representative.value || "",
    business_number: businessNumber.value || "",
    postcode: postcode.value || "",
    base_address: baseAddress.value || "",
    detail_address: detailAddress.value || "",
    phone: phone.value || "",
    fax: fax.value || "",
    email: email.value || "",
  }

  if (props.mode === "edit" && props.party) {
    await updateParty(props.party.id, payload)
  } else {
    await createParty(payload)
  }

  emit("saved")   // 저장 완료 이벤트만 emit → 부모에서 모달 닫기 처리
}
</script>
