import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/pokemons",
      name: "pokemons",
      component: () => import("@/views/PokemonPage.vue"),
    }
  ],
});

export default router;