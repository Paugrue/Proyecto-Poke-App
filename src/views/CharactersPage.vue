<script setup>
import { ref, onMounted, computed } from "vue"

const url = "https://hp-api.onrender.com/api/characters/students"

const characters = ref([])
const search = ref("")
const selectedHouse = ref("")   // 🏠 Nueva: casa seleccionada
const loading = ref(false)

const headers = [
  { title: "Personaje", key: "name" },
  { title: "Casa", key: "house" },
  { title: "Actor", key: "actor" },
  { title: "Especie", key: "species" },
]

const houseColors = {
  Gryffindor: "red-darken-2",
  Slytherin: "green-darken-2",
  Ravenclaw: "blue-darken-2",
  Hufflepuff: "amber-darken-2",
}

// 🏰 Casas únicas de los personajes
const houses = computed(() => {
  const unique = [...new Set(characters.value.map(c => c.house).filter(Boolean))]
  return unique
})

async function loadCharacters() {
  loading.value = true
  const res = await fetch(url)
  characters.value = await res.json()
  loading.value = false
}

// 🔍 Computed: Filtrado por búsqueda + casa
const filteredCharacters = computed(() => {
  return characters.value.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesHouse = selectedHouse.value ? c.house === selectedHouse.value : true
    return matchesSearch && matchesHouse
  })
})

onMounted(loadCharacters)
</script>

<template>
  <v-container class="py-8">

    <div class="text-center mb-6">
      <h1 class="text-h4 font-weight-bold">
        Estudiantes de Hogwarts
      </h1>
      <p class="text-medium-emphasis">
        Explora los personajes del mundo mágico
      </p>
    </div>

    <!-- FILTROS -->
<v-row class="mb-4" dense>
  <v-col cols="12" sm="6">
    <v-text-field
      v-model="search"
      label="Buscar personaje..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      clearable
      class="filter-field"
    />
  </v-col>

  <v-col cols="12" sm="6">
    <v-select
      v-model="selectedHouse"
      :items="houses"
      label="Filtrar por casa"
      clearable
      variant="outlined"
      class="filter-field"
    />
  </v-col>
</v-row>

    <!-- TABLA -->
    <v-data-table
      :headers="headers"
      :items="filteredCharacters"
      :loading="loading"
      item-key="name"
      class="rounded-xl elevation-4"
    >

      <template #item.name="{ item }">
        <div class="d-flex align-center ga-3">
          <v-avatar size="56">
            <v-img
              :src="item.image"
              cover
            />
          </v-avatar>
          <div>
            <div class="font-weight-bold">
              {{ item.name }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ item.species }}
            </div>
          </div>
        </div>
      </template>

      <template #item.house="{ item }">
        <v-chip
          v-if="item.house"
          :color="houseColors[item.house] || 'grey'"
          text-color="white"
          label
        >
          {{ item.house }}
        </v-chip>
        <span v-else class="text-medium-emphasis">—</span>
      </template>

      <template #item.actor="{ item }">
        <span class="text-medium-emphasis">
          {{ item.actor || "Desconocido" }}
        </span>
      </template>

    </v-data-table>

  </v-container>
</template>

<style scoped>
.v-data-table {
  backdrop-filter: blur(4px);
}

.filter-field .v-field {
  min-height: 56px;       
  display: flex;
  align-items: center;    
}


.filter-field .v-field__prepend-inner,
.filter-field .v-field__append-inner {
  margin-top: 0;         
}
</style>
