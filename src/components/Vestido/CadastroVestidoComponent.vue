<template>
  <v-responsive>
    <v-app>
      <v-container>
        <v-card prepend-icon="" title="Cadastro de vestidos" ></v-card>

        <v-card class="mt-2 pl-2">
          <v-row class="pt-2 pb-2">
            <v-col cols="3">
              <v-file-input
                label="Imagem do Vestido"
                prepend-icon="mdi-camera"
                accept="image/*"
                @change="onFileChange"
                style="display: none;"
                ref="fileInput"
                v-model="selectedFile"
              ></v-file-input>

              <div
                class="image-upload"
                @click="triggerFileInput"
                :style="{ backgroundImage: imageUrl ? `url(${imageUrl})` : '' }"
              >
                <v-icon v-if="!imageUrl">mdi-plus</v-icon>
              </div>
            </v-col>

            <v-col cols="3">
              <v-text-field
                type="text"
                id="nuVestido"
                v-model="vestido.nuVestido"
                required
                class="input"
                label="Nº Vestido"
                hide-details="auto"
                maxlength="100"
              />
            </v-col>

            <v-col cols="3">
              <v-text-field
                type="text"
                id="vlrVestido"
                v-model="vestido.vlrVestido"
                required
                class="input"
                label="R$ Valor"
                hide-details="auto"
                maxlength="14"
              />
            </v-col>

            <v-col cols="2">
              <v-checkbox
                label="Ativo"
                true-value="S"
                false-value="N"
                v-model="vestido.flSituacao"
              >
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mt-4 pa-2">
          <v-row dense justify="center">
            <v-col cols="2">
              <v-btn
                @click="cadastrarVestido"
                prepend-icon="mdi-content-save-all"
              >
                Salvar
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                @click="irParaConsulta"
                prepend-icon="mdi-arrow-left"
              >
                Voltar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import VestidoStore from '@/store/VestidoStore';
import VestidoService from '@/Service/VestidoService';
import router from '@/routes';

const vestidoStore = VestidoStore();
const { vestido, ClearVestido } = vestidoStore;

const imageUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const imageId = ref<number | null>(null);

// Verifica se já existe uma imagem e exibe na montagem do componente
// onMounted(() => {
//   console.log(`onMounted ${vestido.value}`)

//   if (vestido.value.imgVestido[0].imgVestido) {
//     // Se já houver uma imagem, cria a URL para exibir a imagem no campo de upload
//     imageUrl.value = `data:image/jpeg;base64,${vestido.value.imgVestido[0].imgVestido}`;
//     imageId.value = vestido.value.imgVestido[0].idImgVestido;
//   }
// });

// Função para inicializar o array imgVestido se necessário
const initImgVestido = () => {
  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}];
  } else if (!vestido.value.imgVestido[0]) {
    vestido.value.imgVestido[0] = {};
  }
};

onMounted(() => {
  initImgVestido();
  // Inicializa o array imgVestido caso não esteja inicializado
  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}]; // Cria um objeto vazio no array
  }

  if (vestido.value.imgVestido[0].imgVestido) {
    // Se já houver uma imagem, cria a URL para exibir a imagem no campo de upload
    imageUrl.value = `data:image/jpeg;base64,${vestido.value.imgVestido[0].imgVestido}`;
    imageId.value = vestido.value.imgVestido[0].idImgVestido;
  }
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

// Função para carregar e exibir a imagem no campo de upload
// const onFileChange = (event: Event) => {
//   console.log(`event ${event}`)
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       imageUrl.value = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//     selectedFile.value = file;
//   }
// };

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      // Atualiza a URL da imagem base64 para exibição
      imageUrl.value = e.target?.result as string;
    };

    reader.readAsDataURL(file);  // Converte o arquivo para base64
    selectedFile.value = file;   // Armazena o arquivo selecionado
  }
};

// const cadastrarVestido = async () => {
//   if (selectedFile.value) {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const base64String = reader.result?.toString().replace('data:', '').replace(/^.+,/, '');
//       vestido.value.imgVestido = [{ idImgVestido: imageId, imgVestido: base64String }];

//       console.log(`Com imagem ${vestido}`);

//       const response = await VestidoService.cadastrarVestido(vestido.value);
//       console.log(`HasErro ${response.hasError}`);
//     };
//     reader.readAsDataURL(selectedFile.value);
//   } else {
//     vestido.value.imgVestido = [{idImgVestido: null, imgVestido: null }];
//     const response = await VestidoService.cadastrarVestido(vestido.value);
//     console.log(`HasErro ${response.hasError}`);
//   }
// };

const cadastrarVestido = async () => {
  initImgVestido();

  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}]; // Inicializa o array se ele for indefinido
  }

  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString().replace('data:', '').replace(/^.+,/, '');
      vestido.value.imgVestido[0] = { idImgVestido: imageId.value, imgVestido: base64String };

      console.log(`Com imagem ${vestido}`);

      const response = await VestidoService.cadastrarVestido(vestido.value);
      console.log(`HasErro ${response.hasError}`);
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    vestido.value.imgVestido[0] = { idImgVestido: null, imgVestido: null };
    const response = await VestidoService.cadastrarVestido(vestido.value);
    console.log(`HasErro ${response.hasError}`);
  }
};

const irParaConsulta = () => {
  ClearVestido();
  router.push({ name: 'ConsultaVestido' });
}
</script>

<style scoped>
.image-upload {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}
</style>
