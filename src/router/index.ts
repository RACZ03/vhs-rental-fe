import CustomersVue from "../ui/views/Customers.vue";
import Home from "../ui/views/Home.vue";
import Movies from "../ui/views/Movies.vue";
import TopicVue from "../ui/views/Topic.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/movies", component: Movies },
  { path: "/customers", component: CustomersVue },
  { path: "/topics", component: TopicVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
