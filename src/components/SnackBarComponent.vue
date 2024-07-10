<template>
  <v-snackbar
    rounded="pill"
    :timeout="timeout"
    :model-value="show"
    variant="text"
    :color="backColor"
    @update:model-value="updateShow"
    close-on-content-click="true"
  >
    {{ msg }}
    <template v-slot:actions>
      <v-btn :color="backColor" variant="text" @click="updateShow(false)">
        fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  msg: {
    required: true,
    type: String,
  },
  show: {
    required: true,
    type: Boolean,
    default: false,
  },
  backColor: {
    required: true,
    type: String,
    default: "#a6bf91",
  },
  timeout: {
    required: false,
    type: Number,
    default: 2000,
  },
});

const emit = defineEmits(['update:show']);

const updateShow = (value: boolean) => {
  emit('update:show', value);
};
</script>
