<script setup>
import { ref, onMounted } from "vue"
import { apiFetch } from "@/services/apiFetch"
import { typeColors } from "@/utils/typeColors"

const pokemons = ref([])
const page = ref(1)
const limit = 20
const total = ref(0)

const viewMode = ref("grid")

const selected = ref(null)
const dialog = ref(false)

function showDetails(pokemon) {
  selected.value = pokemon
  dialog.value = true
}

function getColor(pokemon) {
  const type = pokemon.types?.[0]?.type?.name
  return typeColors[type] || "#ccc"
}

function getImg(p) {
  // imagen oficial; si no existe, usa la básica
  return (
    p?.sprites?.other?.["official-artwork"]?.front_default ||
    p?.sprites?.front_default ||
    ""
  )
}

async function loadPokemons() {
  const offset = (page.value - 1) * limit
  const data = await apiFetch(`/pokemon?limit=${limit}&offset=${offset}`)
  total.value = Math.ceil(data.count / limit)

  const promises = data.results.map(p => apiFetch(`/pokemon/${p.name}`))
  pokemons.value = await Promise.all(promises)
}

function nextPage() {
  if (page.value < total.value) {
    page.value++
    loadPokemons()
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    loadPokemons()
  }
}

onMounted(loadPokemons)
</script>

<template>
  <v-container>

    <v-btn-toggle v-model="viewMode" divided class="mb-4">
      <v-btn value="list">Lista</v-btn>
      <v-btn value="grid">Grid</v-btn>
      <v-btn value="masonry">Masonry</v-btn>
    </v-btn-toggle>

    <!-- LISTA -->
    <div v-if="viewMode === 'list'">
      <v-list>
        <v-list-item
          v-for="p in pokemons"
          :key="p.id"
          @click="showDetails(p)"
          style="cursor:pointer"
        >
          <template #prepend>
            <v-avatar size="56">
              <v-img :src="getImg(p)" alt="" cover />
            </v-avatar>
          </template>

          <v-list-item-title class="text-capitalize">
            {{ p.name }}
            <v-chip
              size="x-small"
              :color="getColor(p)"
              text-color="white"
              label
              class="ml-2"
            >
              {{ p.types[0].type.name }}
            </v-chip>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>

    <!-- GRID -->
    <v-row v-if="viewMode === 'grid'">
      <v-col
        v-for="p in pokemons"
        :key="p.id"
        cols="12" sm="6" md="3"
      >
        <v-card
          @click="showDetails(p)"
          :style="{
            cursor: 'pointer',
            backgroundColor: getColor(p),
            borderRadius: '16px',
            padding: '12px',
            color: 'white'
          }"
        >
          <v-img :src="getImg(p)" alt="" height="150" contain />
          <v-card-title class="text-capitalize" style="font-weight: bold;">
            {{ p.name }}
          </v-card-title>

          <v-chip
            size="small"
            color="white"
            text-color="black"
            label
            class="mt-2"
          >
            {{ p.types[0].type.name }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <!-- MASONRY -->
    <div
      v-if="viewMode === 'masonry'"
      style="column-count: 3; column-gap: 16px;"
    >
      <div
        v-for="p in pokemons"
        :key="p.id"
        style="break-inside: avoid; margin-bottom: 16px;"
      >
        <v-card
          @click="showDetails(p)"
          :style="{
            cursor: 'pointer',
            backgroundColor: getColor(p),
            borderRadius: '16px',
            padding: '12px',
            color: 'white'
          }"
        >
          <v-img :src="getImg(p)" alt="" height="160" contain />
          <v-card-title class="text-capitalize" style="font-weight: bold;">
            {{ p.name }}
          </v-card-title>

          <v-chip
            size="small"
            color="white"
            text-color="black"
            label
            class="mt-2"
          >
            {{ p.types[0].type.name }}
          </v-chip>
        </v-card>
      </div>
    </div>

    <!-- PAGINACIÓN -->
    <v-row class="mt-4" justify="center" align="center">
      <v-btn @click="prevPage" :disabled="page === 1">Anterior</v-btn>
      <span class="mx-4">Página {{ page }} / {{ total }}</span>
      <v-btn @click="nextPage" :disabled="page === total">Siguiente</v-btn>
    </v-row>

    <!-- DETALLES -->
    <v-dialog v-model="dialog" max-width="420">
      <v-card>
        <v-card-title class="text-h5 text-capitalize">
          {{ selected?.name }}
        </v-card-title>

        <v-card-text>
          <v-img :src="getImg(selected)" alt="" height="180" contain class="mb-2" />

          <p><strong>Altura:</strong> {{ selected?.height }}</p>
          <p><strong>Peso:</strong> {{ selected?.weight }}</p>

          <p><strong>Tipos:</strong></p>
          <ul>
            <li
              v-for="t in selected?.types"
              :key="t.type.name"
              class="text-capitalize"
            >
              {{ t.type.name }}
            </li>
          </ul>

          <p><strong>Habilidades:</strong></p>
          <ul>
            <li
              v-for="h in selected?.abilities"
              :key="h.ability.name"
              class="text-capitalize"
            >
              {{ h.ability.name }}
            </li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style>
</style>
``
