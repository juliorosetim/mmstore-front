<template>
  <v-card>
    <v-layout>
      <v-app-bar prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
          color="black"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>MM Store</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn> -->

        <!-- <v-btn
          class="button-custom"
          @click="novoLancamento"
          variant="text"
          icon="mdi-plus"
          color="white"
        ></v-btn> -->

        <!-- <v-btn variant="text" icon="mdi-dots-vertical"></v-btn> -->
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="top" temporary>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Home"
            value="home"
            :to="{ path: '/' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="Consulta de Clientes"
            value="consulta-cliente"
            :to="{ path: '/consulta-cliente' }"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-credit-card"
            title="Sobre"
            value="sobre"
            :to="{ path: '/sobre' }"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from "vue";


  const drawer = ref<Boolean>(false);
</script>
