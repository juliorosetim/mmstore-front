import LocacaoVestidoService from "@/Service/LoacaoVestido/LocacaoVestidoService";
import Cliente from "@/types/ClienteType";
import Locacao from "@/types/LocacaoVestido/LocacaoVestidoType";
import PagamentoLocacao from "@/types/Pagamento";
import TipoPagamento from "@/types/TipoPagamento/TipoPagamentoType";
import Vestido from "@/types/VestidoType";
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

  const vestidosList = ref<Vestido[]>(new Array<Vestido>());
  const vestidosLocacao = computed(() => vestidosList);

  // const locacaoLocal = ref<Locacao>();
  // const locacao = computed(() => locacaoLocal);

  const pagamentoList = ref<PagamentoLocacao[]>([])
  const pagamentos = computed(() => pagamentoList)

  const locacao = ref<Locacao>({
    idLocacao: null,
    dtRetirada: '',
    dtDevolucao: '',
    dtEvento: '',
    vlrAluguel: 0,
    observacao: '',
    cliente: { idCliente: 0, nmCliente: '' },
    pagamentosLocacao: [],
    locacoesVestido: [],
  });

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

  const getLocacaoById = async (idLocacao: number) => {
    try {
      const response = await LocacaoVestidoService.findAllLocacaoById(idLocacao);

      if (response.content) {
        locacao.value = response.content;
      } else {
        console.error("Response content is empty");
      }
    } catch (error) {
      console.error("Erro ao buscar Locações: ", error);
    }
  };

  function getdadosLocacao() {
    return locacao.value
  }

  function adicionarVestido(vestido: Vestido) {
    locacao.value.locacoesVestido.push({
      idLocacaoVestido: 0, // temporário, deve vir do backend
      idLocacao: 0,
      vestido: vestido
    });
  }

  function removerVestido(nuVestido: string) {

    const locacaoEncontrada = locacao.value.locacoesVestido
      .filter(item => item.vestido.nuVestido == nuVestido);

    if (locacaoEncontrada.length > 0 && locacaoEncontrada[0].idLocacaoVestido) {
      const idLocacaoVestido = locacaoEncontrada[0].idLocacaoVestido;

      LocacaoVestidoService.deleteVestidoByLocacaoVestidoId(idLocacaoVestido)

      locacao.value.locacoesVestido = locacao.value.locacoesVestido
        .filter(item => item.vestido.nuVestido !== nuVestido);
    } else {
      locacao.value.locacoesVestido = locacao.value.locacoesVestido
        .filter(item => item.vestido.nuVestido !== nuVestido);
    }
  }

  function adicionarCliente(cliente: Cliente) {
    locacao.value.cliente = {
      idCliente: cliente.idCliente,
      nmCliente: cliente.nmCliente
    }
  }

  function removerPagamento(idPagamento: number, index: number) {
    if (idPagamento) {
      LocacaoVestidoService.deletePagamentoLocacaoById(idPagamento)

      pagamentoList.value.splice(index, 1);
      locacao.value.pagamentosLocacao = pagamentoList.value;
    } else {
      pagamentoList.value.splice(index, 1);
      locacao.value.pagamentosLocacao = pagamentoList.value;
    }
  }

  function resetLocacao() {
    locacao.value = {
      idLocacao: null,
      dtRetirada: '',
      dtDevolucao: '',
      dtEvento: '',
      vlrAluguel: 0,
      observacao: '',
      cliente: { idCliente: 0, nmCliente: '' },
      pagamentosLocacao: [],
      locacoesVestido: [],
    };
  }

  async function salvarLocacao() {
    try {
      const response = await LocacaoVestidoService.salvarLocacao(locacao.value)

      return response.content;
    } catch (error) {
      console.log(`Erro ao salvar locação ${error}`)
    }
  }

  return {
    getLocacaoes,
    getLocacaoById,
    totalElements,
    totalPages,
    locacoes,
    vestidosLocacao,
    locacao,
    adicionarVestido,
    resetLocacao,
    removerVestido,
    adicionarCliente,
    removerPagamento,
    getdadosLocacao,
    pagamentos,
    salvarLocacao
  }

})

export default LocacaoStore;
