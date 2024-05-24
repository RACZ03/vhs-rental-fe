<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
import { Icon } from "@iconify/vue";
import { ref, reactive, onMounted } from "vue"; // Importar reactive
import { LoanMovie } from "../../../domain";

const movies = ref([]);
const clients = ref([]);
const currentLoan = reactive({
  id: null,
  movieId: '',
  clientId: '',
  loanDate: '',
  returnDate: '',
});
const isEditing = ref(false);

const emits = defineEmits(['closed']);

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const loadData = async () => {
  try {
    const moviesResponse = await fetch(`${BASE_URL}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const customerResponse = await fetch(`${BASE_URL}/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const moviesData = await moviesResponse.json();
    const clientsData = await customerResponse.json();
    
    movies.value = moviesData;
    clients.value = clientsData;
  } catch (error) {
    console.error("Error loading data: ", error);
  }
};

const saveLoan = async () => {
  try {
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value ? `${BASE_URL}/loanMovies/${currentLoan.id}` : `${BASE_URL}/loanMovies`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentLoan),
    });

    if (!response.ok) {
      throw new Error('Failed to save loan');
    }

    // Reset currentLoan and close dialog
    currentLoan.id = null;
    currentLoan.movieId = '';
    currentLoan.clientId = '';
    currentLoan.loanDate = '';
    currentLoan.returnDate = '';
    isEditing.value = false;
    
    // Optionally reload data or notify the user
    loadData();
    
    emits('closed');

  } catch (error) {
    console.error("Error saving loan: ", error);
  }
};

const editLoan = (loan: LoanMovie) => {
  currentLoan.id = loan.id;
  currentLoan.movieId = loan.movieId;
  currentLoan.clientId = loan.clientId;
  currentLoan.loanDate = loan.loanDate;
  currentLoan.returnDate = loan.returnDate;
  isEditing.value = true;
};

const createNewLoan = () => {
  currentLoan.id = null;
  currentLoan.movieId = '';
  currentLoan.clientId = '';
  currentLoan.loanDate = '';
  currentLoan.returnDate = '';
  isEditing.value = false;
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      @click="createNewLoan"
      class="text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
    >
    Add/Edit Loan
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{ isEditing ? 'Edit Loan' : 'Add Loan' }}
        </DialogTitle>
        <DialogDescription
          class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"
        >
        Add or Edit the loan here. Click save when you have
          finished.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="movie"
          >
          Movies
          </label>
          <select
            id="movie"
            v-model="currentLoan.movieId"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          >
            <option value=""></option>
            <option v-for="movie in movies" :key="movie.id" :value="movie.id">
              {{ movie.title }}
            </option>
          </select>
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="customer"
          >
          Customers
          </label>
          <select
            id="customer"
            v-model="currentLoan.clientId"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
          >
            <option value=""></option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.name }} {{ client.lastname }}
            </option>
          </select>
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="loanDate"
          >
            Loan date
          </label>
          <input
            id="loanDate"
            v-model="currentLoan.loanDate"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type="date"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="returnDate"
          >
          Return date
          </label>
          <input
            id="returnDate"
            v-model="currentLoan.returnDate"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type="date"
          />
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="saveLoan"
              class="bg-green4 text-primary hover:bg-gray-400 focus:shadow-secondary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
            Save Changes
            </button>
          </DialogClose>
        </div>
        <DialogClose
          class="text-secondary hover:bg-gray-400 focus:shadow-secondary absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <Icon icon="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
