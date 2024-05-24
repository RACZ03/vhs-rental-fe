<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="bg-primary text-white">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex">
            <RouterLink to="/" class="text-2xl font-bold text-secondary"
              >VHS Store</RouterLink
            >
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <RouterLink
                to="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Peliculas</RouterLink
              >
              <RouterLink
                to="/customers"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Clientes</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          to="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Inicio</RouterLink
        >
        <RouterLink
          to="/movies"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Películas</RouterLink
        >
        <RouterLink
          to="/clients"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Clientes</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
