<script setup>
import ball from '@/assets/ball.png'
import hogwarts from '@/assets/hogwarts.png'
</script>

<template>
  <v-container class="py-12">

    <!-- Título -->
    <div class="text-center mb-10">
      <h1 class="text-h4 font-weight-bold">Poke API + Hogwarts</h1>
      <p class="text-medium-emphasis">
        Proyecto con Vue + Vuetify
      </p>
    </div>

    <v-row justify="center" align="stretch" class="ga-6">

      <!-- POKÉMON -->
      <v-col cols="12" sm="6" md="4">
        <v-card
          to="/pokemons"
          rounded="xl"
          elevation="8"
          class="menu-card"
        >
          <v-img
            :src="ball"
            height="160"
            class="card-image"
            contain
          >
            <v-overlay
              contained
              class="d-flex align-center justify-center text-white"
              opacity="0"
              scrim="black"
            >
              <div class="text-h6 font-weight-bold">
                Ver Pokémons
              </div>
            </v-overlay>
          </v-img>

          <v-card-text class="text-center">
            <div class="text-h6 font-weight-bold mb-2">
              Pokémons
            </div>
            <div class="text-medium-emphasis">
              Grid, masonry y vista de detalles.
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- HOGWARTS -->
      <v-col cols="12" sm="6" md="4">
        <v-card
          :to="{ name: 'characters' }"
          rounded="xl"
          elevation="8"
          class="menu-card"
        >
          <v-img
            :src="hogwarts"
            height="160"
            class="card-image"
            contain
          >
            <v-overlay
              contained
              class="d-flex align-center justify-center text-white"
              opacity="0"
              scrim="black"
            >
              <div class="text-h6 font-weight-bold">
                Ver Personajes
              </div>
            </v-overlay>
          </v-img>

          <v-card-text class="text-center">
            <div class="text-h6 font-weight-bold mb-2">
              Personajes HP
            </div>
            <div class="text-medium-emphasis">
              DataTable con búsqueda y filtrado por casas.
            </div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>
.menu-card {
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.menu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

/* Imagen más elegante */
.card-image {
  transition: transform 0.4s ease;
}

.menu-card:hover .card-image {
  transform: scale(1.05);
}

/* Overlay animado */
.v-overlay {
  transition: opacity 0.3s ease;
}

.menu-card:hover .v-overlay {
  opacity: 0.85 !important;
}
</style>
