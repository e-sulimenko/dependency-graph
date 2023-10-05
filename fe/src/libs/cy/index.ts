import cytoscape, { Core } from 'cytoscape';

import { parseData } from './parse-data';
import { defaultStyles } from './styles';

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
    style: defaultStyles,
  });
};
