<template>
  <v-app>
    <v-container>
          <v-card prepend-icon="mdi-account" title="Cadastro de Cliente"> 
            <v-row dense>
              <v-col cols="9">
                <v-text-field
                  type="text"
                  id="nmCliente"
                  v-model="nmCliente"
                  required
                  class="input"
                  label="Nome"
                  hide-details="auto"
                />
              </v-col>            
              <v-col cols="2">
                <v-text-field
                  type="text"
                  id="cpfCnpj"
                  v-model="cpfCnpj"
                  required
                  class="input"
                  label="CPF/CNPJ"
                  hide-details="auto"
                />
              </v-col>  

            </v-row>
            <v-row dense>
              <v-col cols="2">
                <v-text-field
                  :loading="loading"
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  label="CEP"
                  variant="solo"
                  hide-details
                  single-line
                  @click:append-inner="onClick"
                  v-model="cep"
                ></v-text-field>

              </v-col>
            </v-row>

            <v-row dense>
              <v-col  cols="9">    
                <v-text-field
                  type="text"
                  id="endereco"
                  v-model="endereco"
                  required
                  class="input"
                  label="Endereço"
                  hide-details="auto"
                />          
              </v-col>

              <v-col  cols="3">    
                <v-text-field
                  type="text"
                  id="numero"
                  v-model="numero"
                  required
                  class="input"
                  label="Número"
                  hide-details="auto"
                />          
              </v-col>            
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  id="bairoo"
                  v-model="bairoo"
                  required
                  class="input"
                  label="Bairro"
                  hide-details="auto"
                />  
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  id="cidade"
                  v-model="cidade"
                  required
                  class="input"
                  label="Cidade"
                  hide-details="auto"
                />  
              </v-col>
            </v-row>  

            <v-row>
              <v-col cols="12">
                <v-text-field
                  type="text"
                  id="complementoEnd"
                  v-model="complementoEnd"
                  required
                  class="input"
                  label="Complemento"
                  hide-details="auto"
                />  
              </v-col>
            </v-row>              
            

            <v-row>
              <v-col cols="9">
                <v-text-field
                  type="text"
                  id="nmContato"
                  v-model="nmContato"
                  required
                  class="input"
                  label="Cotato"
                  hide-details="auto"
                />  
              </v-col>

              <v-col cols="3">
                <v-text-field
                  type="text"
                  id="contato"
                  v-model="contato"
                  required
                  class="input"
                  label="Telefone"
                  hide-details="auto"
                />  
              </v-col>

            </v-row>                
            



            <v-row dense justify="center">
              <v-col cols="1">
                <v-btn 
                  density="comfortable" 
                  >
                    Salvar
                </v-btn>
              </v-col>            
              <v-col cols="1">
                <v-btn 
                  density="comfortable" 
                  @click="irParaConsulta">
                    Fechar
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
    </v-container>  
  </v-app>    
</template>

<script setup lang='ts'>
  import Cliente from '@/types/ClienteType';
  import { ref } from 'vue';
  import router from '@/routes';
  import axios from 'axios';

  const nmCliente = ref('');
  const endereco = ref('');
  const numero = ref('');
  const bairoo = ref('');
  const cpfCnpj = ref("");
  const emprego = ref("");
  const celular = ref("");
  const contato = ref("");
  const nmContato = ref("");
  const rua = ref("");
  const cep = ref("");
  const complementoEnd = ref("");
  const cidade = ref("");

  const loaded = false;
  const loading = false;

  const irParaConsulta = () => {
    router.push({ name: 'ConsultaCliente' });
  }  

  const onClick = () => {
    axios.get(`http://viacep.com.br/ws/${cep.value}/json`)
    .then((response:any) => {
      const data = response.data
      endereco.value = data.logradouro
      bairoo.value = data.bairro;
      cidade.value = data.localidade;

    })
    .catch((error:any) =>{
      console.log('Erro', error)
    });
  }

</script>