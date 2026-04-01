<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <!-- 아이콘 -->
      <div class="flex justify-center mb-4">
        <svg
          class="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      </div>

      <!-- 안내 메시지 -->
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">
        자동 로그아웃되었습니다
      </h2>
      <p class="text-center text-gray-600 mb-6">
        세션이 만료되어 로그아웃되었습니다. 다시 로그인해주세요.
      </p>

      <!-- 버튼 -->
      <router-link to="/accounts/login">
        <button
          class="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-dark transition"
        >
          로그인하기
        </button>
      </router-link>
    </div>
  </div>
</template>
