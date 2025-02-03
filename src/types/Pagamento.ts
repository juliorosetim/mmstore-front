import TipoPagamento from "./TipoPagamento/TipoPagamentoType"

interface PagamentoLocacao {
  idPagamento?: number
  vlrPagamento?: number
  dtPagamento?: Date
  tipoPagamento?: TipoPagamento
}

export default PagamentoLocacao
