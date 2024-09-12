<template>
  <v-app>
    <v-container>
      <v-card class="pa-1">
        <v-btn prepend-icon="mdi-account-plus">
          Novo
        </v-btn>
      </v-card>

      <v-card class="ma-1 d-flex border-0 pa-1">
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          label="Nº do vestido"
          hide-details
          @click:append-inner="loadItems"
          v-model="nomePesquisa"
          maxlength="100"
          @keyup.enter="loadItems"
        />
      </v-card>

      <v-row class="pa-1">
        <v-col
          v-for="vestido in vestidos"
          :key="vestido.idVestido"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card elevation="3">
            <v-img
              :src="`data:image/jpeg;base64,${vestido.imgVestido}`"
              alt="Imagem do Vestido"
              height="200px"
              @click="openDialog(vestido.imgVestido)"
            ></v-img>
            <v-card-text>{{ formatNumeroVestido(vestido.nuVestido) }}</v-card-text>
            <v-card-text>{{ formatCurrency(vestido.vlrVestido) }}</v-card-text>
            <!-- <v-card-text>{{ formatSituacao(vestido.flSituacao) }}</v-card-text> -->
            <v-card-actions >
              <v-btn size="small" variant="plain" @click="editarCadastro(vestido)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="pagination.page"
        :length="totalPages"
        @input="loadItems"
      ></v-pagination>

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

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-img :src="`data:image/jpeg;base64,${selectedImage}`" alt="Imagem do Vestido"></v-img>
        </v-card>
      </v-dialog>

    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
    import {ref, onMounted } from 'vue';
    import router from '@/routes/index';
    import { VDataTableServer } from 'vuetify/components/VDataTable';
    import { VestidoStore } from '@/store/VestidoStore';
    import Vestido from '@/types/VestidoType';

    const dialog = ref(false);
    const selectedImage = ref('');

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
      console.log("Editando vestido")
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
      console.log("Carregando vestidos")
      clearPagination();

      // if (deletando.value) {
      //   console.log('aqui')
      //   await fetchVestidos();

      //   deletando.value = false;
      // }else if (!nomePesquisa.value == '' || !nomePesquisa.value == undefined) {
      //   loading.value = true;

      //   await GetClientesByNmCliente(nomePesquisa.value, pagination.value.page, pagination.value.itemsPerPage);

      //   loading.value = false;
      // } else{
      //   if(options.page !== undefined && options.itemsPerPage !== undefined) {
      //     pagination.value.page = options.page;
      //     pagination.value.itemsPerPage = options.itemsPerPage;
      //   }

      //   await fetchClientes()
      // }
    }

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    const formatNumeroVestido = (value) => {
      return `Nº: ${value} `;
    }

    const formatSituacao = (value) => {
      return value === 'A' ? 'Ativo' : 'Inativo';
    }

    const openDialog = (imgVestido: string) => {
      selectedImage.value = imgVestido;
      dialog.value = true;
    }
</script>
