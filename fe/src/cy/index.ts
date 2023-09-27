import cytoscape from 'cytoscape';

import { parseData } from './parse-data';

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
            if (el.data().type === 'module') return 'blue';
            return 'gray';
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
