<!-- /src/components/forms/TailwindSelect.vue -->
<!-- src/components/forms/TailwindSelect.vue -->
<template>
  <div>
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <Vue3Select
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :options="options"
      :label-by="labelBy"
      :value-by="valueBy"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: [String, Number, Object, Array],
  options: {
    type: Array,
    default: () => [],
  },
  labelBy: {
    type: String,
    default: 'label',
  },
  valueBy: {
    type: String,
    default: 'value',
  },
  label: String,
  placeholder: String,
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
/* 👇 vue3-select 기본 테마 제거 후 Tailwind 느낌으로 리디자인 */
.custom-vue3-select .v3-select {
  @apply h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-800
    focus:border-brand-400 focus:ring-2 focus:ring-brand-500/10
    dark:border-gray-700 dark:bg-gray-900 dark:text-white/90;
}

.custom-vue3-select .v3-dropdown {
  @apply border border-gray-200 dark:border-gray-700 rounded-lg mt-1 shadow-lg bg-white dark:bg-gray-900;
}

.custom-vue3-select .v3-option {
  @apply px-3 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800;
}

.custom-vue3-select .v3-option--selected {
  @apply bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300;
}

.custom-vue3-select .v3-no-options {
  @apply px-3 py-2 text-sm text-gray-400 dark:text-gray-500;
}
</style>
