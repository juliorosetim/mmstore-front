<template>
  <v-container>
    <v-card  class="pa-2 mb-2" >
        <v-btn
          prepend-icon="mdi-account-plus"
          @click="irParaNovoCadastro"
        >
          Novo
        </v-btn>
    </v-card>

    <v-card class="mb-2 pa-2">
      <v-row class="pa-2">
        <v-text-field
            :loading="loading"
            append-inner-icon="mdi-magnify"
            label="Nome/Cpf/Cnpj"
            hide-details
            @click:append-inner="loadItems"
            v-model="nomePesquisa"
            maxlength="100"
            @keyup.enter="loadItems"
          />
      </v-row>

      <v-row class="mt-2" >
        <v-col cols="12">
        <VDataTableServer class="mt-2"
              v-model:items-per-page="pagination.itemsPerPage"
              :headers="headers"
              :items="locacoes"
              :items-length="totalElements"
              no-data-text="Nenhum registro encontrado."
              @update:options="loadItems"
              >
              <template #item="{ item }">
                  <tr>
                      <td>{{ item.cliente.nmCliente }}</td>
                      <td>{{ getDataFormatada(item.dtRetirada) }}</td>
                      <td>{{ getDataFormatada(item.dtDevolucao) }}</td>
                      <td>{{ getDataFormatada(item.dtEvento) }}</td>
                      <td>{{ formatCurrency(item.vlrAluguel) }}</td>
                      <td>
                        <v-btn size="small"
                              variant="plain"
                              @click="editarCadastro(item)">
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                      </td>
                  </tr>
              </template>
        </VDataTableServer>
      </v-col>
      </v-row>
    </v-card>

    <v-snackbar
              rounded="pill"
              :timeout="2000"
              v-model="snackBar.show"
              :color="snackBar.color"
              :close-on-content-click="snackBar.closeOnClick"
              elevation="24"
            >
            {{ snackBar.msg }}

            <template v-slot:actions>
              <v-btn
                variant="text"
              >
                fechar
              </v-btn>
            </template>

          </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
  import {ref, onMounted } from 'vue';
  import router from '@/routes/index';
  import LocacaoStore from '@/store/LocacaoStore/LocacaoStore';
import Locacao from '@/types/LocacaoVestido/LocacaoVestidoType';
import moment from 'moment';

  const nomePesquisa = ref<string>('');

  const loading = ref<boolean>(false);

  const deletando = ref<boolean>(false);

  const locacaoStore = LocacaoStore();

  const snackBar = ref({
      show: false,
      msg: "",
      color: "",
      timeout: "'2000'",
      closeOnClick: true
    });

  const {
    getLocacaoes,
    totalElements,
    totalPages,
    locacoes
  } = locacaoStore;


  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
  });

  const clearPagination = () => {
    pagination.value.page = 1;
    pagination.value.itemsPerPage = 10;
  }

  const headers = [
      { title: 'Nome', key: 'nmCliente' },
      { title: 'Retirada', key: 'dtRetirada' },
      { title: 'Devolução', key: 'dtDevolucao' },
      { title: 'Evento', key: 'dtEvento' },
      { title: 'Vlr Aluguel', key: 'vlrAluguel' },
      { title: '', key: 'editar' },
      // { title: '', key: 'excluir' },
    ];


  const irParaNovoCadastro = () => {
    //clearCliente();

    router.push({ name: 'CadastroLocacao' });
  }

  const fetchLocacoes = async () => {
    await getLocacaoes(pagination.value.page, pagination.value.itemsPerPage)
  }

  onMounted( async () => {
    await fetchLocacoes();
  });


  const editarCadastro = (locacao: Locacao) => {
    //SetCliente(cliente);
    irParaEdicaoDeCadastro();
  }

  const irParaEdicaoDeCadastro = () => {
    router.push({ name: 'CadastroCliente' });
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getDataFormatada = (data: string | Date | null) => {
  if (!data) {
    return '';
  }

  // Verifica se o formato da data é uma string ou Date e converte adequadamente
  const dataMoment = moment(data);

  // Verifica se o momento é válido antes de formatar
  if (dataMoment.isValid()) {
    return dataMoment.format('DD/MM/YYYY');
  } else {
    return ''; // Retorna string vazia caso a data seja inválida
  }
};

  const loadItems = async (options: any) => {
      clearPagination();

      if (deletando.value) {
        console.log('aqui')
        await fetchLocacoes();

        deletando.value = false;
      }else if (!nomePesquisa.value == '' || !nomePesquisa.value == undefined) {
        loading.value = true;

        //await GetClientesByNmCliente(nomePesquisa.value, pagination.value.page, pagination.value.itemsPerPage);

        loading.value = false;
      } else{
        if(options.page !== undefined && options.itemsPerPage !== undefined) {
          pagination.value.page = options.page;
          pagination.value.itemsPerPage = options.itemsPerPage;
        }

        await fetchLocacoes()
      }
    }

</script>
