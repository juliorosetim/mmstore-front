<template>
  <div class="relative">
    <v-text-field
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      @focus="showResults = true"
      @blur="handleBlur"
      label="Buscar vestido..."
    />

    <div
      v-if="showResults && filteredVestidos.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="vestido in filteredVestidos"
        :key="vestido.idVestido"
        @mousedown="selectVestido(vestido)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <div class="font-medium">{{ vestido.nuVestido }}</div>
        <div class="text-sm text-gray-600">{{ vestido.cor }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { VestidoStore } from '@/store/VestidoStore'
import type Vestido from '@/types/VestidoType'

const props = defineProps<{
  modelValue?: Vestido
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', vestido: Vestido): void
  (e: 'selected', vestido: Vestido): void
}>()

const vestidoStore = VestidoStore()
const searchQuery = ref('')
const showResults = ref(false)
const filteredVestidos = ref<Vestido[]>([])

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Busca vestidos quando o usuário digita
const handleSearch = debounce(async () => {
  if (searchQuery.value.length >= 2) {
    await vestidoStore.GetVestidoByNuVestido(
      searchQuery.value,
      1, // página inicial
      10 // quantidade por página
    )
    filteredVestidos.value = vestidoStore.vestidos.value
  } else {
    filteredVestidos.value = []
  }
}, 300)

// Seleciona um vestido da lista
const selectVestido = (vestido: Vestido) => {
  searchQuery.value = vestido.nuVestido
  emit('update:modelValue', vestido)
  emit('selected', vestido)
  showResults.value = false
}

// Fecha a lista quando o input perde o foco
const handleBlur = () => {
  // Pequeno delay para permitir o clique no item
  setTimeout(() => {
    showResults.value = false
  }, 200)
}

// Atualiza o input quando o v-model muda externamente
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      searchQuery.value = newValue.nuVestido
    } else {
      searchQuery.value = ''
    }
  }
)

// Carrega dados iniciais se necessário
onMounted(async () => {
  if (props.modelValue) {
    searchQuery.value = props.modelValue.nuVestido
  }
})
</script>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VestidoAutocomplete'
  })
</script>
