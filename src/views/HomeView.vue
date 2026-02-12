<script setup>
const ball    = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
const pikachu = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
const fang    = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dragon-fang.png"
const pokeballIcon = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
</script>

<template>
  <div class="home-bg">
    <v-container class="pa-6">

      <v-sheet
        elevation="6"
        rounded="xl"
        max-width="720"
        class="mx-auto pa-8 text-center hero-card"
      >

        <h1 class="home-title">Bienvenid@ a la Pokédex</h1>

        <p class="home-subtitle">
          Explora cientos de Pokémon, revisa sus tipos, habilidades y estadísticas.
        </p>

        <!-- IMAGEN PRINCIPAL -->
        <div class="d-flex justify-center my-6">
          <v-img :src="ball" width="120" height="120" contain />
        </div>

        <v-btn
          color="red"
          size="large"
          rounded="lg"
          @click="$router.push('/pokemons')"
        >
          Entrar a la Pokédex
        </v-btn>
      </v-sheet>

      <!-- MENÚ -->
      <v-row justify="center" align="stretch" class="mt-10">

        <!-- TARJETA POKEMONS -->
<v-col cols="12" sm="6" md="4">
  <v-card
    elevation="6"
    rounded="xl"
    class="menu-card text-center"
    @click="$router.push({ name: 'pokemons' })"
    style="cursor:pointer"
  >
    <v-card-text>
      <div class="d-flex justify-center mb-3">
        <v-img :src="pikachu" width="96" height="96" contain />
      </div>

      <div class="menu-title">Pokémons</div>
      <div class="menu-text">Explora la lista completa.</div>
    </v-card-text>
  </v-card>
</v-col>
        <!-- TARJETA TIPOS -->
        <v-col cols="12" sm="6" md="4">
          <v-card elevation="2" rounded="xl" class="menu-card disabled text-center">
            <v-card-text>

              <div class="d-flex justify-center mb-3">
                <v-img :src="fang" width="96" height="96" contain />
              </div>

              <div class="menu-title">Tipos</div>
              <div class="menu-text">En construcción 🚧</div>

            </v-card-text>
          </v-card>
        </v-col>

      </v-row>

    </v-container>
  </div>
</template>

<style scoped>
.home-bg {
  min-height: 100vh;
  background: white;
  padding-top: 40px;
}

.hero-card {
  background: #fff;
  border-radius: 22px;
}

.home-title {
  font-size: 36px;
  font-weight: 900;
  color: #e53935;
}

.home-subtitle {
  opacity: 0.8;
}

.menu-card {
  transition: 0.25s;
  cursor: pointer;
}
.menu-card:hover {
  transform: translateY(-6px);
}
.menu-card.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.menu-title {
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
}
.menu-text {
  opacity: 0.8;
}
</style>