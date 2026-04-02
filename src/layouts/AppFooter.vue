<template>
  <footer>
    <p>{{ appConfig.company }} © {{ appConfig.copyrightYear }}</p>
  </footer>
</template>

<script setup lang="ts">
import { appConfig } from '@/config/app'
</script>
