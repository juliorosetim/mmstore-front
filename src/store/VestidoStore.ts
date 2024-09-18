import { defineStore } from "pinia"
import { computed, ref } from "vue";
import Vestido from "@/types/VestidoType";
import VestidoService from "@/Service/VestidoService"


export const VestidoStore = defineStore("VestidoStore", () => {

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });

  const totalElementsLocal = ref(0);
  const totalElements = computed(() => totalElementsLocal);

  const totalPagesLocal = ref(0);
  const totalPages = computed(() => totalElementsLocal);

  const vestidoList = ref<Vestido[]>([]);
  const vestidos = computed(() => vestidoList);

  const vestido = computed(() => vestidoLocal);

  const vestidoLocal = ref<Vestido>({
    idVestido: null,
    flSituacao: '',
    nuVestido: '',
    vlrVestido: 0,
    imgVestido: { idVestido: null, imgVestido: null },
  })


  const GetAllVestidos = async (page: number, itemsPerPage: number) => {
    try {
      const response = await VestidoService.getAllVestidos(page, itemsPerPage);

      vestidoList.value = response.content;
      totalElementsLocal.value = response.totalElements;
      totalPagesLocal.value = response.totalPages;
    } catch (error) {
      console.error("Erro ao buscar vestidos: ", error);
    }
  };

  const GetVestidoById = async (idVestido: number) => {
    try {
      const response = await VestidoService.getVestidoById(idVestido);

      vestidoLocal.value = response.content;

      // totalElementsLocal.value = response.totalElements;
      // totalPagesLocal.value = response.totalPages;
    } catch (error) {
      console.error("Erro ao buscar vestidos: ", error);
    }
  };

  const SetVestido = (vestidoPar: Vestido) => {
    vestidoLocal.value = vestidoPar;
  }

  const ClearVestido = () => {
    vestidoLocal.value = {
      idVestido: null,
      flSituacao: '',
      nuVestido: '',
      vlrVestido: 0,
      imgVestido: { idVestido: null, imgVestido: null },
    }
  }

  const GetVestidoByNuVestido = async (nuVestido: string, page: number, itemsPerPage: number) => {
    try {
      const response = await VestidoService.findByNuVstido(nuVestido, pagination.value.page,
        pagination.value.itemsPerPage);
      vestidoList.value = response;
    } catch (error) {
      console.error("Erro ao buscar vestido: ", error);
    }
  };


  return {
    vestidos,
    vestido,
    GetAllVestidos,
    GetVestidoById,
    SetVestido,
    ClearVestido,
    GetVestidoByNuVestido,
    totalElements,
    totalPages
  }

});

export default VestidoStore;

