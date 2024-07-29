<template>
  <v-app>
      <v-container>
          <v-card  class="pa-1" >
              <v-btn
                prepend-icon="mdi-account-plus"

              >
                Novo
              </v-btn>
          </v-card>

          <v-card class="ma-1 d-flex border-0 pa-2">
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

            </v-card>

            <v-card class="ma-1 d-flex border-0 pa-2">

              <VDataTableServer
                    v-model:items-per-page="pagination.itemsPerPage"
                    :headers="headers"
                    :items="vestidos"
                    :items-length="totalElements"
                    no-data-text="Nenhum registro encontrado."
                    @update:options="loadItems"
                    >
                    <template #item="{ item }">
                        <tr>
                            <td>{{ item.imgVestido }}</td>
                            <td>{{ item.nuVestido }}</td>
                            <td>{{ item.vlrVestido }}</td>
                            <td>{{ item.flSituacao }}</td>
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

<script lang="ts" setup>
    import {ref, onMounted } from 'vue';
    import router from '@/routes/index';
    import { VDataTableServer } from 'vuetify/components/VDataTable';
    import { VestidoStore } from '@/store/VestidoStore';
    import Vestido from '@/types/VestidoType';

    const deletando = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const nomePesquisa = ref<string>('');

    const vestidoStore = VestidoStore();

    const { vestidos,
            GetAllVestidos,
            totalElements,
            totalPages} = vestidoStore;

    const pagination = ref({
      page: 1,
      itemsPerPage: 10,
    });

    const snackBar = ref({
      show: false,
      msg: "",
      color: "",
      timeout: "'2000'",
      closeOnClick: true
    });

    const headers = [
      { title: 'Foto', key: 'imgVestido' },
      { title: 'Nº', key: 'nuVestido' },
      { title: 'Valor R$', key: 'vlrVestido' },
      { title: 'Siutação', key: 'flSituacao' },
      { title: '', key: 'editar' },
    ];

    const editarCadastro = ( vestido: Vestido ) => {
      console.log(vestido)
    }


    const fetchVestidos = async () => {
      await GetAllVestidos(pagination.value.page, pagination.value.itemsPerPage);
    }


    onMounted( async () => {
        await fetchVestidos();
    });

    const clearPagination = () => {
      pagination.value.page = 1;
      pagination.value.itemsPerPage = 10;
    }

    const loadItems = async (options: any) => {
      clearPagination();

      if (deletando.value) {
        console.log('aqui')
        await fetchVestidos();

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
