import { NodeSingular } from 'cytoscape';

import { NodeData } from '../../@types';

export const NODE_COLORS = {
  module: '#1d6bb0',
  specifier: '#8bbfec',
  sideEffectImport: '#d4e7f8',
} as const;

export const EDGE_COLORS = {
  line: '#cccccc',
  arrow: '#cccccc',
} as const;

export const SETTINGS = {
  WEIGHT: {
    in: {
      width: (el: NodeSingular) => Math.max(1, Math.ceil(el.indegree(false) / 2)) * 20,
      height: (el: NodeSingular) => Math.max(1, Math.ceil(el.indegree(false) / 2)) * 20,
    },
    out: {
      width: (el: NodeSingular) => Math.max(1, Math.ceil(el.outdegree(false) / 2)) * 20,
      height: (el: NodeSingular) => Math.max(1, Math.ceil(el.outdegree(false) / 2)) * 20,
    },
    total: {
      width: (el: NodeSingular) => Math.max(1, Math.ceil(el.degree(false) / 2)) * 20,
      height: (el: NodeSingular) => Math.max(1, Math.ceil(el.degree(false) / 2)) * 20,
    },
    none: {
      width: '30px',
      height: '30px',
    }
  },
  LAYOUT: {
    circle: { name: 'circle' },
    breadthfirst: { name: 'breadthfirst' },
    grid: { name: 'grid' },
  },
  COLOR: {
    NODE: ({ module, specifier, sideEffectImport }: Record<keyof typeof NODE_COLORS, string>) => ({
      'background-color': (el: NodeSingular) => {
        const { importType } = el.data() as NodeData;
        if (importType === 'module') return module;
        else if (importType === 'side_effect_import') return sideEffectImport;
        return specifier;
      },
    }),
  },
} as const;