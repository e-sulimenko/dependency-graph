<script setup lang="ts">
import { reactive, watch } from 'vue';

import { LAYOUT_ITEM, COLOR_ITEM, WEIGHT_ITEM } from './@types';

import { EDGE_COLORS, NODE_COLORS, SETTINGS } from '../../libs/cy/constants';


const WEIGHTS: WEIGHT_ITEM[] = [
  { id: 'none', text: 'None' },
  { id: 'in', text: 'In edges' },
  { id: 'out', text: 'Out edges' },
  { id: 'total', text: 'Total edges' },
]

const LAYOUTS: LAYOUT_ITEM[] = [
  { id: 'circle', text: 'Circle' },
  { id: 'grid', text: 'Grid' },
  { id: 'breadthfirst', text: 'Breadthfirst' },
]

const COLORS: COLOR_ITEM[] = [
  { id: 'module', text: 'Module' },
  { id: 'specifier', text: 'Specifier' },
  { id: 'sideEffectImport', text: 'Side Effect Import' },
  { id: 'line', text: 'Edge line' },
  { id: 'arrow', text: 'Edge arrow' },
];

export type Filter = {
  weight: keyof typeof SETTINGS.WEIGHT;
  layout: keyof typeof SETTINGS.LAYOUT;
  color: {
    line: string;
    arrow: string;
    sideEffectImport: string;
    module: string;
    specifier: string;
  }
};

const emit = defineEmits<{
  (event: 'on-update-filter', filter: Filter): void;
}>();

const filter = reactive<Filter>({
  weight: 'none',
  layout: 'circle',
  color: {
    line: EDGE_COLORS.line,
    arrow: EDGE_COLORS.arrow,
    sideEffectImport: NODE_COLORS.sideEffectImport,
    module: NODE_COLORS.module,
    specifier: NODE_COLORS.specifier,
  }
});

watch(filter, () => {
  emit('on-update-filter', filter);
});

const handleChangeColor = (event: Event, type: COLOR_ITEM['id']) => {
  filter.color[type] = (event.target as HTMLInputElement).value;
}

</script>

<template>
  <div class="filter">
    <div class="filter__item">
      Weight:
      <label v-for="item in WEIGHTS">
        <input
          v-model="filter.weight"
          type="radio"
          name="weight"
          :value="item.id"
          :checked="item.id === filter.weight"
        >
        {{ item.text }}
      </label>
    </div>
    <div class="filter__item">
      Layout:
      <label v-for="item in LAYOUTS" :key="item.id">
        <input
          v-model="filter.layout"
          type="radio"
          name="layout"
          :value="item.id"
          :checked="item.id === filter.layout"
        >
        {{ item.text }}
      </label>
    </div>
    <div class="filter__item">
      Color:
      <label v-for="item in COLORS" :key="item.id">
        <input
          type="color"
          :value="filter.color[item.id]"
          @change="(event) => handleChangeColor(event, item.id)"
        >
        {{ item.text }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  padding: 16px;
  position: fixed;
  top: 16px;
  left: 16px;
  border-radius: 4px;
  background-color: #eee;
  display: grid;
  gap: 8px;

  &__item {
    display: grid;
    grid-template-columns: max-content;
    gap: 6px;

    label {
      padding-left: 16px; 
      cursor: pointer;
      display: grid;
      grid-template-columns: max-content 1fr;
      gap: 16px;
    }
  }
}
</style>
