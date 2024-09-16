<template>
    <v-app>
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
                      :items="clientes"
                      :items-length="totalElements"
                      no-data-text="Nenhum registro encontrado."
                      @update:options="loadItems"
                      >
                      <template #item="{ item }">
                          <tr>
                              <td>{{ item.nmCliente }}</td>
                              <td>{{ item.celular }}</td>
                              <td>{{ item.rua }}</td>
                              <td>{{ item.numero }}</td>
                              <td>
                                <v-btn size="small"
                                      variant="plain"
                                      @click="editarCadastro(item)">
                                  <v-icon>mdi-eye</v-icon>
                                </v-btn>
                              </td>
                              <!-- <td>
                                <v-btn
                                  variant="plain"
                                  size="small"
                                  @click="item.idCliente !== undefined? excluirCliente(item.idCliente): null"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </td> -->
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
    </v-app>
</template>

<script setup lang="ts">
    import {ref, onMounted } from 'vue';
    import Cliente from '@/types/ClienteType';
    import router from '@/routes/index';
    import ClienteStore from '@/store/ClienteStore';
    import { VDataTableServer } from 'vuetify/components/VDataTable';


    const snackBar = ref({
      show: false,
      msg: "",
      color: "",
      timeout: "'2000'",
      closeOnClick: true
    });

    const pagination = ref({
      page: 1,
      itemsPerPage: 10,
    });

    const nomePesquisa = ref<string>('');

    const loading = ref<boolean>(false);

    const clienteStore = ClienteStore();

    const deletando = ref<boolean>(false);

    const {GetClientes,
           cliente,
           clientes,
           GetClientesByNmCliente,
           deleteCliente,
           clearCliente,
           SetCliente,
           totalElements,
           totalPages
          } = clienteStore;

    const headers = [
      { title: 'Nome', key: 'nmCliente' },
      { title: 'Celular', key: 'celular' },
      { title: 'Rua', key: 'rua' },
      { title: 'Nº', key: 'numero' },
      { title: '', key: 'editar' },
      // { title: '', key: 'excluir' },
    ];

    const fetchClientes = async () => {
      await GetClientes(pagination.value.page, pagination.value.itemsPerPage);
    }

    const editarCadastro = (cliente: Cliente) => {
      SetCliente(cliente);
      irParaEdicaoDeCadastro();
    }

    onMounted( async () => {
        await fetchClientes();
    });

    const irParaNovoCadastro = () => {
      clearCliente();

      router.push({ name: 'CadastroCliente' });
    }

    const irParaEdicaoDeCadastro = () => {
      router.push({ name: 'CadastroCliente' });
    }

    const excluirCliente = async(idCliente: number) => {
      deletando.value = true;

      await deleteCliente(idCliente);

      snackBar.value.msg = "Cliente excluido com sucesso";
      snackBar.value.color = "green";
      snackBar.value.show = true;
    }

    const clearPagination = () => {
      pagination.value.page = 1;
      pagination.value.itemsPerPage = 10;
    }

    const loadItems = async (options: any) => {
      clearPagination();

      if (deletando.value) {
        console.log('aqui')
        await fetchClientes();

        deletando.value = false;
      }else if (!nomePesquisa.value == '' || !nomePesquisa.value == undefined) {
        loading.value = true;

        await GetClientesByNmCliente(nomePesquisa.value, pagination.value.page, pagination.value.itemsPerPage);

        loading.value = false;
      } else{
        if(options.page !== undefined && options.itemsPerPage !== undefined) {
          pagination.value.page = options.page;
          pagination.value.itemsPerPage = options.itemsPerPage;
        }

        await fetchClientes()
      }
    }

</script>
