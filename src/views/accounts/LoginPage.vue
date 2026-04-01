<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg">
      <!-- 제목 -->
      <h2 class="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">로그인</h2>
      <p class="mb-6 text-center text-gray-500 dark:text-gray-400">계정에 로그인하세요</p>

      <!-- 폼 -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- 이메일 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="이메일 입력"
            required
            autofocus
          />
        </div>

        <!-- 비밀번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        <!-- 로그인 버튼 -->
        <button
          type="submit"
          class="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          로그인
        </button>

        <!-- 에러 메시지 -->
        <p v-if="errorMessage" class="mt-2 text-sm font-medium text-red-500">{{ errorMessage }}</p>
      </form>

      <!-- 회원가입 링크 -->
      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        아직 계정이 없으신가요?
        <router-link to="/accounts/register" class="text-indigo-600 hover:underline">회원가입</router-link>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

const auth = useAuthStore();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error) || "알 수 없는 오류가 발생했습니다.";
  } catch {
    return "알 수 없는 오류가 발생했습니다.";
  }
}

async function handleLogin(): Promise<void> {
  errorMessage.value = "";
  try {
    await auth.login(email.value, password.value);
    // auth.login()에서 이미 적절한 페이지로 리다이렉트하므로
    // 여기서는 아무것도 하지 않음
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error);
  }
}
</script>
