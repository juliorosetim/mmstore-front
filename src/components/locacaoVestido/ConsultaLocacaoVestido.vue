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

<script lang="ts" setup>
    import {ref, onMounted,watch} from 'vue';
    import router from '@/routes/index';
    // import { VestidoStore } from '@/store/VestidoStore';
    // import Vestido from '@/types/VestidoType';

    // const dialog = ref(false);
    // const selectedImage = ref('');

    // const deletando = ref<boolean>(false);
    // const loading = ref<boolean>(false);
    // const nuVestido = ref<string>('');

    // const vestidoStore = VestidoStore();

    // const { vestidos,
    //         GetAllVestidos,
    //         SetVestido,
    //         ClearVestido,
    //         GetVestidoByNuVestido,
    //         totalElements,
    //         totalPages} = vestidoStore;

    // const pagination = ref({
    //   page: 1,
    //   itemsPerPage: 9,
    //   totalPages: 1
    // });

    const snackBar = ref({
      show: false,
      msg: "",
      color: "",
      timeout: "'2000'",
      closeOnClick: true
    });

    // const headers = [
    //   { title: 'Foto', key: 'imgVestido' },
    //   { title: 'Nº', key: 'nuVestido' },
    //   { title: 'Valor R$', key: 'vlrVestido' },
    //   { title: 'Siutação', key: 'flSituacao' },
    //   { title: '', key: 'editar' },
    // ];

    // const editarCadastro = ( vestido: Vestido ) => {
    //   SetVestido(vestido)

    //   console.log(vestido)

    //   irParaEdicaoDeCadastro();
    // }

    // const fetchVestidos = async () => {
    //   await carregarVestidos({ page: pagination.value.page, itemsPerPage: pagination.value.itemsPerPage });
    // };

    // onMounted( async () => {
    //     await fetchVestidos();
    // });

    // watch(
    //   () => pagination.value.page,
    //   async (newPage) => {
    //     await carregarVestidos();
    //   }
    // );

    // const clearPagination = () => {
    //   pagination.value.page = 1;
    //   pagination.value.itemsPerPage = 9;
    // }

    // const carregarVestidos = async (options: any = {}) => {
    //   loading.value = true;

    //   // Se `options.page` estiver indefinido, usa o valor de `pagination`
    //   const currentPage = options.page || pagination.value.page;
    //   const itemsPerPage = options.itemsPerPage || pagination.value.itemsPerPage;

    //   if (nuVestido.value) {
    //     await GetVestidoByNuVestido(nuVestido.value, currentPage, itemsPerPage);
    //   } else {
    //     await GetAllVestidos(currentPage, itemsPerPage);
    //   }

    //   // Atualizando totalPages com o valor vindo do backend
    //   pagination.value.page = currentPage;
    //   pagination.value.totalPages = totalPages;

    //   loading.value = false;
    // };

    // const irParaEdicaoDeCadastro = () => {
    //   router.push({ name: 'CadastroVestido' });
    // }

    // const formatCurrency = (value) => {
    //   return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    // };

    // const formatNumeroVestido = (value) => {
    //   return `Nº: ${value} `;
    // }

    // const formatSituacao = (value) => {
    //   return value === 'A' ? 'Ativo' : 'Inativo';
    // }

    // const openDialog = (imgVestido: string) => {
    //   selectedImage.value = imgVestido;
    //   dialog.value = true;
    // }

    const irParaNovoCadastro = () => {
      //ClearVestido();

      router.push({ name: 'CadastroLocacaoVestido' });
    }

</script>
