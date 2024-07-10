<template>
    <v-app>
        <v-container>
            <v-card  class="pa-1" >
                <v-btn
                  @click="irParaNovoCadastro"
                >
                  Novo
                </v-btn>
            </v-card>

            <v-card class="ma-1 d-flex border-0 pa-2">
              <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  label="Nome"
                  hide-details
                  @click:append-inner="pesquisar"
                  v-model="nomePesquisa"
                  maxlength="100"
                  @keyup.enter="pesquisar"
                />

            </v-card>

            <v-card class="ma-1 d-flex border-0 pa-2">
                <v-data-table
                    :headers="headers"
                    :items="clientes"
                    :items-per-page="pagination.itemsPerPage"
                    :page.sync="pagination.page"
                    :server-items-length="totalClientes"
                    @update:page="fetchClientes"
                    @update:items-per-page="fetchClientes"
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
                            <td>
                              <v-btn
                                variant="plain"
                                size="small"
                                @click="item.idCliente !== undefined? excluirCliente(item.idCliente): null"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
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
              <v-btn variant="text">
                fechar
              </v-btn>
            </template>

          </v-snackbar>

        </v-container>
    </v-app>
</template>

<script setup lang="ts">
    import ClienteService from '@/Service/ClienteService';
    import {ref, onMounted } from 'vue';
    import Cliente from '@/types/ClienteType';
    import router from '@/routes/index';
    import ClienteStore from '@/store/ClienteStore';

    const snackBar = ref({
      show: false,
      msg: "",
      backColor: "",
      timeout: "'2000'",
      closeOnClick: true
    });


    const nomePesquisa = ref<string>('');

    const loading = ref<boolean>(false);

    const clienteStore = ClienteStore();

    const {GetClientes,
           cliente,
           clientes,
           GetClientesByNmCliente,
           deleteCliente,
           clearCliente,
           SetCliente
          } = clienteStore;

    const headers = [
      { title: 'Nome', key: 'nmCliente' },
      { title: 'Celular', key: 'celular' },
      { title: 'Rua', key: 'rua' },
      { title: 'Nº', key: 'numero' },
      { title: '', key: 'editar' },
      { title: '', key: 'excluir' },
    ];

    const fetchClientes = async () => {
      await GetClientes();
    }

    const editarCadastro = (cliente: Cliente) => {
      SetCliente(cliente);
      console.log('editando', cliente)
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
      deleteCliente(idCliente);

      snackBar.value.msg = "Cliente excluido com sucesso";
      snackBar.value.color = "green";
      snackBar.value.show = true;

    }

    const pesquisar = async() => {
      if (!nomePesquisa.value == '' || !nomePesquisa.value == undefined) {
        loading.value = true;
        console.log(`nome pesquisa ${nomePesquisa.value}`)
        await GetClientesByNmCliente(nomePesquisa.value);
        loading.value = false;
      }else{
        await fetchClientes()
      }
    }

</script>
