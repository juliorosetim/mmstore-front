<template>
  <v-responsive>
    <v-app>
      <v-container>
            <v-card prepend-icon="mdi-account"
                    title="Cadastro de Cliente" class="pa-2">
              <v-row dense>
                <v-col cols="9">
                  <v-text-field
                    type="text"
                    id="nmCliente"
                    v-model="cliente.nmCliente"
                    required
                    class="input"
                    label="Nome"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    type="text"
                    id="cpfCnpj"
                    v-model="cliente.cpfCnpj"
                    required
                    class="input"
                    label="CPF/CNPJ"
                    hide-details="auto"
                    maxlength="14"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                  <v-col cols="6">
                    <v-text-field
                      type="text"
                      id="celular"
                      v-model="cliente.celular"
                      required
                      class="input"
                      label="Celular"
                      hide-details="auto"
                      maxlength="11"
                    />
                  </v-col>

                  <v-col cols="6">
                    <v-text-field
                      type="text"
                      id="emprego"
                      v-model="cliente.emprego"
                      required
                      class="input"
                      label="Emprego"
                      hide-details="auto"
                      maxlength="100"
                    />
                  </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="3">
                  <v-text-field
                    :loading="loading"
                    append-inner-icon="mdi-magnify"
                    label="CEP"
                    hide-details
                    @click:append-inner="pesquisaCep"
                    v-model="cliente.cep"
                    maxlength="10"
                    @keyup.enter="pesquisaCep"
                  ></v-text-field>
                </v-col>

                <v-col cols="7">
                  <v-text-field
                    type="text"
                    id="endereco"
                    v-model="cliente.rua"
                    required
                    class="input"
                    label="Endereço"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>

                <v-col  cols="2">
                  <v-text-field
                    type="text"
                    id="numero"
                    v-model="cliente.numero"
                    required
                    class="input"
                    label="Número"
                    hide-details="auto"
                    maxlength="10"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    id="bairoo"
                    v-model="cliente.bairro"
                    required
                    class="input"
                    label="Bairro"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    id="cidade"
                    v-model="cliente.cidade"
                    required
                    class="input"
                    label="Cidade"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    id="complementoEnd"
                    v-model="cliente.complementoEnd"
                    required
                    class="input"
                    label="Complemento"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>
              </v-row>

              <v-row dense>
                <v-col cols="8">
                  <v-text-field
                    type="text"
                    id="nmContato"
                    v-model="cliente.nmContato"
                    required
                    class="input"
                    label="Cotato"
                    hide-details="auto"
                    maxlength="100"
                  />
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    type="text"
                    id="contato"
                    v-model="cliente.contato"
                    required
                    class="input"
                    label="Telefone"
                    hide-details="auto"
                    maxlength="11"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-checkbox
                    label="Ativo"
                    true-value="S"
                    false-value="N"
                    v-model="cliente.flAtivo"
                  >
                  </v-checkbox>
                </v-col>
              </v-row>

              <v-row dense justify="center">
                <v-col cols="2">
                  <v-btn
                    @click="cadastrarCliente"
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

            <v-snackbar
            rounded="pill"
            :timeout="2000"
            v-model="snackBar.show"
            :color="snackBar.color"
            close-on-content-click="true"
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
  </v-responsive>
</template>

<script setup lang='ts'>
  import router from '@/routes';
  import axios from 'axios';
  import ClienteStore from '@/store/ClienteStore';
  import ClienteService from '@/Service/ClienteService';
  import { ref, watch } from 'vue';

  const snackBar = ref({
    show: false,
    msg: "",
    color: "",
    timeout: "'2000'",
    closeOnClick: true
  });

  const clienteStore = ClienteStore();

  const {cliente, clearCliente} = clienteStore;

  const loading = false;

  const irParaConsulta = () => {
    clearCliente();
    router.push({ name: 'ConsultaCliente' });
  }

  const pesquisaCep = () => {
    axios.get(`http://viacep.com.br/ws/${cliente.cep}/json`)
    .then((response:any) => {
      const data = response.data
      cliente.endereco.value = data.logradouro
      cliente.bairro.value = data.bairro;
      cliente.cidade.value = data.localidade;
    })
    .catch((error:any) =>{
      console.log('Erro', error)
    });
  }

  const cadastrarCliente = async () => {
    const response = await ClienteService.cadastrarCliente(cliente.value);

    console.log(`hasError? ${response.hasError}`)
    if (response.hasError) {
      snackBar.value.msg = response.error?.message;
      snackBar.value.color = "#d11e48";
      snackBar.value.show = true;
    } else {
      console.log(' teste 1')
      snackBar.value.msg = "Cliente cadastrado com sucesso";
      snackBar.value.color = "green";
      snackBar.value.show = true;
    }
  }

  const isAtivo = ():boolean => {
    return cliente.value.flAtivo === 'S' ? true : false;
  }

</script>
