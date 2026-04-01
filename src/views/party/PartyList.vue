<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <!-- 상단 버튼 -->
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Party
      </button>

      <!-- 로딩 중 -->
      <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="n in 3" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg"></div>
      </div>

      <!-- 데이터 없음 -->
      <div v-else-if="parties.length === 0" class="mt-6 text-center text-gray-500 dark:text-gray-400">
        등록된 거래처가 없습니다.
      </div>

      <!-- 데이터 있음 -->
      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard
          v-for="party in parties"
          :key="party.id"
          :title="party.name"
          :desc="party.representative ? `대표자: ${party.representative}` : '대표자 정보 없음'"
        >
          <p class="text-sm text-gray-600 dark:text-gray-400">
            사업자번호: {{ party.business_number || '미등록' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ party.postcode ? `(${party.postcode})` : '' }} {{ party.base_address || '' }} {{ party.detail_address || '' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Tel. {{ party.phone || '-' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Fax. {{ party.fax || '-' }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            e-mail {{ party.email || '-' }}
          </p>

          <template #footer>
            <div class="flex justify-end space-x-3">
              <button
                @click="editParty(party)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(party.id)"
                class="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>

      <!-- 모달 -->
      <PartyCreateEditModal
        v-if="showCreate"
        mode="create"
        @saved="() => { loadParties(); showCreate = false }"
        @close="showCreate = false"
      />
      <PartyCreateEditModal
        v-if="showEdit && selectedParty"
        mode="edit"
        :party="selectedParty"
        @saved="() => { loadParties(); showEdit = false }"
        @close="showEdit = false"
      />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { Party } from "@/types/parties"
import { fetchParties, deleteParty } from "@/services/party/partyService"
import PartyCreateEditModal from "./PartyCreateEditModal.vue"

const loading = ref(false)
const parties = ref<Party[]>([])
const showCreate = ref(false)
const showEdit = ref(false)
const selectedParty = ref<Party>()

const currentPageTitle = "Party List"

async function loadParties() {
  loading.value = true
  try {
    parties.value = await fetchParties()
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  showCreate.value = true
}

function editParty(party: Party) {
  selectedParty.value = party
  showEdit.value = true
}

async function confirmDelete(id: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deleteParty(id)
    await loadParties()
  }
}

onMounted(loadParties)
</script>
