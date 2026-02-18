<script setup>
import { ref, onMounted, computed, watch } from "vue"
import { getStudents } from "@/services/hpService"

const characters = ref([])
const search = ref("")
const selectedHouse = ref("")
const loading = ref(false)

import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (typeof route.query.q === "string") search.value = route.query.q
  if (typeof route.query.house === "string") selectedHouse.value = route.query.house
})

watch([search, selectedHouse], ([q, house]) => {
  router.replace({
    query: {
      ...(q ? { q } : {}),
      ...(house ? { house } : {})
    }
  })
})

function onClearSearch() { search.value = "" }
function onHouseChange() {}
function onClearHouse() { selectedHouse.value = "" }

const headers = [
  { title: "Personaje", key: "name" },
  { title: "Casa", key: "house" },
  { title: "Actor", key: "actor" },
  { title: "Especie", key: "species" },
  { title: "Detalles", key: "details", sortable: false }
]

const houseColors = {
  Gryffindor: "red-darken-2",
  Slytherin: "green-darken-2",
  Ravenclaw: "blue-darken-2",
  Hufflepuff: "amber-darken-2",
}

// Casas únicas de los personajes (para el select)
const houses = computed(() => {
  const unique = [...new Set(characters.value.map(c => c.house).filter(Boolean))]
  return unique
})

async function loadCharacters() {
  loading.value = true
  try {
    const data = await getStudents()
    characters.value = data
  } finally {
    loading.value = false
  }
}

// Filtrado por búsqueda + casa
const filteredCharacters = computed(() => {
  return characters.value.filter(c => {
    const name = c.name?.toLowerCase() || ""
    const matchesSearch = name.includes(search.value.toLowerCase())
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
        Explora los personajes de Hogwarts
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
          clearable
          hide-details
          class="filter-field"
          @click:clear="onClearSearch"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedHouse"
          :items="houses"
          label="Filtrar por casa"
          variant="outlined"
          clearable
          class="filter-field"
          @update:modelValue="onHouseChange"
          @click:clear="onClearHouse"
        />
      </v-col>
    </v-row>

    <!-- TABLA -->
    <v-data-table
      :headers="headers"
      :items="filteredCharacters"
      :loading="loading"
      item-key="id"
      class="rounded-xl elevation-4"
    >
      <!-- Botón de detalles -->
      <template #item.details="{ item }">
        <v-btn
          color="primary"
          size="small"
          :to="{ name: 'character', params: { id: item.id }, query: route.query }"
          >

          Ver más
        </v-btn>
      </template>

      <!-- Columna Personaje (avatar + nombre + especie) -->
      <template #item.name="{ item }">
        <div class="d-flex align-center ga-3">
          <v-avatar size="56">
            <v-img :src="item.image" cover />
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

      <!-- Chip con casa -->
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