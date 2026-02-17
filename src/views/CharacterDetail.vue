<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getCharacterById } from "@/services/hpService"

const route = useRoute()
const router = useRouter()

const character = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const data = await getCharacterById(route.params.id)
    character.value = data
  } catch (e) {
    error.value = "No se pudo cargar el personaje."
  } finally {
    loading.value = false
  }
})

const photo = computed(() => character.value?.image || "")
</script>

<template>
  <v-container class="mt-8">

    <!-- Volver atrás -->
    <v-btn color="primary" class="mb-6" @click="router.back()">← Volver</v-btn>

    <!-- Estados -->
    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
    <v-skeleton-loader
      v-else-if="loading"
      type="image, list-item, list-item, list-item"
      class="mx-auto"
      max-width="600"
    />

    <!-- Ficha -->
    <v-sheet
      v-else
      elevation="6"
      rounded="xl"
      class="pa-6 mx-auto"
      max-width="600"
    >
      <!-- Foto -->
      <div class="img-box">
        <v-img
            :src="photo"
            :alt="`Foto de ${character?.name || ''}`"
            class="char-img"
            cover
        />
        </div>

      <!-- Nombre -->
      <h1 class="text-h4 mb-4">{{ character?.name }}</h1>

      <v-divider class="mb-4" />

      <!-- Metadatos -->
      <v-row dense>
        <v-col cols="12" sm="6">
          <p><strong>Casa:</strong> {{ character?.house || "Desconocida" }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p><strong>Actor:</strong> {{ character?.actor || "N/A" }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p><strong>Especie:</strong> {{ character?.species || "N/A" }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p><strong>Patronus:</strong> {{ character?.patronus || "N/A" }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p><strong>Género:</strong> {{ character?.gender || "N/A" }}</p>
        </v-col>
        <v-col cols="12" sm="6">
          <p><strong>Nacimiento:</strong> {{ character?.yearOfBirth || "N/A" }}</p>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.img-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.char-img {
  width: 260px;
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 6px 18px #0000002a;
  object-fit: cover;
}
</style>