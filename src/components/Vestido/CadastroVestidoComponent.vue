<template>
  <v-responsive>
    <v-app>
      <v-container>
        <v-card prepend-icon="" title="Cadastro de vestidos"></v-card>

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

            <v-col cols="9">
              <v-row>
                <v-col cols="12">
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

                <v-col cols="12">
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

                <v-col cols="12">
                  <v-text-field
                    type="text"
                    id="cor"
                    v-model="vestido.cor"
                    required
                    class="input"
                    label="Cor predominante"
                    hide-details="auto"
                    maxlength="14"
                  />
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    label="Ativo"
                    true-value="S"
                    false-value="N"
                    v-model="vestido.flSituacao"
                  ></v-checkbox>
                </v-col>

              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="mt-4 pa-2">
          <v-row dense justify="center">
            <v-col cols="2">
              <v-btn @click="cadastrarVestido" prepend-icon="mdi-content-save-all">
                Salvar
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn @click="irParaConsulta" prepend-icon="mdi-arrow-left">
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
const imageId = ref<number | null | undefined>(null);

const initImgVestido = () => {
  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}];
  } else if (!vestido.value.imgVestido[0]) {
    vestido.value.imgVestido[0] = {};
  }
};

onMounted(() => {
  initImgVestido();
  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}];
  }

  if ((vestido.value) && (vestido.value.imgVestido[0] != undefined)) {
    imageUrl.value = `data:image/jpeg;base64,${vestido.value.imgVestido[0].imgVestido}`;
    imageId.value = vestido.value.imgVestido[0].idImgVestido;

    //console.log(JSON.stringify(vestido.value.imgVestido[0]))
  }
});

const triggerFileInput = () => {
  fileInput.value?.click();
};

const onFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };

    reader.readAsDataURL(file);
    selectedFile.value = file;

    setImgVestidoToObjectSave()
  }
};

const setImgVestidoToObjectSave = () => {

  console.log(`setImgVestidoToObjectSave ${JSON.stringify(selectedFile.value)}`)

  if (selectedFile.value) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result?.toString().replace('data:', '').replace(/^.+,/, '');

      vestido.value.imgVestido?.push({idImgVestido: imageId.value, imgVestido: base64String});

      // const response = await VestidoService.cadastrarVestido(vestido.value);
      // console.log(`HasErro ${response.hasError}`);
    };
    reader.readAsDataURL(selectedFile.value);
  } else {
    vestido.value.imgVestido.push({ idImgVestido: null, imgVestido: null });
    // const response = await VestidoService.cadastrarVestido(vestido.value);
    // console.log(`HasErro ${response.hasError}`);
  }
}

const cadastrarVestido = async () => {
  initImgVestido();

  if (!vestido.value.imgVestido) {
    vestido.value.imgVestido = [{}];
  }

  const response = await VestidoService.cadastrarVestido(vestido.value);

  console.log(`HasErro ${response.hasError}`);

  // if (selectedFile.value) {
  //   const reader = new FileReader();
  //   reader.onloadend = async () => {
  //     const base64String = reader.result?.toString().replace('data:', '').replace(/^.+,/, '');

  //     vestido.value.imgVestido[0] = { idImgVestido: imageId.value, imgVestido: base64String };

  //     const response = await VestidoService.cadastrarVestido(vestido.value);
  //     console.log(`HasErro ${response.hasError}`);
  //   };
  //   reader.readAsDataURL(selectedFile.value);
  // } else {
  //   vestido.value.imgVestido[0] = { idImgVestido: null, imgVestido: null };
  //   const response = await VestidoService.cadastrarVestido(vestido.value);
  //   console.log(`HasErro ${response.hasError}`);
  // }
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
