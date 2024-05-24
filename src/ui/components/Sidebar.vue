<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isRouteActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="h-full overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 -translate-x-full ease-in"
  >
    <div
      class="flex items-center justify-center mt-8 bg-gray-900 overflow-y-auto transition duration-300 transform"
    >
      <div class="flex items-center">
        <RouterLink to="/" class="mx-2 text-2xl font-semibold text-white"
          >Movies Loans</RouterLink
        >
      </div>
    </div>

    <nav class="mt-10">
      <div
        :class="{ 'bg-gray-700 bg-opacity-25': isRouteActive('/movies') }"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
      >
        <Icon icon="mdi:movie-open-outline" width="26" height="26" />

        <RouterLink
          to="/movies"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Movies</RouterLink
        >
      </div>

      <div
        :class="{ 'bg-gray-700 bg-opacity-25': isRouteActive('/topics') }"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
      >
        <Icon icon="bxs:category" width="26" height="26" />

        <RouterLink
          to="/topics"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Topics</RouterLink
        >
      </div>

      <div
        :class="{ 'bg-gray-700 bg-opacity-25': isRouteActive('/customers') }"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
      >
        <Icon icon="fa-solid:users" width="26" height="26" />

        <RouterLink
          to="/customers"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Customers</RouterLink
        >
      </div>

      <div
        :class="{ 'bg-gray-700 bg-opacity-25': isRouteActive('/returns') }"
        class="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
      >
        <Icon icon="ph:key-return-fill" width="26" height="26" />

        <RouterLink
          to="/returns"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >Returns</RouterLink
        >
      </div>
    </nav>
  </div>
</template>
