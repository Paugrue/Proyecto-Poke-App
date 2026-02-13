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
    },
    {
      path: "/characters",
      name: "characters",
      component: () => import("@/views/CharactersPage.vue"),
    }
  ],
});

export default router;