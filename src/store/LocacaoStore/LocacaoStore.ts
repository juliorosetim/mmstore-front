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

  const locacao = ref<Locacao>({
    idLocacao: null,
    dtRetirada: '',
    dtDevolucao: '',
    dtEvento: '',
    vlrAluguel: 0,
    observacao: '',
    cliente: { idCliente: 0, nmCliente: '' },
    locacaoVestido: [],
    pagamentosLocacao: []
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

  function getdadosLocacao() {
    return locacao.value
  }

  function adicionarVestido(vestido: Vestido) {
    locacao.value.locacaoVestido.push({
      idLocacaoVestido: Date.now(), // temporário, deve vir do backend
      vestido: vestido
    });
  }

  function removerVestido(nuVestido: string) {
    locacao.value.locacaoVestido = locacao.value.locacaoVestido
      .filter(item => item.vestido.nuVestido !== nuVestido);
  }

  function adicionarCliente(cliente: Cliente) {
    locacao.value.cliente = {
      idCliente: cliente.idCliente,
      nmCliente: cliente.nmCliente
    }
  }

  function adicionarTipoPagamento(tipoPagamento: TipoPagamento) {
    locacao.value.pagamentosLocacao.push({
      idPagamento: 0,
      tipoPagamento: { idTipoPagamento: tipoPagamento.idTipoPagamento }
    })
  }

  function adicionarPagamento(pagamento: PagamentoLocacao) {
    locacao.value.pagamentosLocacao.push({
      idPagamento: pagamento.idPagamento,
      vlrPagamento: pagamento.vlrPagamento,
      dtPagamento: pagamento.dtPagamento,
      tipoPagamento: { ...pagamento.tipoPagamento }
    })
  }

  function resetLocacao() {
    locacao.value = {
      idLocacao: null,
      dtRetirada: '',
      dtDevolucao: '',
      dtEvento: '',
      vlrAluguel: 0,
      observacao: '',
      cliente: {
        idCliente: 0,
        nmCliente: ''
      },
      locacaoVestido: [],
      pagamentosLocacao: []
    };
  }

  return {
    getLocacaoes,
    totalElements,
    totalPages,
    locacoes,
    vestidosLocacao,
    locacao,
    adicionarVestido,
    resetLocacao,
    removerVestido,
    adicionarCliente,
    adicionarTipoPagamento,
    adicionarPagamento,
    getdadosLocacao
  }

})

export default LocacaoStore;
