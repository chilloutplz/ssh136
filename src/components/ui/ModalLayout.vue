<template>
  <!-- 오버레이 -->
  <div
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
    @click.self="$emit('close')"
  ></div>

  <!-- 모달 컨테이너 (전체 스크롤 담당) -->
  <div
    class="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
  >
    <div
      class="relative w-full max-w-lg mt-20 mb-8 rounded-2xl bg-gray-800 dark:bg-gray-900
             border border-gray-700/70 shadow-2xl p-6 text-white"
    >
      <!-- 헤더 -->
      <div v-if="$slots.header" class="mb-4 border-b border-gray-700/60 pb-3">
        <slot name="header"></slot>
      </div>

      <!-- 바디 -->
      <div class="space-y-4">
        <slot name="body"></slot>
      </div>

      <!-- 푸터 -->
      <div
        v-if="$slots.footer"
        class="mt-6 flex justify-end gap-3 border-t border-gray-700/60 pt-3"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["close"])
</script>
