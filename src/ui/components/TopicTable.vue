<script setup lang="ts">
import { Ref, onMounted, ref, computed } from 'vue'
import { Topic } from '../../domain'
import TopicForm from '../components/forms/TopicForm.vue'
import { Icon } from "@iconify/vue";

import {
    DialogRoot
} from "radix-vue";


const topics: Ref<Topic[]> = ref([]);
const confirmDelete = ref(false);
const topicToDelete = ref<number | null>(null);

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const filters = ref({
    name_topic: "",
})


const fetchTopics = async () => {
    try {
        const response = await fetch(`${BASE_URL}/topics`);

        if (!response.ok) {
            throw new Error(`Error al obtener los Topics: ${response.statusText}`);
        }
        const data = await response.json();
        topics.value = data;
    } catch (error) {
        console.error("Error al obtener las películas:", error);
    }
};


const deleteTopic = async () => {
    if (topicToDelete.value !== null) {
       try {
            const response = await fetch(`${BASE_URL}/topics/${topicToDelete.value}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el topic");
            }
            await fetchTopics();
        } catch (error) {
            console.error("Error al eliminar el topic:", error);
        }
    }
    topicToDelete.value = null;
};



onMounted(() => {
    fetchTopics();
});

const handleModalClosed = () => {
    fetchTopics();
};

const filteredTopics = computed(() => {
    return topics.value.filter(topic =>
        topic.name_topic.toLowerCase().includes(filters.value.name_topic.toLowerCase())
    );
});

const handleFilterChange = () => {
    fetchTopics();
};
</script>

<template>
    <div class="mt-8">
        <div class="mb-4 flex gap-2">
            <input type="text" v-model="filters.name_topic" @input="handleFilterChange" placeholder="Search by name"
                class="border p-2 text-secondary font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none" />
            <TopicForm action="add" :topic="null" @closed="handleModalClosed" />
        </div>
    </div>

    <div class="flex flex-col mt-8">
        <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div
                class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table class="min-w-full">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                ID
                            </th>
                            <th
                                class="px-6 py-3 font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Nombre
                            </th>
                            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-center">
                                Accion
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white">
                        <tr v-for="topic in filteredTopics" :key="topic.id">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                <div class="leading-5 font-bold text-gray-900">
                                    {{ topic.id }}
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                <div class="leading-5 font-semibold text-gray-800">
                                    {{ topic.name_topic }}
                                </div>
                            </td>
                            <td
                                class="px-6 py-4 font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200">
                                <TopicForm action="edit" :topic="topic" @closed="handleModalClosed" />
                                <button @click="topicToDelete = topic.id; confirmDelete = true"
                                    class="text-red-600 font-semibold shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none shadow-[0_1px_5px] focus:shadow-[0_0_0_1px] focus:shadow-black focus:outline-none ml-2">
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
                <DialogContent
                    class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]">
                    <DialogTitle class="text-mauve12 m-0 text-[17px] font-semibold">
                        Confirm Deletion
                    </DialogTitle>
                    <DialogDescription class="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                        Are you sure you want to delete this topic?
                    </DialogDescription>
                    <div class="flex justify-end mt-[25px]">
                        <DialogClose as-child>
                            <button @click="confirmDelete = false"
                                class="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
                                Cancel
                            </button>
                        </DialogClose>
                        <button @click="confirmDelete = false; deleteTopic()"
                            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Confirm
                        </button>
                    </div>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    </template>
</template>