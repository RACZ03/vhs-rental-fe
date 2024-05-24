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
import MovieForm from "../components/forms/MovieForm.vue";
import { IMovie, ITopic } from "../../domain";
import { Icon } from "@iconify/vue";
import { Ref, ref, onMounted, computed } from "vue";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const movies: Ref<IMovie[]> = ref([]);

const topics: Ref<ITopic[]> = ref([]);


const filters = ref({
  title: "",
  topics: 0,
  available: "",
});

const fetchMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies`);

    if (!response.ok) {
      throw new Error(`Error getting movies: ${response.statusText}`);
    }

    const data = await response.json();
    movies.value = data;
  } catch (error) {
    console.error("Error getting movies:", error);
  }
};

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
  fetchMovies();
  fetchTopics();
});

const deleteMovie = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting movie");
    }

    await fetchMovies();
  } catch (error) {
    console.error("Error deleting movie:", error);
  }
}

const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const titleMatch = movie.title
      .toLowerCase()
      .includes(filters.value.title.toLowerCase());
    const topicsMatch =
      !filters.value.topics || movie.topic_id === filters.value.topics;
    const availableMatch =
      filters.value.available === "" ||
      movie.available === filters.value.available;
    return titleMatch && topicsMatch && availableMatch;
  });
});

const getTopicNameById = (id: number) => {
  const topic = topics.value.find((topic) => topic.id === id);
  return topic ? topic.name_topic : "";
};

const handleFilterChange = () => {
  fetchMovies();
};
</script>
<template>
  <div class="mt-8">
    <div class="mb-4 flex gap-2">
      <input
        type="text"
        v-model="filters.title"
        placeholder="Search by title"
        @input="handleFilterChange"
        class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      />

      <select
        v-model="filters.topics"
        class="border p-2 text-secondary min-w-36 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      >
        <option value="">All topics</option>
        <option v-for="topic in topics" :key="topic.id" :value="topic.id">
          {{ topic.name_topic }}
        </option>
      </select>

      <select
        v-model="filters.available"
        class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none"
      >
        <option value="">All</option>
        <option value="1">Available</option>
        <option value="0">Not available</option>
      </select>
      <MovieForm action="Add" :movie="null" @movieAdded="fetchMovies" />
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
                Title
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Topic
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Year
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Summary
              </th>
              <th
                class="px-6 py-3 font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
              >
                Available
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="movie in filteredMovies" :key="movie.id">
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-bold text-gray-900">
                  {{ movie.title }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ getTopicNameById(movie.topic_id) }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="leading-5 font-semibold text-gray-800">
                  {{ movie.year }}
                </div>
              </td>

              <td
                class="px-6 py-4 leading-5 text-gray-800 whitespace-no-wrap border-b border-gray-200"
              >
                <div class="leading-5 font-semibold text-gray-800">
                  {{ movie.summary }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                  class="inline-flex px-2 font-semibold leading-5 rounded-full"
                  :class="
                    movie.available == 1
                      ? 'text-green-800 bg-green-100'
                      : 'text-red-800 bg-red-100'
                  "
                >
                  {{ movie.available == 1 ? "Available" : "Not available" }}
                </span>
              </td>
              <td
                class="px-6 py-4 font-medium leading-5 text-right whitespace-no-wrap flex gap-2 border-b border-gray-200"
              >
                <MovieForm
                  action="Edit"
                  :movie="movie"
                  @movieAdded="fetchMovies"
                />

                <!-- Dialog for confirmation -->

                <DialogRoot>
                  <DialogTrigger
                    class="text-red-600 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none ml-2"
                  >
                    <Icon icon="mdi:trash" />
                  </DialogTrigger>

                  <DialogPortal>
                    <DialogOverlay
                      class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
                    />
                    <DialogContent
                      class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]"
                    >
                      <DialogTitle
                        class="text-mauve12 m-0 text-[17px] font-semibold"
                      >
                        Confirm Deletion
                      </DialogTitle>
                      <DialogDescription
                        class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"
                      >
                        Are you sure you want to delete this movie?
                      </DialogDescription>
                      <div class="flex justify-end mt-[25px]">
                        <DialogClose as-child>
                          <button
                            class="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
                          >
                            Cancel
                          </button>
                        </DialogClose>
                        <button
                          @click="deleteMovie(movie.id)"
                          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                          Confirm
                        </button>
                      </div>
                    </DialogContent>
                  </DialogPortal>
                </DialogRoot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
