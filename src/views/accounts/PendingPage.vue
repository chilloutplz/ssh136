<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">승인 대기 중</h1>
      <p class="text-gray-600 mb-6">
        관리자 승인 후 서비스를 이용하실 수 있습니다.<br />
        승인 완료 시 이메일로 안내드리겠습니다.
      </p>
      <router-link
        to="/login"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        로그인 화면으로 돌아가기
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// 특별한 로직은 필요 없음, 안내만 보여줌
</script>
