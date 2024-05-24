<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import MovieTable from "../components/MovieTable.vue";
</script>

<template>
  <DefaultLayout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container px-6 py-8 mx-auto">
        <h3 class="text-3xl font-medium text-gray-700">Movies</h3>
        
        <MovieTable />
        
      </div>
    </main>
  </DefaultLayout>
</template>
