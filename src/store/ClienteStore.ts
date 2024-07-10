import { defineStore } from "pinia";
import Cliente from '@/types/ClienteType';
import { computed, ref } from "vue";
import ClienteService from '@/Service/ClienteService';

export const ClienteStore = defineStore("ClienteStore", () => {

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });

  const totalElementsLocal = ref(0);

  const totalElements = computed(() => totalElementsLocal)

  const totalPagesLocal = ref(0);

  const totalPages = computed(() => totalPagesLocal)


  const clienteList = ref<Cliente[]>([]);

  const clientes = computed(() => clienteList);

  // const clienteEdit = computed(() => cliente);

  const cliente = computed(() => clienteLocal);

  const clienteLocal = ref<Cliente> ({
    idCliente: null,
    nmCliente: '',
    numero: '',
    bairro: '',
    cpfCnpj: '',
    emprego: '',
    celular: '',
    contato: '',
    nmContato: '',
    rua: '',
    cep: '',
    complementoEnd: '',
    cidade: '',
  })

  const clienteClear = ref<Cliente>({
    idCliente: null,
    nmCliente: '',
    numero: '',
    bairro: '',
    cpfCnpj: '',
    emprego: '',
    celular: '',
    contato: '',
    nmContato: '',
    rua: '',
    cep: '',
    complementoEnd: '',
    cidade: '',
  })


  const GetClientes = async (page: number, itemsPerPage: number) => {
    try {
        const response = await ClienteService.findAllClientes(page, itemsPerPage);

        clienteList.value = response.content;
        totalElementsLocal.value = response.totalElements;
        totalPagesLocal.value = response.totalPages;
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
    }
  };

  const SetCliente = (clientePar: Cliente) => {
    clienteLocal.value = clientePar;
  }

  const GetClientesByNmCliente = async (nmCliente:string, page: number, itemsPerPage: number) => {
    try {
        const response = await ClienteService.findByNmCliente(nmCliente, pagination.value.page,
                                                              pagination.value.itemsPerPage );
        clienteList.value = response;
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
    }
  };

  const deleteCliente = async (idCliente: number) => {
    try{
      await ClienteService.deleteCliente(idCliente);

      const response = await ClienteService.findAllClientes(1, 10);
      clienteList.value = response;

    } catch(error) {
      console.log('Erro ao excluir Cliente.')
    }
  }

  const clearCliente = () => {
    clienteLocal.value = {
      idCliente: null,
      nmCliente: '',
      numero: '',
      bairro: '',
      cpfCnpj: '',
      emprego: '',
      celular: '',
      contato: '',
      nmContato: '',
      rua: '',
      cep: '',
      complementoEnd: '',
      cidade: '',
    };
  }

  return {
    GetClientes,
    SetCliente,
    cliente,
    clientes,
    GetClientesByNmCliente,
    clearCliente,
    deleteCliente,
    totalElements,
    totalPages,
  };

});

export default ClienteStore;
