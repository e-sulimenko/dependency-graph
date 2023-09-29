<script setup lang="ts">
import { Core } from 'cytoscape';
import { ref, watchEffect } from 'vue';

import Filter, { Filter as FilterType } from './components/Filter/Filter.vue';

import { boostrapCy } from './libs/cy';
import { SETTINGS } from './libs/cy/constants';

const cyContainer = ref(null);
const cyInstance = ref<Core | null>(null);

watchEffect(() => {
  if (cyContainer.value) {
    cyInstance.value = boostrapCy(cyContainer.value);
  }
});

const applyFilter = (filter: FilterType) => {
  const nodeStyleSettings = {
    ...SETTINGS.WEIGHT[filter.weight],
    ...SETTINGS.COLOR.NODE(filter.color),
  };

  const layout = {
    ...SETTINGS.LAYOUT[filter.layout]
  }
  if (cyInstance.value != null) {
    cyInstance.value
      .style()
      .selector('node')
      .style(nodeStyleSettings)
      .selector('edge')
      .style({
        'line-color': filter.color.line,
        'target-arrow-color': filter.color.arrow,
      })
      .update()

    cyInstance.value.nodes().forEach((item) => {
      const { type } = item.data();
      if (type === 'node_module') {
        item.style('display', filter.showNodeModules ? 'element' : 'none');
      }
    });

    cyInstance.value.layout(layout).run();
}
}

</script>

<template>
  <div ref="cyContainer" class="cy-container" />
  <Filter @on-update-filter="applyFilter" />
</template>

<style scoped>
.cy-container {
  width: 100%;
  height: 100%;
}
</style>
