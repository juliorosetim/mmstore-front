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
                <v-data-table
                    :headers="headers"
                    :items="clientes"
                    :items-per-page="10"
                    >
                    <template #item="{ item }">
                        <tr>
                            <td>{{ item.nmCliente }}</td>
                            <td>{{ item.celular }}</td>
                            <td>{{ item.rua }}</td>
                            <td>{{ item.numero }}</td>
                            <td>
                              <span class="button-grid" @click="editarCadastro(item)">
                                  <v-icon>mdi-eye</v-icon>
                              </span>
                            </td>
                            <td>
                              <span
                                class="button-grid"
                                @click="
                                  item.idCliente !== undefined
                                    ? excluirCliente(item.idCliente)
                                    : null
                                "
                              >
                                <v-icon>mdi-delete</v-icon>
                              </span>
                            </td>

                        </tr>
                    </template>

                </v-data-table>
            </v-card>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
    import ClienteService from '@/Service/ClienteService';
    import { defineComponent, Ref, ref, onMounted } from 'vue';
    import Cliente from '@/types/ClienteType';
    import router from '@/routes/index';
    import ClienteStore from '@/store/ClienteStore';

    const clientes = ref<Cliente[]>([]);

    const clienteStore = ClienteStore();

    const {GetClientes, clienteList, SetCliente, clienteClear, cliente} = clienteStore;

    const headers = [
      { title: 'Nome', key: 'nmCliente' },
      { title: 'Celular', key: 'celular' },
      { title: 'Rua', key: 'rua' },
    ];

    const fetchClientes = async () => {
      await GetClientes();
      clientes.value = clienteList;
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
      SetCliente(clienteClear);
      router.push({ name: 'CadastroCliente' });
    }

    const irParaEdicaoDeCadastro = () => {
      router.push({ name: 'CadastroCliente' });
    }

    const excluirCliente = async(idCliente: number) => {
      ClienteService.deleteCliente(idCliente);
      await fetchClientes();
    }

</script>
