import Vestido from '@/types/VestidoType';
import TipoPagamento from '../TipoPagamento/TipoPagamentoType';

interface Locacao {
  idLocacao: number | null;
  dtRetirada: string;
  dtDevolucao: string;
  dtEvento: string;
  vlrAluguel: number;
  observacao: string;
  cliente: { idCliente: number; nmCliente: string };
  locacaoVestido: [{
    idLocacaoVestido: number;
    vestido: Vestido
  }];
  pagamentosLocacao: [{
    idPagamento?: number;
    vlrPagamento?: number;
    dtPagamento?: Date;
    //tipoPagamento?: { idTipoPagamento: number }
    tipoPagamento?: TipoPagamento
  }]
};

export default Locacao;
