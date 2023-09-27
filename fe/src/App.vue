<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { boostrapCy } from './libs/cy';

const cyContainer = ref(null);

watchEffect(() => {
  if (cyContainer.value) {
    boostrapCy(cyContainer.value);
  }
})

</script>

<template>
  <div ref="cyContainer" class="cy-container" />
</template>

<style scoped>
.cy-container {
  width: 100%;
  height: 100%;
}
</style>
