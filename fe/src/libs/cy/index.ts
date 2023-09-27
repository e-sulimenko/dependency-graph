import cytoscape, { Core, NodeSingular } from 'cytoscape';

import { NodeData } from '../../@types';

import { parseData } from './parse-data';
import { COLORS } from './constants';

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
      avoidOverlap: true,
    },
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(name)',
          backgroundColor: (el) => {
            const { type } = el.data() as NodeData;
            if (type === 'module') return COLORS.MODULE;
            else if (type === 'side_effect_import') return COLORS.IMPORT_MODULE;
            return COLORS.SPECIFIER;
          },
          width: (el: NodeSingular) => Math.max(1, Math.ceil(el.indegree(false) / 2)) * 20,
          height: (el: NodeSingular) => Math.max(1, Math.ceil(el.indegree(false) / 2)) * 20,
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'unbundled-bezier',
        }
      }
    ]
  });
};
