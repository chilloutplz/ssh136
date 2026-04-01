<!-- src/views/sales/SaleDetail.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6 md:p-8">
      <h1 class="text-2xl font-bold mb-4">Sale Detail</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">
        매출 상세 화면은 현재 준비중입니다. 추후 거래처, 상품, 수량, 금액, 결제 내역 등이 표시될 예정입니다.
      </p>

      <!-- 더미 상세 카드 -->
      <div class="border rounded-lg p-4 bg-white dark:bg-gray-800">
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>매출번호:</strong> #1001
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>거래처:</strong> Demo Party
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>상품:</strong> Demo Product
        </p>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <strong>금액:</strong> 500,000 원
        </p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

const currentPageTitle = 'Sale Detail'
</script>
