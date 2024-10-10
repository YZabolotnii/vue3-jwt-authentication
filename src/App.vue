<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex grow mx-auto h-full p-10">
    <main class="grow content" id="content" role="main">
      <div class="container-fixed">
        <RouterView />
      </div>
    </main>
  </div>
</template>

