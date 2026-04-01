<!-- src/views/accounting/AccountingList.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-4">Accounting List</h1>
      <p class="text-gray-600 dark:text-gray-400">
        회계 모듈은 현재 개발 준비중입니다. 추후 전표 관리 기능이 추가될 예정입니다.
      </p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = 'Accounting List'
</script>
