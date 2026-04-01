<!-- src/views/inventory/InventoryDetail.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-4">Inventory Detail</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        재고 상세 화면은 현재 준비중입니다. 추후 특정 상품의 입출고 내역과 재고 변동이 표시될 예정입니다.
      </p>

      <!-- 더미 상세 카드 -->
      <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>상품:</strong> Demo Product
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>창고:</strong> Main Warehouse
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>현재 수량:</strong> 100 (예시)
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>최근 입출고:</strong> 2026-01-10 입고 50
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = 'Inventory Detail'
</script>
