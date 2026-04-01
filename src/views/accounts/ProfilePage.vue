<template>
  <div class="profile-page">
    <h2>내 정보</h2>
    <div v-if="auth.user">
      <p>이름: {{ auth.user.name }}</p>
      <p>이메일: {{ auth.user.email }}</p>
      <button @click="handleLogout">로그아웃</button>
    </div>
    <div v-else>
      <p>로그인 상태가 아닙니다.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  window.location.href = "/login";
};
</script>
