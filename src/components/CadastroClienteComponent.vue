<template>
    <v-conteiner>
        <h2>teste</h2>    
 
    </v-conteiner>
</template>

<script setup lang="ts">
    import ClienteService from '@/Service/ClienteService';
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import {Cliente} from './../types/ClienteType'    

    const clientes = ref<Cliente[]>([]);

    const fetchClientes = () => {
        ClienteService.findAllClientes();
    }
    
    onMounted(() => {
        fetchClientes();
    })    



</script>