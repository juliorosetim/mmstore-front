import { defineStore } from "pinia";
import Cliente from '@/types/ClienteType';
import { computed, ref } from "vue";
import ClienteService from '@/Service/ClienteService';

export const ClienteStore = defineStore("ClienteStore", () => {

  const clienteList = ref<Cliente[]>([]);

  const clientes = computed(() => clienteList);

  // const clienteEdit = computed(() => cliente);

  const cliente = computed(() => clienteLocal);

  const clienteLocal = ref<Cliente> ({
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
    idCLiente: undefined,
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

  const GetClientes = async () => {
    try {
        const response = await ClienteService.findAllClientes();
        clienteList.value = response;
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
    }
  };

  const SetCliente = (clientePar: Cliente) => {
    clienteLocal.value = clientePar;
  }

  const GetClientesByNmCliente = async (nmCliente:string) => {
    try {
        const response = await ClienteService.findByNmCliente(nmCliente);
        clienteList.value = response;
    } catch (error) {
        console.error("Erro ao buscar clientes: ", error);
    }
  };

  const deleteCliente = async (idCliente: number) => {
    try{
      await ClienteService.deleteCliente(idCliente);

      const response = await ClienteService.findAllClientes();
      clienteList.value = response;

    } catch(error) {
      console.log('Erro ao excluir Cliente.')
    }
  }

  const clearCliente = () => {
    clienteLocal.value = clienteClear.value;
  }

  return {
    GetClientes,
    SetCliente,
    cliente,
    clientes,
    GetClientesByNmCliente,
    clearCliente,
  };

});

export default ClienteStore;
