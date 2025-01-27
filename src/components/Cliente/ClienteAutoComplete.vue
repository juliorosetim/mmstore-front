<template>
  <div class="relative">
    <v-text-field
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      @focus="showResults = true"
      @blur="handleBlur"
      label="Buscar cliente..."
    />

    <div
      v-if="showResults && filteredClientes.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="cliente in filteredClientes"
        :key="cliente.idCliente"
        @mousedown="selectCliente(cliente)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <div class="font-medium">{{ cliente.nmCliente }}</div>
        <div class="text-sm text-gray-600">{{ cliente.cpfCnpj }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ClienteStore } from '@/store/ClienteStore'
import type Cliente from '@/types/ClienteType'

const props = defineProps<{
  modelValue?: Cliente
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', cliente: Cliente): void
  (e: 'selected', cliente: Cliente): void
}>()

const clienteStore = ClienteStore()
const searchQuery = ref('')
const showResults = ref(false)
const filteredClientes = ref<Cliente[]>([])

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Busca clientes quando o usuário digita
const handleSearch = debounce(async () => {
  if (searchQuery.value.length >= 2) {
    await clienteStore.GetClientesByNmCliente(
      searchQuery.value,
      1, // página inicial
      10 // quantidade por página
    )
    filteredClientes.value = clienteStore.clientes.value
  } else {
    filteredClientes.value = []
  }
}, 300)

// Seleciona um cliente da lista
const selectCliente = (cliente: Cliente) => {
  searchQuery.value = cliente.nmCliente
  emit('update:modelValue', cliente)
  emit('selected', cliente)
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
      searchQuery.value = newValue.nmCliente
    } else {
      searchQuery.value = ''
    }
  }
)

// Carrega dados iniciais se necessário
onMounted(async () => {
  if (props.modelValue) {
    searchQuery.value = props.modelValue.nmCliente
  }
})
</script>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'ClienteAutocomplete'
  })
</script>
