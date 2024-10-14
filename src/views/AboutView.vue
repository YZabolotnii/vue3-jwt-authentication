<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Card.vue'
import axiosApiInstance from '@/core/ApiService'

interface Car {
  name: string;
  type: string;
}

const authStore = useAuthStore()
const cars = ref<Car[]>([])
const showLoader = ref(false)

const getAllCars = async () => {
  showLoader.value = true
  try {
    const response = await axiosApiInstance.get(`https://vue-jwt-ce647-default-rtdb.europe-west1.firebasedatabase.app/cars.json`)
    cars.value = Object.values(response.data)
    console.log(cars.value)
  } catch (error) {
    console.log(error.response)
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => {
  await getAllCars()
})
</script>
<template>
  <div class="max-w-lg mx-auto">
    <h2 class="font-bold text-2xl my-5 flex justify-between">
      <div>Title</div>
      <router-link @click="authStore.logout" to="/">Log Out</router-link>
    </h2>
    <Loader v-if="showLoader" />
    <div v-else class="flex flex-col gap-3">
      <Card
        v-for="car in cars"
        :key="car.id"
        :title="car.name"
        :subtitle="car.type">
      </Card>
    </div>
  </div>
</template>
