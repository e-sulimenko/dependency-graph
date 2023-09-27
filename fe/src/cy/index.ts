import cytoscape from 'cytoscape';

import { NodeData } from '../@types';

import { parseData } from './parse-data';
import { COLORS } from './constants';

export const boostrapCy = () => {
  const app = document.getElementById('app');
  const { nodes, edges } = parseData();
  cytoscape({
    container: app,
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
            else if (type === 'imported_module') return COLORS.IMPORT_MODULE;
            return COLORS.SPECIFIER;
          },
          // width: function(ele) { return Math.max(1, Math.ceil(ele.degree(false)/2)) * 20; },
          // height: function(ele){ return Math.max(1, Math.ceil(ele.degree(false)/2)) * 20; }
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
