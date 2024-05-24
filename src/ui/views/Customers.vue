<script setup lang="ts">
import DefaultLayout from "../layouts/DefaultLayout.vue";
import CustomerTable from "../components/CustomerTable.vue";
import Statistics from "../components/Statistics.vue";
</script>

<template>
  <DefaultLayout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container px-6 py-8 mx-auto">
        <h3 class="text-3xl font-medium text-gray-700">Customers</h3>
        
        <CustomerTable />
        
      </div>
    </main>
  </DefaultLayout>
</template>
