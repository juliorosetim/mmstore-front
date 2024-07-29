import {defineStore} from "pinia"
import { computed, ref } from "vue";
import Vestido from "@/types/VestidoType";
import VestidoService from "@/Service/VestidoService"


export const VestidoStore = defineStore("VestidoStore" , () => {

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });


  // const vestidoLocal = ref<Vestido>({

  // })

  const totalElementsLocal = ref(0);
  const totalElements = computed(() => totalElementsLocal);


  const totalPagesLocal = ref(0);
  const totalPages = computed(() => totalElementsLocal);

  const vestidos = ref(() => vestidoList);
  const vestidoList = ref<Vestido[]>([]);


  const GetAllVestidos = async (page: number, itemsPerPage: number) => {
    try {
        const response = await VestidoService.getAllVestidos(page, itemsPerPage);

        vestidoList.value = response.content;
        totalElementsLocal.value = response.totalElements;
        totalPagesLocal.value = response.totalPages;
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
    }
  };

  return {
    vestidos,
    GetAllVestidos,
    totalElements,
    totalPages
  }


});

