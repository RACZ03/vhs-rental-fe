<script setup lang="ts">
import { Ref, ref, onMounted, computed } from "vue";
import { Customer } from "../../domain";
import CustomerForm from "../components/forms/CustomerForm.vue";
import { Icon } from "@iconify/vue";
import {
  DialogRoot,
  DialogTrigger,
} from "radix-vue";

const customers: Ref<Customer[]> = ref([]);
const confirmDelete = ref(false);
const customerToDelete = ref<number | null>(null);

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const filters = ref({
  name: "",
});

const fetchCustomers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/clients`);
    if (!response.ok) {
      throw new Error("Error fetching customers");
    }
    const data = await response.json();
    customers.value = data || [];
  } catch (error) {
    console.error(error);
  }
};

const deleteCustomer = async () => {
  if (customerToDelete.value !== null) {
    try {
      const response = await fetch(`${BASE_URL}/clients/${customerToDelete.value}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el cliente");
      }
      await fetchCustomers();
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
    }
  }
  customerToDelete.value = null;
};

const handleModalClosed = () => {
  fetchCustomers();
};

onMounted(() => {
  fetchCustomers();
});

const filteredCustomers = computed(() => {
  return customers.value.filter(customer =>
    customer.name.toLowerCase().includes(filters.value.name.toLowerCase())
  );
});

const handleFilterChange = () => {
  fetchCustomers();
};
</script>

<template>
  <div class="mt-8">
    <div class="mb-4 flex gap-2">
      <input
        type="text"
        v-model="filters.name"
        @input="handleFilterChange"
        placeholder="Search by name"
        class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      />

      <CustomerForm action="Add" :customer="null" @closed="handleModalClosed"/>
    </div>
  </div>

  <div class="flex flex-col mt-8">
    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Name
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Last Name
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Phone
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Email
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                State
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-bold text-gray-900">
                  {{ customer.name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ customer.lastname }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ customer.phone }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ customer.email }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                  class="inline-flex px-2 font-semibold leading-5 rounded-full"
                  :class="{
                    'text-green-800 bg-green-100': customer.state,
                    'text-red-800 bg-red-100': !customer.state,
                  }"
                >
                  {{ customer.state ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <td
                class="px-6 py-4 font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
              >
                <CustomerForm action="Edit" :customer="customer" @closed="handleModalClosed"/>
                <button
                  @click="customerToDelete = customer.id; confirmDelete = true"
                  class="text-red-600 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none ml-2"
                >
                  <Icon icon="mdi:trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Dialog for confirmation -->
  <template v-if="confirmDelete">
    <DialogRoot>
      <DialogPortal>
        <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
        <DialogContent class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
          <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Are you sure you want to delete this client?
          </DialogDescription>
          <div class="flex justify-end mt-[25px]">
            <DialogClose as-child>
              <button @click="confirmDelete = false" class="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
                Cancel
              </button>
            </DialogClose>
            <button @click="confirmDelete = false; deleteCustomer()" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Confirm
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </template>

</template>
