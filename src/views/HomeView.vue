<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const checkUser = () => {
  const accessToken = localStorage.getItem('access')
  const refreshToken = localStorage.getItem('refresh')
  if (accessToken || refreshToken) {
    authStore.userInfo.token = accessToken
    authStore.userInfo.refreshToken = refreshToken
  }
}

checkUser()
</script>
<template>
  <header>
    <div class="w-full text-center">
      Log Out
    </div>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>