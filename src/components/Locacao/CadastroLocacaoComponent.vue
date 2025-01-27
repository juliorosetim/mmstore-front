<template>
  <v-container>

    <!-- Campo Cliente -->
    <ClienteAutoComplete
      v-model="clienteSelecionado"
      @selected="handleClienteSelected"
    />


  <!-- Campos de Data -->
    <v-row>
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
          v-model="dataEvento"
          label="Data Evento"
          type="date"
          placeholder="dd/mm/aaaa"
          >
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Filtro para adicionar vestido -->
    <v-row>
      <v-col>
        <VestidoAutoComplete
          v-model="vestidoSelecionado"
          @selected="handleVestidoSelected"
        />
      </v-col>
      <v-col>
        <v-btn
          prepend-icon="mdi-plus" @click="adicionarVestido"
        />
      </v-col>
    </v-row>
    <!-- Grid de Vestidos -->
    <v-data-table
      :items="vestidosLocacao"
      :headers="headersVestidos">
      <template v-slot:item.imgVestidos="{ item }">
        <v-img
          :src="getImageUrl(item.imgVestidos[0].imgVestido)"
          max-height="100"
          max-width="100"
          contain
        />
      </template>
    </v-data-table>

    <!-- Campo Valor da Locação -->
    <v-text-field
      v-model="valorLocacao"
      label="Valor da Locação">
    </v-text-field>

    <v-row>
      <v-col>
        <v-text-field
          v-model="valor"
          label="Valor">
        </v-text-field>
      </v-col>
      <v-col>
        <!-- Campo Dinheiro -->
        <v-combobox
          v-model="dinheiro"
          :items="opcoesDinheiro"
          label="Dinheiro"
          clearable
        ></v-combobox>
      </v-col>
      <v-col>
        <!-- Campo Data do Pagamento -->
        <v-text-field
          v-model="dataPagamento"
          label="Data do Pagamento">
        </v-text-field>
      </v-col>
      <v-col>
        <v-btn
          prepend-icon="mdi-plus"
          @click="adicionarPagamento"/>
      </v-col>
    </v-row>

    <!-- Grid de Pagamentos -->
    <v-data-table :items="pagamentos" :headers="headersPagamentos"></v-data-table>

    <v-row>
      <v-btn
        @click="salvarLocacao"
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

  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted } from 'vue';
import router from '@/routes/index';
import axios from 'axios'
import ClienteStore from '@/store/ClienteStore';
import ClienteAutoComplete from '@/components/Cliente/ClienteAutoComplete.vue';
import VestidoAutoComplete from '../Vestido/VestidoAutoComplete.vue';
import type Cliente from '@/types/ClienteType'
import type Vestido from '@/types/VestidoType';
import VestidoStore from '@/store/VestidoStore';
import LocacaoStore from '@/store/LocacaoStore/LocacaoStore';
import Locacao from '@/types/LocacaoVestido/LocacaoVestidoType';

  const clienteSelecionado = ref<Cliente | undefined>()
  const vestidoSelecionado = ref<Vestido | undefined>()

  const vestidoStore = VestidoStore();
  const { vestido, ClearVestido } = vestidoStore;

  const locacaoStore = LocacaoStore();
  const {vestidosLocacao, locacao} = locacaoStore;

  const cliente = ref(null);
  const dataRetirada = ref(new Date().toISOString().substr(0,10));
  const dataDevolucao = ref(new Date().toISOString().substr(0,10));
  const dataEvento = ref(new Date().toISOString().substr(0,10));
  const vestidosSelecionados = ref([]);
  const dataPagamento = ref('');
  const valorLocacao = ref('');
  const valor = ref('');
  const dinheiro = ref(null);
  const opcoesDinheiro = ref(['Dinheiro', 'Cartão']);
  const pagamentos = ref([]);
  const isLoading = ref(false)

  const headersVestidos = [
    { title: 'Foto', key: 'imgVestidos' },
    { title: 'Vestido', key: 'nuVestido' },
    { title: 'Valor', key: 'vlrVestido' },
  ];

  const headersPagamentos = [
    { title: 'Data', key: 'Data Pgto' },
    { title: 'Valor', key: 'Valor' },
    { title: 'Tipo', key: 'tipo' },
  ];


  const getImageUrl = (byteArray: string) => {
  if (!byteArray) return '';

  // Convert base64 string to actual image
  // If the data is already in base64 format
  if (byteArray.startsWith('data:image')) {
    return byteArray;
  }

  // If the data is a byte array, convert it to base64
  try {
    return `data:image/jpeg;base64,${byteArray}`;
  } catch (error) {
    console.error('Error converting image:', error);
    return '';
  }
};

  // onMounted( async () => {
  //   await fetchClientes();
  // });

  const adicionarVestido = () => {
    if(vestidoSelecionado.value){
      vestidosLocacao.value.push(vestidoSelecionado.value)
       vestidoSelecionado.value = undefined;
     }
  };

  const adicionarPagamento = () => {
    if (dataPagamento.value && valor.value && dinheiro.value) {
      pagamentos.value.push({
        data: dataPagamento.value,
        valor: valor.value,
        tipo: dinheiro.value,
      });
      dataPagamento.value = '';
      valor.value = '';
      dinheiro.value = null;
    }
  };

  const irParaConsulta = () => {
    //clearCliente();
    router.push({ name: 'ConsultaLocacao' });
  }

  const handleClienteSelected = (cliente: Cliente) => {

    if (cliente){
      const locacaoLocal: Locacao = {
        cliente: {
          idCliente: cliente.idCliente!,
          nmCliente: cliente.nmCliente
        }
      }

      locacao.value = locacaoLocal;
    }
  }

  const handleVestidoSelected = (vestidoPar: Vestido) => {
    if (vestidoPar){

      vestidoSelecionado.value = vestidoPar;

      // const LocacaoLocal: Locacao = {
      //   ...locacao.value,  // Use locacao.value aqui
      //   locacaoVestido: [
      //     ...(locacao.value.locacaoVestido || []),
      //     {
      //       vestido: vestidoPar!
      //     }]
      // }

      // locacao.value = LocacaoLocal;
    }
  }

  // const removeVestido = (idVestido: number) => {
  //   const LocacaoLocal: Locacao = {
  //     ...locacao.value,
  //     locacaoVestido: locacao.value.locacaoVestido.filter(
  //       item => item.vestido !== idVestido
  //     )
  //   }

  //   locacao.value = LocacaoLocal;
  // }

  const salvarLocacao = () => {
    console.log('Salvando....')

      if (vestidoSelecionado.value){
        const LocacaoLocal: Locacao = {
          ...locacao.value,
          locacaoVestido: [
            ...(locacao.value.locacaoVestido || []),
            {
              vestido: vestidoSelecionado!
            }]
        }

        locacao.value = LocacaoLocal;
      }

      console.log('Salvo com sucesso....')
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
