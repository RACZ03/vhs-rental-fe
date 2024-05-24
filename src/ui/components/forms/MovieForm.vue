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
import { IMovie, ITopic } from "../../../domain";
import { Ref, ref, onMounted, defineEmits } from "vue";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Props {
  action: string;
  movie: IMovie | null;
}

const props = defineProps<Props>();

const emit = defineEmits(["movieAdded"]);

const topics: Ref<ITopic[]> = ref([]);

const form = ref<Omit<IMovie, "id">>({
  title: "",
  topic_id: 0,
  year: 2024,
  summary: "",
  available: 1,
});

const fetchTopics = async () => {
  try {
    const response = await fetch(`${BASE_URL}/topics`);
    if (!response.ok) {
      throw new Error(`Error getting topics: ${response.statusText}`);
    }
    const data = await response.json();
    topics.value = data;
  } catch (error) {
    console.error("Error getting topics:", error);
  }
};

onMounted(() => {
  fetchTopics();
});

if (props.action.toLowerCase() == "edit" && props.movie != null) {
  form.value.title = props.movie.title;
  form.value.topic_id = props.movie.topic_id;
  form.value.year = props.movie.year;
  form.value.summary = props.movie.summary;
  form.value.available = props.movie.available;
}

const submitForm = async () => {
  try {
    if (props.action.toLowerCase() === "edit" && props.movie != null) {
      try {
        const response = await fetch(`${BASE_URL}/movies/${props.movie.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.value),
        });

        if (!response.ok) {
          throw new Error("Error al editar la película");
        }
        console.log("Película editada:", await response.json());
      } catch (error) {
        console.error("Error al procesar la película:", error);
      }
    } else if (props.action.toLowerCase() !== "edit") {
      const response = await fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.value),
      });

      if (!response.ok) {
        throw new Error("Error creating movie");
      }

      form.value.title = "";
      form.value.topic_id = 0;
      form.value.year = 2024;
      form.value.summary = "";
      form.value.available = 1;

      console.log("Created movie:", await response.json());
    }

    emit("movieAdded");
  } catch (error) {
    console.error("Error processing movie:", error);
  }
};
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class="text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
    >
      <div v-if="props.action.toLowerCase() == 'edit'">
        <Icon icon="mdi:pencil" />
      </div>
      <div v-else>{{ props.action }} Movie</div>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
      >
        <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
          {{ props.action }} Movie
        </DialogTitle>
        <DialogDescription
          class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"
        >
          Add or Edit the movie here. Click save when you have finished.
        </DialogDescription>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="title"
          >
            Title
          </label>
          <input
            id="title"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            v-model="form.title"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="topic"
          >
            Topics
          </label>
          <select
            id="topic"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            v-model.number="form.topic_id"
          >
            <option value=""></option>
            <option v-for="topic in topics" :key="topic.id" :value="topic.id">
              {{ topic.name_topic }}
            </option>
          </select>
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="year"
          >
            Year
          </label>
          <input
            id="year"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            type="number"
            min="1900"
            max="2099"
            step="1"
            v-model="form.year"
          />
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="summary"
          >
            Summary
          </label>
          <textarea
            id="summary"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            v-model="form.summary"
          >
          </textarea>
        </fieldset>
        <fieldset class="mb-[15px] flex items-center gap-5">
          <label
            class="text-primary w-[90px] text-right text-[15px]"
            for="available"
          >
            Available
          </label>
          <select
            id="topic"
            class="text-primary shadow-gray-400 focus:shadow-secondary inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
            v-model.number="form.available"
          >
            <option value="1">YES</option>
            <option value="0">NO</option>
          </select>
        </fieldset>
        <div class="mt-[25px] flex justify-end">
          <DialogClose as-child>
            <button
              @click="submitForm"
              class="bg-green4 text-primary hover:bg-gray-400 focus:shadow-secondary inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-semibold leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
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