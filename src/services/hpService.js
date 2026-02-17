const BASE_URL = import.meta.env.VITE_HP_BASE_URL

export async function getStudents() {
  const res = await fetch(`${BASE_URL}/characters/students`)
  return await res.json()
}

export async function getCharacterById(id) {
  const res = await fetch(`${BASE_URL}/character/${id}`)
  const data = await res.json()
  return data[0]  // la API devuelve array con un elemento
}