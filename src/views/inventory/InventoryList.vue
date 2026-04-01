<!-- src/views/inventory/InventoryList.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-4">Inventory List</h1>
      <p class="text-gray-600 dark:text-gray-400">
        재고 모듈은 현재 개발 준비중입니다. 추후 재고 현황 및 입출고 내역이 표시됩니다.
      </p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = 'Inventory List'
</script>
