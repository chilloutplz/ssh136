<!-- /src/views/Purchases/Purchase.vue -->
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ComponentCard title="Search Conditions"></ComponentCard>
    </div>

    <div class="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ComponentCard title="Purchase List">
        <template #header-button>
          <Button :startIcon="PlusIcon" variant="primary" size="xm" @click="$router.push('/purchases/new')">추가
          </Button>
        </template>
        <!-- 거래명세서 목록 -->
        <BasicAccordion v-for="(group, date) in groupedPurchases" :key="date"
          :title="`${date} (건수: ${group.length}, 수량: ${totalQty(group)}개, 금액: ₩${totalAmount(group).toLocaleString()})`">
          <div class="space-y-4">
            <div v-for="purchase in group" :key="purchase.id"
              class="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm dark:bg-white/[0.03]">
              <div class="flex justify-between items-center">
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white">{{ purchase.vendor }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ purchase.items[0] }} 외 {{ purchase.items.length - 1 }}건
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600 dark:text-gray-400">수량: {{ purchase.qty }}개</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">금액: ₩{{ purchase.amount.toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </div>
        </BasicAccordion>
      </ComponentCard>
    </div>

  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import ComponentCard from '@/components/common/ComponentCard.vue'
import BasicAccordion from "@/components/ui/Accordion.vue";
import Button from '@/components/ui/Button.vue';
import { PlusIcon } from "@/icons";

const currentPageTitle = ref("Purchase");

const purchases = ref([
  {
    id: 1,
    date: "2025-10-18",
    vendor: "청과물유통",
    items: ["감자", "양파", "당근"],
    qty: 40,
    amount: 400000,
  },
  {
    id: 2,
    date: "2025-10-18",
    vendor: "해산물상회",
    items: ["오징어", "새우"],
    qty: 30,
    amount: 300000,
  },
  {
    id: 3,
    date: "2025-10-17",
    vendor: "정육점",
    items: ["소고기", "돼지고기", "닭고기"],
    qty: 50,
    amount: 500000,
  },
]);

const groupedPurchases = computed(() => {
  const groups: Record<string, typeof purchases.value> = {};
  purchases.value.forEach((p) => {
    if (!groups[p.date]) groups[p.date] = [];
    groups[p.date].push(p);
  });
  return groups;
});

const totalQty = (group: typeof purchases.value) =>
  group.reduce((sum, p) => sum + p.qty, 0);

const totalAmount = (group: typeof purchases.value) =>
  group.reduce((sum, p) => sum + p.amount, 0);
</script>
