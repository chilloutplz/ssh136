<script setup lang="ts">
import { ref } from 'vue';
import { computed, defineComponent } from 'vue';
import type { Component } from 'vue'; // 💡 타입 전용 import

import AdminLayout from '@/layouts/AdminLayout.vue'
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import * as AllIcons from '@/icons/index';

// 1️⃣ IconComponentMap과 타입 정의
type IconComponentMap = Record<string, Component>;

// 2️⃣ AllIcons를 안전하게 타입 단언
const typedAllIcons = AllIcons as IconComponentMap;

// 3️⃣ 아이콘 이름 타입
type IconName = keyof typeof typedAllIcons;

// 4️⃣ computed로 아이콘 이름 배열 생성
const iconNames = computed<IconName[]>(() => Object.keys(typedAllIcons) as IconName[]);

// 5️⃣ 아이콘 가져오기 함수 (없는 경우 fallback)
function getIconComponent(name: IconName): Component {
  const comp = typedAllIcons[name];
  if (!comp) {
    console.warn(`아이콘 '${name}'이(가) 없습니다.`);
    return defineComponent({ template: '<span class="text-red-500">❌</span>' });
  }
  return comp;
}

const currentPageTitle = ref("Icon Gallery");
</script>


<template>
  <admin-layout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="p-6 md:p-8">
      <!-- <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        아이콘 갤러리 ({{ iconNames.length }}개)
      </h1> -->

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <div v-for="name in iconNames" :key="name"
          class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white dark:bg-gray-800">

          <div class="text-blue-600 dark:text-blue-400 w-10 h-10 mb-3">
            <component :is="getIconComponent(name)" class="w-full h-full" />
          </div>

          <span class="text-center text-sm font-medium text-gray-700 dark:text-gray-300 wrap-break-word max-w-full px-1">
            {{ name }}
          </span>

          <span class="text-xs text-gray-400 dark:text-gray-500 mt-1">
            &lt;{{ name }} /&gt;
          </span>
        </div>
      </div>
    </div>
  </admin-layout>
</template>
