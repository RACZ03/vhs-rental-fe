<script setup lang="ts">
import Footer from "../components/Footer.vue";
import HeaderVue from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import { ref } from "vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="flex flex-col min-h-screen">

    <HeaderVue @toggleSidebar="toggleSidebar" />
    
    <div class="flex flex-1 ">
      <div v-if="isSidebarOpen">
        <Sidebar />
      </div>

      <div class="flex flex-col flex-1 overflow-hidden">
        <slot />
      </div>
    </div>

    <Footer />
  </div>
</template>
