import { NodeSingular } from 'cytoscape';

import { NodeData } from '../../@types';

import { EDGE_COLORS, NODE_COLORS } from './constants';

export const defaultStyles = [
  {
    selector: 'node',
    style: {
      label: 'data(name)',
      backgroundColor: (el: NodeSingular) => {
        const { importType } = el.data() as NodeData;
        if (importType === 'module') return NODE_COLORS.module;
        else if (importType === 'side_effect_import') return NODE_COLORS.sideEffectImport;
        return NODE_COLORS.specifier;
      },
      width: '30px',
      height: '30px',
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 2,
      'line-color': EDGE_COLORS.line,
      'target-arrow-color': EDGE_COLORS.arrow,
      'target-arrow-shape': 'triangle',
      'curve-style': 'unbundled-bezier',
    }
  }
];