import Vestido from '@/types/VestidoType';

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
    idPagamento: number;
    vlrPagamento: number;
    dtPagamento: Date;
    tipoPagamento: { idTipoPagamento: number }
  }]
};

export default Locacao;
