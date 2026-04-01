<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div
      class="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-lg">
      <!-- 제목 -->
      <h2 class="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">회원가입</h2>
      <p class="mb-6 text-center text-gray-500 dark:text-gray-400">새 계정을 만들어보세요</p>

      <!-- 폼 -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- 이름 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
          <input v-model="name" type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="이름 입력" required autofocus />
        </div>

        <!-- 이메일 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
          <input v-model="email" type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="이메일 입력" required />
        </div>

        <!-- 비밀번호 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">비밀번호</label>
          <input v-model="password" type="password"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호 입력" required />
        </div>

        <!-- 회사 선택 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">회사</label>
          <select v-model="companyId"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            required>
            <option disabled value="">회사를 선택하세요</option>
            <option v-for="c in companies" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>

        <!-- 브랜드 선택 -->
        <div v-if="companyId">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">브랜드</label>
          <select v-model="brandId"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            required>
            <option disabled value="">브랜드를 선택하세요</option>
            <option v-for="b in filteredBrands" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>

        <!-- 지점 선택 -->
        <div v-if="brandId">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">지점</label>
          <select v-model="branchId"
            class="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            required>
            <option disabled value="">지점을 선택하세요</option>
            <option v-for="br in filteredBranches" :key="br.id" :value="br.id">{{ br.name }}</option>
          </select>
        </div>

        <!-- 회원가입 버튼 -->
        <button type="submit"
          class="w-full rounded-lg bg-indigo-600 py-2 text-white font-medium hover:bg-indigo-700 transition-colors">
          회원가입
        </button>


        <!-- 에러 메시지 -->
        <p v-if="errorMessage" class="mt-2 text-sm font-medium text-red-500">{{ errorMessage }}</p>
      </form>

      <!-- 로그인 링크 -->
      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        이미 계정이 있으신가요?
        <router-link to="/accounts/login" class="text-indigo-600 hover:underline">로그인</router-link>
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

type Option = { id: string; name: string; companyId?: string; brandId?: string };

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const companyId = ref<string>("");
const brandId = ref<string>("");
const branchId = ref<string>("");
const errorMessage = ref<string>("");

const auth = useAuthStore();

// 예시 데이터 (실제로는 API로 대체)
const companies: Option[] = [
  { id: "c1", name: "회사 A" },
  { id: "c2", name: "회사 B" },
];
const brands: Option[] = [
  { id: "b1", name: "브랜드 X", companyId: "c1" },
  { id: "b2", name: "브랜드 Y", companyId: "c2" },
];
const branches: Option[] = [
  { id: "br1", name: "지점 1", brandId: "b1" },
  { id: "br2", name: "지점 2", brandId: "b2" },
];

const filteredBrands = computed<Option[]>(() =>
  brands.filter((b) => b.companyId === companyId.value)
);
const filteredBranches = computed<Option[]>(() =>
  branches.filter((br) => br.brandId === brandId.value)
);

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  try {
    const text = JSON.stringify(error);
    return text || "알 수 없는 오류가 발생했습니다.";
  } catch {
    return "알 수 없는 오류가 발생했습니다.";
  }
}

async function handleRegister(): Promise<void> {
  errorMessage.value = "";
  try {
    await auth.register(
      email.value,
      password.value,
      name.value,
      companyId.value,
      brandId.value,
      branchId.value
    );
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    window.location.href = "/accounts/login";
  } catch (error: unknown) {
    errorMessage.value = getErrorMessage(error);
  }
}
</script>
