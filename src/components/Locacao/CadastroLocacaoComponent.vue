<template>
  <v-container>

    <ClienteAutoComplete
      v-model="clienteSelecionado"
      @selected="handleClienteSelected"
    />

    <v-row>
      <v-col>
        <v-text-field
          v-model="dataEvento"
          label="Data Evento"
          type="date"
          placeholder="dd/mm/aaaa"
          >
        </v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          v-model="dataRetirada"
          label="Data Retirada"
          type="date"
          placeholder="dd/mm/aaaa"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-text-field
          v-model="dataDevolucao"
          label="Data Devolução"
          type="date"
          placeholder="dd/mm/aaaa"
          >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="11">
        <VestidoAutoComplete
          v-model="vestidoSelecionado"
        />

      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn
          size="54"
          prepend-icon="mdi-plus"
          @click="adicionarVestidoLocal"
        />
      </v-col>
    </v-row>
    <!-- Grid de Vestidos -->
    <v-data-table
      :items="locacao.locacoesVestido"
      :headers="headersVestidos">
      <template v-slot:item.imgVestidos="{ item }">
        <v-img
          :src="getImageUrl(item.vestido?.imgVestidos?.[0]?.imgVestido)"
          max-height="100"
          max-width="100"
          contain
        />
      </template>

      <template v-slot:item.nuVestido="{ item }">
          {{ item.vestido.nuVestido }}
      </template>

      <template v-slot:item.vlrVestido="{ item }">
          {{ formatCurrency(item.vestido.vlrVestido) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          color="error"
          icon
          variant="text"
          size="small"
          @click="locacaoStore.removerVestido(item.vestido.nuVestido)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Campo Valor da Locação -->
    <v-text-field
      v-model="valorLocacao"
      label="Valor da Locação"
      v-currency-input="options"
      prefix="R$"
      >
    </v-text-field>

    <VCurrencyField
      label="Valor da Locação 1"
      v-model="valorLocacao"
      v-currency-input="options"
      >
    </VCurrencyField>

    <v-row>
      <v-col>
        <v-text-field
          v-model="valor"
          label="Valor do Pagamento">
        </v-text-field>
      </v-col>
      <v-col>
          <TipoPagamentoAutoComplete
            v-model="tipoPagamentoSelecionado"
          />
      </v-col>

      <v-col class="d-flex justify-space-between">
        <v-text-field
          v-model="dataPagamento"
          label="Data do Pagamento"
          type="date"
          placeholder="dd/mm/aaaa"
          class="mr-1"
          >
        </v-text-field>

        <v-btn
          size="54"
          prepend-icon="mdi-plus"
          @click="adicionarPagamento"/>
      </v-col>
    </v-row>

    <!-- Grid de Pagamentos -->
    <v-data-table :items="pagamentos" :headers="headersPagamentos">
      <template v-slot:item.dtPagamento="{ item }">
          {{ item.dtPagamento?.toLocaleDateString("pt-BR") }}
      </template>

      <template v-slot:item.vlrPagamento="{ item }">
          {{ formatCurrency(item.vlrPagamento) }}
      </template>

      <template v-slot:item.tipoPagamento="{ item }">
          {{ item.tipoPagamento?.deTipoPagamento }}
      </template>

      <template v-slot:item.actions="{ item, index }">
        <v-btn
          color="error"
          icon
          variant="text"
          size="small"
          @click="locacaoStore.removerPagamento(item.idPagamento, index)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>

    </v-data-table>

    <v-row>
      <v-btn
        @click="salvarLocacaoLocal"
        prepend-icon="mdi-plus"
        >
          Salvar
      </v-btn>

      <v-btn
        @click="irParaConsulta"
        prepend-icon="mdi-arrow-left"
        >
          Voltar
      </v-btn>
    </v-row>

    <v-snackbar
      rounded="pill"
      :timeout="2000"
      v-model="snackBar.show"
      :color="snackBar.color"
      close-on-content-click="true"
      >
        {{ snackBar.msg }}

        <template v-slot:actions>
          <v-btn variant="text">
            fechar
          </v-btn>
        </template>

    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue';
import router from '@/routes/index';
import ClienteAutoComplete from '@/components/Cliente/ClienteAutoComplete.vue';
import VestidoAutoComplete from '../Vestido/VestidoAutoComplete.vue';
import type Cliente from '@/types/ClienteType'
import type Vestido from '@/types/VestidoType';
import VestidoStore from '@/store/VestidoStore';
import LocacaoStore from '@/store/LocacaoStore/LocacaoStore';
import TipoPagamentoAutoComplete from '../TipoPagamento/TipoPagamentoAutoComplete.vue';
import TipoPagamento from '@/types/TipoPagamento/TipoPagamentoType';
import PagamentoLocacao from '@/types/Pagamento';
import { format } from "date-fns";
import { useCurrencyInput } from 'vue-currency-input'

const snackBar = ref({
    show: false,
    msg: "",
    color: "",
    timeout: "'2000'",
    closeOnClick: true
  });


  const options = {
    "currency": "BRL",
    "currencyDisplay": "symbol",
    "precision": 2,
    "hideCurrencySymbolOnFocus": true,
    "hideGroupingSeparatorOnFocus": true,
    "hideNegligibleDecimalDigitsOnFocus": true,
    "autoDecimalDigits": false,
    "useGrouping": true,
    "accountingSign": false
  }

  // Registrar a diretiva
  const { vCurrencyInput } = useCurrencyInput(options)

  const clienteSelecionado = ref<Cliente | undefined>()
  const vestidoSelecionado = ref<Vestido | null>(null)

  const tipoPagamentoSelecionado = ref<TipoPagamento | undefined>()

  const vestidoStore = VestidoStore();
  const { vestido, ClearVestido } = vestidoStore;

  const locacaoStore = LocacaoStore();
  const {vestidosLocacao, locacao, adicionarVestido, adicionarCliente,
         adicionarTipoPagamento, getdadosLocacao,
        pagamentos, removerPagamento, salvarLocacao, getLocacaoById} = locacaoStore;

  const cliente = ref(null);
  const dataRetirada = ref(new Date().toISOString().substr(0,10));
  const dataDevolucao = ref(new Date().toISOString().substr(0,10));
  const dataEvento = ref(new Date().toISOString().substr(0,10));
  const vestidosSelecionados = ref([]);
  const dataPagamento = ref(new Date().toISOString().substr(0,10));
  const valorLocacao = ref(0);
  const valor = ref(0);

  const headersVestidos = [
    { title: 'Foto', key: 'imgVestidos' },
    { title: 'Vestido', key: 'nuVestido' },
    { title: 'Valor', key: 'vlrVestido' },
    { title: '', key: 'actions' },
  ];

  const headersPagamentos = [
    { title: 'Data', key: 'dtPagamento' },
    { title: 'Valor', key: 'vlrPagamento' },
    { title: 'Tipo', key: 'tipoPagamento' },
    { title: '', key: 'actions' },
  ];

  onMounted( () => {
    clienteSelecionado.value = {
      idCliente: locacao.cliente.idCliente,
      nmCliente: locacao.cliente.nmCliente,
      cpfCnpj: '',
      emprego: '',
      celular: '',
      contato: '',
      rua: '',
      bairro: '',
      cep: '',
      numero: '',
      cidade: '',
      nmContato: '',
      complementoEnd: '',
      flAtivo: '',
    }

    dataEvento.value = locacao.dtEvento;
    dataRetirada.value = locacao.dtRetirada;
    dataDevolucao.value = locacao.dtDevolucao;

    pagamentos.value = []

    locacao.pagamentosLocacao.forEach(pgto => {
      pgto.dtPagamento = new Date(pgto.dtPagamento);
      pagamentos.value.push(pgto);
    });

    valorLocacao.value = locacao.vlrAluguel;
  })


  const getImageUrl = (byteArray: string) => {
    if (!byteArray) return '';

    if (byteArray.startsWith('data:image')) {
      return byteArray;
    }

    try {
      return `data:image/jpeg;base64,${byteArray}`;
    } catch (error) {
      console.error('Error converting image:', error);
      return '';
    }
  };

  const irParaConsulta = () => {
    router.push({ name: 'ConsultaLocacao' });
  }

  const handleClienteSelected = (cliente: Cliente) => {
    if (cliente){
      adicionarCliente(cliente)
    }
  }

  function adicionarVestidoLocal() {
    if (vestidoSelecionado.value) {
      console.log('vestidoSelecionado.value', vestidoSelecionado.value.nuVestido)

      locacao.locacoesVestido.forEach( item => {
        console.log('locacao.locacoesVestido', item.vestido.nuVestido)
        console.log('vestido inserido 1 ', vestidoSelecionado.value.nuVestido == item.vestido.nuVestido )
      })

      const vestidoInserido: Vestido[] = locacao.locacoesVestido
        .filter(item => item.vestido.nuVestido == vestidoSelecionado.value!.nuVestido);

      if (vestidoInserido.length > 0) {
        snackBar.value.msg = 'Vestido já foi adicionado a locação.'
        snackBar.value.color = "#d11e48";
        snackBar.value.show = true;
        return
      }

      adicionarVestido(vestidoSelecionado.value);

      const totalLocacao = locacao.locacoesVestido.reduce((acumulador, item) => {
        return acumulador + item.vestido.vlrVestido
      }, 0)

      valorLocacao.value = totalLocacao;


      vestidoSelecionado.value = null;
    }
  }

  const adicionarPagamento = () => {
    const pagamentoLocacao = ref<PagamentoLocacao>()

    pagamentoLocacao.value = {
      vlrPagamento: valor.value,
      dtPagamento: new Date(dataPagamento.value),
      tipoPagamento: { ...tipoPagamentoSelecionado.value }
    }

    pagamentos.value.push(pagamentoLocacao.value)
   };

  const salvarLocacaoLocal = () => {

    if (!validaValores()) {
      snackBar.value.msg = 'Valor recebido é menor que o valor da locação.'
      snackBar.value.color = "#d11e48";
      snackBar.value.show = true;
    }

    locacao.dtEvento = dataEvento.value;
    locacao.dtRetirada = dataRetirada.value;
    locacao.dtDevolucao = dataDevolucao.value;
    locacao.pagamentosLocacao = pagamentos.value
    locacao.vlrAluguel = valorLocacao.value;


    locacao.locacoesVestido = locacao.locacoesVestido.map(lv => ({
      ...lv, // Mantém os outros dados do locacaoVestido
      vestido: {
        idVestido: lv.vestido.idVestido,
        nuVestido: lv.vestido.nuVestido,
        vlrVestido: lv.vestido.vlrVestido,
        flSituacao: lv.vestido.flSituacao,
        cor: lv.vestido.cor
      }
    }));


    //console.log(`locacao manupulada ${JSON.stringify(locacao)}`)

    salvarLocacao();

    // locacao.locacaoVestido.forEach(l => {
    //   console.log(`Vestido.... ${ JSON.stringify(l.vestido.nuVestido)}`)
    // })

    // console.log(`Cliente.... ${ JSON.stringify(locacao.cliente)}`)

    // console.log(`DtEvento.... ${ JSON.stringify(locacao.dtEvento)}`)
    // console.log(`dtRetirada.... ${ JSON.stringify(locacao.dtRetirada)}`)
    // console.log(`dtDevolucao.... ${ JSON.stringify(locacao.dtDevolucao)}`)
    // console.log(`pagamento.... ${ JSON.stringify(pagamentos.value)}`)

    // console.log(`objeto completo para salvar.... ${ JSON.stringify(locacao)}`)
  }

  function validaValores(): boolean {
    const totalLocacao = locacao.locacoesVestido.reduce((acumulador, item) => {
        return acumulador + item.vestido.vlrVestido
      }, 0)

      const totalPagamento = locacao.pagamentosLocacao.reduce((acumulador, item) => {
        return acumulador + item.vlrPagamento
      }, 0)

      if (totalPagamento < totalLocacao) {
        return false;
      }

      return true
  }

  const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

 // const handleVestidoSelected = (vestidoPar: Vestido) => {
  //   if (vestidoPar){
  //     vestidoSelecionado.value = vestidoPar;

  //     const LocacaoLocal: Locacao = {
  //       ...locacao,
  //       locacaoVestido: [{
  //         idLocacaoVestido: 0,
  //         vestido: vestidoPar.idVestido!
  //       }]
  //     }

  //     locacao.value = LocacaoLocal;

  //     //console.log('Vestido selecionado ' +  JSON.stringify(vestidoSelecionado.value))

  //     vestidoSelecionado.value = undefined;
  //   }
  // }

  // const fetchClientes = async () => {
  //   await GetClientes(pagination.value.page, pagination.value.itemsPerPage);
  // }

</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
