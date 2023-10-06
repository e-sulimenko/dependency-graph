<script setup lang="ts">
import { SETTINGS } from '../../libs/cy/constants';

import { LAYOUT_ITEM, COLOR_ITEM, WEIGHT_ITEM } from './@types';


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
  };
  showNodeModules: boolean;
  showGroups: boolean;
};

defineProps<Filter>();

const emit = defineEmits<{
  (event: 'on-change-weight', e: Event): void;
  (event: 'on-change-layout', e: Event): void;
  (event: 'on-change-color', e: Event, type: COLOR_ITEM['id']): void;
  (event: 'on-change-show-node-modules'): void;
  (event: 'on-change-show-groups'): void;
}>();
</script>

<template>
  <div class="filter">
    <div class="filter__item">
      Weight:
      <label class="filter__label" v-for="item in WEIGHTS">
        <input
          type="radio"
          name="weight"
          :value="item.id"
          :checked="item.id === $props.weight"
          @change="(e) => $emit('on-change-weight', e)"
        >
        {{ item.text }}
      </label>
    </div>
    <div class="filter__item">
      Layout:
      <label class="filter__label" v-for="item in LAYOUTS" :key="item.id">
        <input
          type="radio"
          name="layout"
          :value="item.id"
          :checked="item.id === $props.layout"
          @change="(e) => $emit('on-change-layout', e)"
        >
        {{ item.text }}
      </label>
    </div>
    <div class="filter__item">
      Color:
      <label class="filter__label" v-for="item in COLORS" :key="item.id">
        <input
          type="color"
          :value="$props.color[item.id]"
          @change="(event) => $emit('on-change-color', event, item.id)"
        >
        {{ item.text }}
      </label>
    </div>
    <div class="filter__item">
      Show Nodes:
      <label class="filter__label">
        <input
          type="checkbox"
          :checked="$props.showNodeModules"
          @change="$emit('on-change-show-node-modules')"
        >
        node_modules
      </label>
    </div>
    <label class="filter__item filter__item--two-columns filter__label">
      Show Groups:
      <input
        type="checkbox"
        :checked="$props.showGroups"
        @change="$emit('on-change-show-groups')"
      >
    </label>
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
  user-select: none;

  &__item {
    display: grid;
    grid-template-columns: max-content;
    gap: 6px;

    &--two-columns {
      grid-template-columns: max-content max-content;
    }
  }

  &__label {
    padding-left: 16px; 
    cursor: pointer;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 16px;
  }
}
</style>
