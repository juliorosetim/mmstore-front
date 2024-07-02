<template>
    <v-app>
        <v-container>
            <v-card  class="ma-1 border-0">
                <v-btn 
                  @click="irParaNovoCadastro"
                >
                  Novo
                </v-btn>
            </v-card>
            <v-card class="ma-1 d-flex border-0">
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
                        </tr>
                    </template>                

                </v-data-table>
            </v-card>
        </v-container>
    </v-app>

    <!-- <cadastro-cliente-component
        :showModal="showModal"
        @fecharModalCliente="fecharModalCliente"
    /> -->
    
</template>

<script setup lang="ts">
    import ClienteService from '@/Service/ClienteService';
    import { defineComponent, Ref, ref, onMounted } from 'vue';
    import Cliente from '@/types/ClienteType';
    import router from '@/routes/index';


    const clientes = ref<Cliente[]>([]);
    // const showModal = ref(false);

    const headers = [
      { title: 'Nome', key: 'nmCliente' },
      { title: 'Celular', key: 'celular' },
      { title: 'Rua', key: 'rua' },
    ];

    const fetchClientes = async () => {
        try {
            const response = await ClienteService.findAllClientes();
            clientes.value = response;
        } catch (error) {
            console.error("Erro ao buscar clientes: ", error);
        }       
    }

    onMounted( async () => {
        await fetchClientes();
    });   
    
    // const novoCliente = () => {
    //     showModal.value = true;
    // }

    // const fecharModalCliente = () => {
    //   showModal.value = false;
    // }

    const irParaNovoCadastro = () => {
      router.push({ name: 'CadastroCliente' });
    }

</script>   