<!-- /src/components/forms/SelectInput.vue -->
<template>
  <div>
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <div class="relative z-20 bg-transparent">
      <select :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)"
        class="
    dark:bg-dark-900
    h-11 w-full appearance-none rounded-lg
    border border-gray-300 dark:border-gray-600
    bg-transparent bg-none
    px-4 py-2.5 pr-11 text-sm
    text-gray-800 dark:text-white/90
    shadow-theme-xs
    placeholder:text-gray-400
    focus:border-brand-400 dark:focus:border-brand-500
    focus:outline-hidden focus:ring-3 focus:ring-brand-500/10
  " :class="{ 'text-gray-800 dark:text-white/90': modelValue }">
        <option value="" disabled selected>{{ defaultOptionText }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value"
          class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
          {{ option.label }}
        </option>
      </select>
      <span class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
        <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="currentColor" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// options prop의 예: [{ value: 'marketing', label: 'Marketing' }, ...]
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array as () => { value: string; label: string }[],
    required: true,
  },
  defaultOptionText: {
    type: String,
    default: 'Select Option',
  },
});

defineEmits(['update:modelValue']);
</script>
