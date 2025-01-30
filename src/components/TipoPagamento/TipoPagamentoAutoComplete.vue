<template>
  <div class="relative">
    <v-text-field
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      @click="handleSearch"
      @focus="showResults = true"
      @blur="handleBlur"
      label="Buscar Tipo de Pagamento..."
    />

    <div
      v-if="showResults && filteredTipoPagamento.length > 0"
      class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <div
        v-for="tipoPagamento in filteredTipoPagamento"
        :key="tipoPagamento.idTipoPagamento"
        @mousedown="selectTipoPagamento(tipoPagamento)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <div class="font-medium">{{ tipoPagamento.deTipoPagamento }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import TipoPagamento from '@/types/TipoPagamento/TipoPagamentoType';
import TipoPagamentoStore from '@/store/TipoPagamento/TipoPagamentoStore';


const props = defineProps<{
  modelValue?: TipoPagamento
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', tipoPagamento: TipoPagamento): void
  (e: 'selected', tipoPagamento: TipoPagamento): void
}>()

const tipoPagamentoStore = TipoPagamentoStore()
const searchQuery = ref('')
const showResults = ref(false)
const filteredTipoPagamento = ref<TipoPagamento[]>([])

// Debounce function
const debounce = (fn: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Busca Tipo pagamento quando o usuário digita
const handleSearch = debounce(async () => {
  //if (searchQuery.value.length >= 2) {
    await tipoPagamentoStore.getAllTiposPagamento(
      1, // página inicial
      10 // quantidade por página
    )
    filteredTipoPagamento.value = tipoPagamentoStore.tiposPagamento.value
  //} else {
  //  filteredTipoPagamento.value = []
  //}
}, 300)

// Seleciona um tipo de pagamento da lista
const selectTipoPagamento = (tipoPagamento: TipoPagamento) => {
  searchQuery.value = tipoPagamento.deTipoPagamento
  emit('update:modelValue', tipoPagamento)
  emit('selected', tipoPagamento)
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
      searchQuery.value = newValue.deTipoPagamento
    } else {
      searchQuery.value = ''
    }
  }
)

// Carrega dados iniciais se necessário
onMounted(async () => {
  if (props.modelValue) {
    searchQuery.value = props.modelValue.deTipoPagamento
  }
})
</script>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TipoPagamentoAutocomplete'
  })
</script>
