import LocacaoVestidoService from "@/Service/LoacaoVestido/LocacaoVestidoService";
import Locacao from "@/types/LocacaoVestido/LocacaoVestidoType";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const LocacaoStore = defineStore("LocacaoStore", () => {

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });

  const totalElementsLocal = ref(0);
  const totalElements = computed(() => totalElementsLocal)

  const totalPagesLocal = ref(0);
  const totalPages = computed(() => totalPagesLocal)

  const locacaoList = ref<Locacao[]>([]);
  const locacoes = computed(() => locacaoList);

  const getLocacaoes = async (page: number, itemsPerPage: number) => {
    try {
      const response = await LocacaoVestidoService.findAllLocacoes(page, itemsPerPage)

      locacaoList.value = response.content;
      totalElementsLocal.value = response.totalElements;
      totalPagesLocal.value = response.totalPages
    } catch (error) {
      console.error("Erro ao buscar Locações: ", error)
    }
  }

  return {
    getLocacaoes,
    totalElements,
    totalPages,
    locacoes
  }

})

export default LocacaoStore;
