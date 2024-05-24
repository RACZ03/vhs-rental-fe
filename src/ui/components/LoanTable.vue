<script setup lang="ts">
import { Ref, ref, onMounted, computed } from "vue";
import { LoanMovie } from "../../domain";
import LoanForm from "../components/forms/LoanForm.vue";
import { Icon } from "@iconify/vue";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "radix-vue";

const loans: Ref<LoanMovie[]> = ref([]);
const confirmDelete = ref(false);
const loanToDelete = ref<number | null>(null);

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const filters = ref({
  dateLoan: "",
  clientId: "",
});

const fetchLoans = async () => {
  try {
    const response = await fetch(`${BASE_URL}/loanMovies`);
    if (!response.ok) {
      throw new Error("Error fetching loans");
    }
    const data = await response.json();
    loans.value = data || [];
  } catch (error) {
    console.error(error);
  }
};

const deleteLoan = async () => {
  if (loanToDelete.value !== null) {
    try {
      const response = await fetch(`${BASE_URL}/loanMovies/${loanToDelete.value}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting loan");
      }
      await fetchLoans();
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  }
  loanToDelete.value = null;
};

const handleModalClosed = () => {
  fetchLoans();
};

onMounted(() => {
  fetchLoans();
});

const filteredLoans = computed(() => {
  return loans.value.filter(loan => {
    const dateLoanString = loan.date_loan ? loan.date_return.toString() : "";
    const clientIdString = loan.client_name ? loan.client_name.toString() : "";
    
    return dateLoanString.toLowerCase().includes(filters.value.dateLoan.toLowerCase()) &&
           clientIdString.includes(filters.value.clientId);
  });
});

const handleFilterChange = () => {
  fetchLoans();
};
</script>

<template>
  <div class="mt-8">
    <div class="mb-4 flex gap-2">
      <input
        type="text"
        v-model="filters.dateLoan"
        @input="handleFilterChange"
        placeholder="Search by loan date"
        class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      />
      <input
        type="text"
        v-model="filters.clientId"
        @input="handleFilterChange"
        placeholder="Search by client"
        class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      />

      <LoanForm action="Add" :loan="null" @closed="handleModalClosed"/>
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
                Loan Date
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Return Date
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Topic
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Movie
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Client
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="loan in filteredLoans" :key="loan.id">
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-bold text-gray-900">
                  {{ loan.date_loan }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ loan.date_return }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ loan.topic_name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ loan.movie_name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ loan.client_name }}
                </div>
              </td>

              <td
                class="px-6 py-4 font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200"
              >
                <LoanForm action="Edit" :loan="loan" @closed="handleModalClosed"/>
                <button
                  @click="loanToDelete = loan.id; confirmDelete = true"
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
            Are you sure you want to delete this loan?
          </DialogDescription>
          <div class="flex justify-end mt-[25px]">
            <DialogClose as-child>
              <button @click="confirmDelete = false" class="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
                Cancel
              </button>
            </DialogClose>
            <button @click="confirmDelete = false; deleteLoan()" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
              Confirm
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </template>

</template>
