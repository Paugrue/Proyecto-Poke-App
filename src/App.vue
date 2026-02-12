<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Poke App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Navegación -->
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/pokemons" text>Pokemons</v-btn>
    </v-app-bar>

    <!-- Contenido -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style>
</style>