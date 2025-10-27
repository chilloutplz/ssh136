<template>
  <div>
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)"
      class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
// TypeScript 환경에서 안전한 처리를 위해 HTMLTextAreaElement로 타입을 단언했습니다.

defineProps({
  /** 인풋 필드의 레이블 텍스트입니다. */
  label: {
    type: String,
    required: true,
  },
  /** v-model로 바인딩되는 현재 값입니다. */
  modelValue: {
    type: String,
    default: '',
  },
  /** 플레이스홀더 텍스트입니다. */
  placeholder: {
    type: String,
    default: '내용을 입력하세요...',
  },
  /** 텍스트 영역의 초기 줄 수입니다. */
  rows: {
    type: [String, Number],
    default: 4, // 기본적으로 4줄 높이를 가집니다.
  },
});

defineEmits(['update:modelValue']);
</script>
