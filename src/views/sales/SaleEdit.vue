<!-- src/views/sales/SaleEdit.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-4">Sale Edit</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        매출 수정 화면은 현재 준비중입니다. 추후 기존 매출 데이터를 불러와 수정할 수 있도록 구현될 예정입니다.
      </p>

      <!-- 더미 수정 폼 -->
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">날짜</label>
          <input type="date" class="mt-1 block w-full border rounded px-3 py-2" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">거래처</label>
          <input type="text" class="mt-1 block w-full border rounded px-3 py-2" placeholder="거래처 선택" disabled />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">금액</label>
          <input type="number" class="mt-1 block w-full border rounded px-3 py-2" placeholder="0" disabled />
        </div>

        <button type="button"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          disabled>
          수정 저장 (준비중)
        </button>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = 'Sale Edit'
</script>
