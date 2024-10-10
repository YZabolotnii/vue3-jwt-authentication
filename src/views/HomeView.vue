<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Card.vue'

const authStore = useAuthStore()
const cars = ref<any>([])
const showLoader = ref(false)

const getAllCars = () => {
  showLoader.value = true

  try {
    const response = axios.get(`https://vue-jwt-ce647-default-rtdb.europe-west1.firebasedatabase.app/cars.json?auth=${authStore.userInfo.token}`)
    cars.value = response.data
    console.log(cars.value)
  } catch (error) {
    console.log(error.response)
  } finally {
    showLoader.value = false
  }
}

// Викликаємо функцію при завантаженні компонента
onMounted(async () => {
  await getAllCars()
})
</script>
<template>
  <div>
    <h2>Cars</h2>
    <Loader v-if="showLoader" />
    <div v-else class="flex flex-col gap-3">
      <Card

        title="item.name"
        subtitle="item.type">
      </Card>
    </div>
  </div>
</template>
