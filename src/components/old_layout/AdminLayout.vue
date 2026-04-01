<template>
  <div class="min-h-screen xl:flex">
    <AppSidebar />
    <AppBackdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <AppHeader />
      <div class="p-4 mx-auto max-w-screen-2xl md:p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import AppBackdrop from './AppBackdrop.vue'
import { useSidebar } from '@/composables/useSidebar'

const { isExpanded, isHovered } = useSidebar()
</script>
