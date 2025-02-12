import { defineStore } from "pinia";
import TipoPagamento from "@/types/TipoPagamento/TipoPagamentoType";
import { computed, ref } from "vue";
import TipoPagamentoService from "@/Service/TipoPagamento/TipoPagamentoService";

export const TipoPagamentoStore = defineStore("TipoPagamentoStore", () => {

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });

  const totalElementsLocal = ref(0);
  const totalElements = computed(() => totalElementsLocal);

  const totalPagesLocal = ref(0);
  const totalPages = computed(() => totalPagesLocal)

  const tipoPagamentoList = ref<TipoPagamento[]>([]);
  const tiposPagamento = computed(() => tipoPagamentoList);

  const getAllTiposPagamento = async (page: number, itemsPerPage: number) => {
    try {
      const response = await TipoPagamentoService.findAllTipoPagamento(page, itemsPerPage);

      tipoPagamentoList.value = response.content;

      totalElementsLocal.value = response.totalElements;
      totalPagesLocal.value = response.totalPages;
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
    }
  }

  return {
    getAllTiposPagamento,
    tiposPagamento
  }

})

export default TipoPagamentoStore;
