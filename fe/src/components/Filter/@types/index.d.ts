import { SETTINGS, EDGE_COLORS, NODE_COLORS } from '../../../libs/cy/constants';

export type LAYOUT_ITEM = {
  id: keyof typeof SETTINGS.LAYOUT;
  text: string;
}

export type COLOR_ITEM = { 
  id: keyof typeof NODE_COLORS | keyof typeof EDGE_COLORS;
  text: string;
}

export type WEIGHT_ITEM = {
  id: keyof typeof SETTINGS.WEIGHT;
  text: string;
}