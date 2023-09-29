import cytoscape, { Core } from 'cytoscape';

import { NodeData } from '../../@types';

import { parseData } from './parse-data';
import { NODE_COLORS, EDGE_COLORS } from './constants';

export const boostrapCy = (container: HTMLElement): Core => {
  const { nodes, edges } = parseData();

  return cytoscape({
    container,
    elements: {
      nodes,
      edges,
    },
    layout: {
      name: 'circle',
    },
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(name)',
          backgroundColor: (el) => {
            const { type } = el.data() as NodeData;
            if (type === 'module') return NODE_COLORS.module;
            else if (type === 'side_effect_import') return NODE_COLORS.sideEffectImport;
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
    ]
  });
};
