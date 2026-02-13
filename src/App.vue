<script setup>
</script>

<template>
  <v-app>

    <!-- APP BAR -->
    <v-app-bar
      elevation="0"
      color="transparent"
      class="app-bar"
    >
      <v-container class="d-flex align-center">

        <div class="text-h6 font-weight-bold">
          Proyecto Poke API + Hogwarts
        </div>

        <v-spacer />

        <v-btn to="/" variant="text">Home</v-btn>
        <v-btn to="/pokemons" variant="text">Pokédex</v-btn>
        <v-btn :to="{ name: 'characters' }" variant="text">
          Hogwarts
        </v-btn>

      </v-container>
    </v-app-bar>

    <!-- MAIN -->
    <v-main class="main-bg">
      <router-view />
    </v-main>

  </v-app>
</template>

<style scoped>

/* Fondo */
.main-bg {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #eef2ff 0%,
    #f8fafc 40%,
    #e0f2fe 100%
  );
}

/* AppBar */
.app-bar {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

</style>
