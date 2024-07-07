import { defineStore } from "pinia";
import Cliente from '@/types/ClienteType';
import { ref } from "vue";
import ClienteService from '@/Service/ClienteService';

export const ClienteStore = defineStore("ClienteStore", () => {

  const clienteList = ref<Cliente[]>([]);

  const cliente = ref<Cliente>({
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
    cliente.value = clientePar;
  }

  return {
    GetClientes,
    clienteList,
    SetCliente,
    cliente,
    clienteClear,
  };

});

export default ClienteStore;
