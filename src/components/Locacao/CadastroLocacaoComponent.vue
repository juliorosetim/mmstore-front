<!-- <template>
  <v-card>
    <h1>Cadastro locacao</h1>

    <v-btn
      @click="irParaConsulta"
      prepend-icon="mdi-arrow-left"
      >
        Voltar
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
  import {ref, onMounted } from 'vue';
  import router from '@/routes/index';

const irParaConsulta = () => {
    //clearCliente();
    router.push({ name: 'ConsultaLocacao' });
  }
</script> -->

<template>
  <v-container>
    <!-- Campo Cliente -->
    <v-autocomplete
      v-model="cliente"
      :items="clientes"
      label="Cliente"
      clearable
    ></v-autocomplete>

    <!-- Campos de Data -->
    <v-row>
      <v-col>
        <v-text-field
          v-model="dataRetirada"
          label="Data Retirada">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="dataDevolucao"
          label="Data Devolução">
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="dataEvento"
          label="Data Evento">
        </v-text-field>
      </v-col>
    </v-row>

    <!-- Filtro para adicionar vestido -->
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="vestido"
          :items="vestidos"
          label="Filtro para buscar vestido e adicionar"
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-btn
          prepend-icon="mdi-plus" @click="adicionarVestido"
        />
      </v-col>
    </v-row>
    <!-- Grid de Vestidos -->
    <v-data-table
      :items="vestidosSelecionados"
      :headers="headersVestidos">
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

    <v-btn
      @click="irParaConsulta"
      prepend-icon="mdi-arrow-left"
      >
        Voltar
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import {ref, onMounted } from 'vue';
import router from '@/routes/index';

const cliente = ref(null);
    const clientes = ref(['Cliente 1', 'Cliente 2', 'Cliente 3']);
    const dataRetirada = ref('');
    const dataDevolucao = ref('');
    const dataEvento = ref('');
    const vestido = ref(null);
    const vestidos = ref(['Vestido 1', 'Vestido 2', 'Vestido 3']);
    const vestidosSelecionados = ref([]);
    const dataPagamento = ref('');
    const valorLocacao = ref('');
    const valor = ref('');
    const dinheiro = ref(null);
    const opcoesDinheiro = ref(['Dinheiro', 'Cartão']);
    const pagamentos = ref([]);

    const headersVestidos = [
      { title: 'Vestido', key: 'vestido' },
    ];

    const headersPagamentos = [
      { title: 'Data', key: 'Data Pgto' },
      { title: 'Valor', key: 'Valor' },
      { title: 'Tipo', key: 'tipo' },
    ];

    const adicionarVestido = () => {
      if (vestido.value) {
        vestidosSelecionados.value.push({ vestido: vestido.value });
        vestido.value = null;
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

</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
