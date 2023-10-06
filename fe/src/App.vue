<script setup lang="ts">
import { Core } from 'cytoscape';
import { reactive, ref, watchEffect } from 'vue';

import Filter, { Filter as FilterType } from './components/Filter/Filter.vue';
import { boostrapCy } from './libs/cy';
import { EDGE_COLORS, NODE_COLORS, SETTINGS } from './libs/cy/constants';
import { COLOR_ITEM } from './components/Filter/@types';

const cyContainer = ref(null);
const cyInstance = ref<Core | null>(null);

const filter = reactive<FilterType>({
  weight: 'none',
  layout: 'circle',
  color: {
    line: EDGE_COLORS.line,
    arrow: EDGE_COLORS.arrow,
    sideEffectImport: NODE_COLORS.sideEffectImport,
    module: NODE_COLORS.module,
    specifier: NODE_COLORS.specifier,
  },
  showNodeModules: true,
  showGroups: true,
});


watchEffect(() => {
  if (cyContainer.value) {
    cyInstance.value = boostrapCy(cyContainer.value);
  }
});

const updateLayout = () => {
  if (cyInstance.value == null) return;

  const prevZoom = cyInstance.value.zoom();
  const prevPan = cyInstance.value.pan();

  cyInstance.value.layout(SETTINGS.LAYOUT[filter.layout]).run();

  cyInstance.value.zoom(prevZoom);
  cyInstance.value.pan(prevPan);
};

const onChangeWeight = (event: Event) => {
  if (cyInstance.value == null) return;

  filter.weight = (event.target as HTMLInputElement).value as FilterType['weight'];

  const weightStyle = SETTINGS.WEIGHT[filter.weight];
  cyInstance.value
      .style()
      .selector('node')
      .style(weightStyle)
      .update()
  
  updateLayout();
};

const onChangeLayout = (event: Event) => {
  if (cyInstance.value == null) return;

  filter.layout = (event.target as HTMLInputElement).value as FilterType['layout'];
  cyInstance.value.layout(SETTINGS.LAYOUT[filter.layout]).run();

  updateLayout();
};

const onChangeColor = (event: Event, type:  COLOR_ITEM['id']) => {
  if (cyInstance.value == null) return;

  filter.color[type] = (event.target as HTMLInputElement).value;
  cyInstance.value
      .style()
      .selector('node')
      .style(SETTINGS.COLOR.NODE(filter.color))
      .update();
  cyInstance.value.layout(SETTINGS.LAYOUT[filter.layout]).run();

  updateLayout();
}

const onChangeShowNodeModules = () => {
  if (cyInstance.value == null) return;
  
  filter.showNodeModules = !filter.showNodeModules;
  
  cyInstance.value.nodes().forEach((item) => {
    const type = item.data('type');
    if (type === 'node_module') {
      item.style('display', filter.showNodeModules ? 'element' : 'none');
    }
  });

};

const onChnageShowGroups = () => {
  if (cyInstance.value == null) return;
  
  filter.showGroups = !filter.showGroups;
  cyInstance.value.nodes().forEach((item) => {
    const defaultParent = item.data('defaultParent');

    if (filter.showGroups) item.move({ parent: defaultParent })
    else item.move({ parent: null })
  });
}

</script>

<template>
  <div ref="cyContainer" class="cy-container" />
  <Filter
    :weight="filter.weight"
    :layout="filter.layout"
    :color="filter.color"
    :show-node-modules="filter.showNodeModules"
    :show-groups="filter.showGroups"
    @on-change-weight="onChangeWeight"
    @on-change-layout="onChangeLayout"
    @on-change-color="onChangeColor"
    @on-change-show-node-modules="onChangeShowNodeModules"
    @on-change-show-groups="onChnageShowGroups"
  />
</template>

<style scoped>
.cy-container {
  width: 100%;
  height: 100%;
}
</style>
