<script setup lang="ts">
import { defineProps } from "vue";
import { Topic } from "../../../domain";
import { ref } from "vue";
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

interface Props {
    action: string;
    topic: Topic | null;
}

const props = defineProps<Props>();

const emits = defineEmits(['closed']);

 const form = ref<Topic>({
    id: 0,
     name_topic: "",
 });

 if (props.topic) {
    form.value = { ...props.topic };
}

const submitForm = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL;

        const data = {
            name: form.value.name_topic,
        };

        let url = "";
        let method = "";

        if (form.value.id !== 0) {
            // Editar cliente existente
            url = `${BASE_URL}/topics/${form.value.id}`;
            method = "PUT";
        } else {
            // Agregar nuevo cliente
            url = `${BASE_URL}/topics`;
            method = "POST";
        }

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Error al guardar el topic");
        }
    } catch (error) {
        console.error("Error al guardar el topic:", error);
    }
    emits('closed');
};

</script>

<template>
    <DialogRoot>
        <DialogTrigger
            class="text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none">
            {{ props.action }} Topic
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
            <DialogContent
                class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
                <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                    {{ props.action }} Topic
                </DialogTitle>
                <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                   Add or dit the topic here. click save when you're done
                </DialogDescription>
                <fieldset class="mb-[15px] flex items-center gap-5">
                    <label class="text-primary w-[90px] text-right text-[15px]" for="title">
                        Topic:
                    </label>
                    <input id="title"
                        class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        v-model="form.name_topic" />
                </fieldset>
                <div class="mt-[25px] flex justify-end">
                    <DialogClose as-child>
                        <button @click="submitForm"
                            class="bg-green4 text-primary hover:bg-gray-400 focus:shadow-secondary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                            Save changes
                        </button>
                    </DialogClose>
                </div>
                <DialogClose
                    class="text-secondary hover:bg-gray-400 focus:shadow-secondary absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close">
                    <Icon icon="lucide:x" />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
