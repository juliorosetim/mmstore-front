import Vestido from '@/types/VestidoType';
import TipoPagamento from '../TipoPagamento/TipoPagamentoType';
import PagamentoLocacao from '../Pagamento';

interface Locacao {
  idLocacao: number | null;
  dtRetirada: string;
  dtDevolucao: string;
  dtEvento: string;
  vlrAluguel: number;
  observacao: string;
  cliente: { idCliente: number; nmCliente: string };
  locacoesVestido: [{
    idLocacaoVestido: number;
    idLocacao: number;
    vestido: Vestido;
  }];
  pagamentosLocacao: PagamentoLocacao[]
};

export default Locacao;
