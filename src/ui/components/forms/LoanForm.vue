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

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Props {
  action: string;
  loan: LoanMovie | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['closed']);

const form = ref<LoanMovie>({
  id: 0,
  date_loan: "",
  date_return: "",
  movie_id: 0,
  client_id: 0,
});

if (props.loan) {
  form.value = { ...props.loan };
}

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
const submitForm = async () => {
  try {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const data = {
      movieId: form.value.movie_id,
      clientId: form.value.client_id,
      loanDate: form.value.date_loan,
      returnDate: form.value.date_return,
    };

    let url = "";
    let method = "";

    if (form.value.id !== 0) {
      url = `${BASE_URL}/loanMovies/${form.value.id}`;
      method = "PUT";
    } else {
      url = `${BASE_URL}/loanMovies`;
      method = "POST";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el registro");
    }

    console.log("Cliente guardado:", await response.json());
  } catch (error) {
    console.error("Error al procesar el registro:", error);
  }

  emits('closed');
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <DialogRoot>
    <DialogTrigger class="text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none">
      <template v-if="props.action.toLowerCase() === 'edit'">
        <Icon icon="bi:pencil-fill" />
      </template>
      <template v-else>
        {{ props.action }} Movie Loan
      </template>
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
            id="movie_id"
            v-model="form.movie_id"
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
            id="client_id"
            v-model="form.client_id"
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
            id="date_loan"
            v-model="form.date_loan"
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
            id="date_return"
            v-model="form.date_return"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type="date"
          />
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button @click="submitForm" class="bg-green4 text-primary hover:bg-gray-400 focus:shadow-secondary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              {{ props.action === "Edit" ? "Update" : "Save" }}
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
