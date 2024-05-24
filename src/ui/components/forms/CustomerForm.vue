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
import { defineProps } from "vue";
import { Customer } from "../../../domain";
import { Ref, ref } from "vue";

interface Props {
  action: string;
  customer: Customer | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['closed']);

const form = ref<Customer>({
  id: 0,
  name: "",
  lastname: "",
  phone: "",
  email: "",
  state: false,
});

if (props.customer) {
  form.value = { ...props.customer };
}

const submitForm = async () => {
  try {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const data = {
      name: form.value.name,
      lastname: form.value.lastname,
      phone: form.value.phone,
      email: form.value.email,
    };

    let url = "";
    let method = "";

    if (form.value.id !== 0) {
      // Editar cliente existente
      url = `${BASE_URL}/clients/${form.value.id}`;
      method = "PUT";
    } else {
      // Agregar nuevo cliente
      url = `${BASE_URL}/clients`;
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
      throw new Error("Error al guardar el cliente");
    }

    console.log("Cliente guardado:", await response.json());
  } catch (error) {
    console.error("Error al procesar el cliente:", error);
  }

  emits('closed');
};

</script>

<template>
  <DialogRoot>
    <DialogTrigger class="text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none">
      <template v-if="props.action.toLowerCase() === 'edit'">
        <Icon icon="bi:pencil-fill" />
      </template>
      <template v-else>
        {{ props.action }} Customer
      </template>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
      <DialogContent class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{ props.action }} Customer
        </DialogTitle>
        <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Add or Edit the client here. Click save when you're done.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-primary w-[90px] text-right text-[15px]" for="name">Name</label>
          <input id="name" class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]" v-model="form.name" />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-primary w-[90px] text-right text-[15px]" for="lastName">Last Name</label>
          <input id="lastname" class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]" v-model="form.lastname" />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-primary w-[90px] text-right text-[15px]" for="phone">Phone</label>
          <input id="phone" class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]" v-model="form.phone" />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label class="text-primary w-[90px] text-right text-[15px]" for="email">Email</label>
          <input id="email" class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]" v-model="form.email" />
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button @click="submitForm" class="bg-green4 text-primary hover:bg-gray-400 focus:shadow-secondary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              {{ props.action === "Edit" ? "Update" : "Save" }}
            </button>
          </DialogClose>
        </div>
        <DialogClose class="text-secondary hover:bg-gray-400 focus:shadow-secondary absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none" aria-label="Cerrar">
          <Icon icon="lucide:x" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

