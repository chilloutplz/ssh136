<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <!-- 상단 버튼 -->
      <button @click="openCreateModal"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Add Branch
      </button>

      <!-- 로딩 중일 때 Skeleton UI -->
      <div v-if="loading" class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <!-- Skeleton UI -->
        <div v-for="n in 3" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 h-40 rounded-lg"></div>
      </div>

      <!-- 데이터 없을 때 메시지 -->
      <div v-else-if="branches.length === 0" class="mt-6 text-center text-gray-500 dark:text-gray-400">
        등록된 Branch가 없습니다.
      </div>

      <!-- 데이터 있을 때 카드 -->
      <div v-else class="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <ComponentCard v-for="branch in branches" :key="branch.id" :title="branch.name" :desc="`${branch.brand_name} - ${branch.company_name}`"
>
          <!-- 카드 본문 -->
          <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <!-- 대표자 -->
            <div class="flex items-center gap-2">
              <span class="text-gray-500">👤</span>
              <span class="font-medium">대표자:</span>
              <span>{{ branch.representative }}</span>
            </div>

            <!-- 주소 -->
            <div class="flex items-start gap-2">
              <span class="text-gray-500">📍</span>
              <div>
                <span class="font-medium">주소:</span>
                <p class="whitespace-pre-line">
                  {{ branch.postcode }} {{ branch.base_address }} {{ branch.detail_address }}
                </p>
              </div>
            </div>

            <!-- 전화번호 -->
            <div v-if="branch.phone" class="flex items-center gap-2">
              <span class="text-gray-500">📞</span>
              <span class="font-medium">전화:</span>
              <span>{{ branch.phone }}</span>
            </div>

            <!-- 이메일 -->
            <div v-if="branch.email" class="flex items-center gap-2">
              <span class="text-gray-500">✉️</span>
              <span class="font-medium">이메일:</span>
              <span>{{ branch.email }}</span>
            </div>

            <!-- 설명 -->
            <div v-if="branch.description" class="flex items-start gap-2">
              <span class="text-gray-500">📝</span>
              <div>
                <span class="font-medium">설명:</span>
                <p class="whitespace-pre-line">{{ branch.description }}</p>
              </div>
            </div>
          </div>

          <!-- 카드 Footer -->
          <template #footer>
            <div class="flex justify-end space-x-3">
              <button @click="editBranch(branch)"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                Edit
              </button>
              <button @click="confirmDelete(branch.id)"
                class="px-4 py-2 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                Delete
              </button>
            </div>
          </template>
        </ComponentCard>
      </div>

      <!-- 모달 -->
      <BranchCreateEditModal v-if="showCreate" mode="create" @close="showCreate = false" @saved="loadBranches" />
      <BranchCreateEditModal v-if="showEdit && selectedBranch" mode="edit" :branch="selectedBranch"
        @close="showEdit = false" @saved="loadBranches" />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import AdminLayout from "@/layouts/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import { Branch } from "@/types/organization"
import { fetchBranches, deleteBranch } from "@/services/organization/branchService"
import BranchCreateEditModal from "./BranchCreateEditModal.vue"

const loading = ref(false)
const branches = ref<Branch[]>([])
const showCreate = ref(false)
const showEdit = ref(false)
const selectedBranch = ref<Branch>()

const currentPageTitle = "Branch List"

async function loadBranches() {
  loading.value = true
  try {
    branches.value = await fetchBranches()
  } finally {
    loading.value = false
  }
}

function openCreateModal() {
  showCreate.value = true
}

function editBranch(branch: Branch) {
  selectedBranch.value = branch
  showEdit.value = true
}

async function confirmDelete(id: number) {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    await deleteBranch(id)
    await loadBranches()
  }
}

onMounted(loadBranches)
</script>
