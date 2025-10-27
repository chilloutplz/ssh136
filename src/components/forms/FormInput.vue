<template>
  <div>
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      {{ label }}
    </label>
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'update:modelValue', value: string | number): void }>();

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text', // 'email', 'number' 등으로 변경 가능
  },
});

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement | null;
  emit('update:modelValue', (target?.value ?? '') as string);
};

const inputRef = ref<HTMLInputElement | null>(null)
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>
