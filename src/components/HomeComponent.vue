<template>
  <v-responsive class="full-screen">
    <div class="image-container">
      <v-img class="centered-image" cover src="@/assets/logo_MM.png" />
    </div>
  </v-responsive>
</template>

<script setup lang="ts">

</script>

<style scoped>
.full-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 90vw;
  overflow: hidden;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 90%;
}

.centered-image {
  max-height: 80%;
  max-width: 80%;
}
</style>
