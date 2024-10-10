<script setup lang="ts">

defineProps({
  title: String,
  subtitle: String,
})

</script>
<template>
  <div class="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
  <!-- Header with image -->
    <div class="h-48 w-full overflow-hidden">
      <img class="object-cover w-full h-full" alt="user header" src="" />
    </div>

    <!-- Title -->
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900"> {{ title }} </h3>
      <h4 class="text-sm text-gray-500"> {{ subtitle }} </h4>

      <!-- Content -->
      <p class="text-gray-700 mt-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
      </p>

      <!-- Footer with buttons -->
      <div class="flex gap-4 mt-4">
        <button class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300">Cancel</button>
        <button class="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Save</button>
      </div>
    </div>
  </div>
</template>