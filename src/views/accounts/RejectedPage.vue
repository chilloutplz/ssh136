<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 class="mb-6 text-center text-2xl font-bold text-red-600">가입 거절</h2>
      <p class="text-center text-gray-700">
        관리자에 의해 가입이 거절되었습니다.<br />
        문의가 필요하다면 관리자에게 연락하세요.
      </p>
      <router-link to="/accounts/login" class="mt-6 block text-center text-blue-600 hover:underline">
        로그인 페이지로 돌아가기
      </router-link>
    </div>
  </div>
</template>
