<!-- /src/components/common/BasicAccordion.vue -->
<template>
  <div
    :class="[
      'rounded-xl border transition-all duration-200 shadow-sm',
      isOpen
        ? 'bg-blue-50 border-blue-200 dark:bg-gray-700 dark:border-gray-600'
        : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'
    ]"
  >
    <!-- 헤더 -->
    <button
      @click="toggle"
      class="flex justify-between items-center w-full px-5 py-4 text-left text-sm font-medium text-gray-800 dark:text-gray-100"
    >
      <span>{{ title }}</span>

      <!-- 쉐브론 아이콘 -->
      <ChevronDownIcon
        :class="['w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200', { 'rotate-180': isOpen }]"
      />
    </button>

    <!-- 본문 -->
    <transition name="accordion">
      <div v-show="isOpen" class="px-5 pb-4 text-gray-600 dark:text-gray-200 text-sm leading-relaxed">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDownIcon } from '@/icons'

defineProps<{ title: string }>();

const isOpen = ref(false);
const toggle = () => (isOpen.value = !isOpen.value);
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
