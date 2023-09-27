import cytoscape from 'cytoscape';
import type { NodeDefinition, EdgeDefinition } from 'cytoscape';

import './style.css';

type ParsedData = {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}

const EDGE_PATH_SEPARATOR = '->'
const NODE_PATH_SEPARATOR = '|'

const parseData = (): ParsedData => {
  const componentsSet = new Set<string>();
  const specifierSet = new Set<string>();
  const edgesSet = new Set<string>();

  initialData.forEach((depNode) => {
    componentsSet.add(depNode.parentPath);

    if (depNode.specifiers.length === 0) {
      componentsSet.add(depNode.childPath);
      edgesSet.add(depNode.parentPath + EDGE_PATH_SEPARATOR + depNode.childPath);
    }

    depNode.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportDefaultSpecifier') {
        componentsSet.add(depNode.childPath);
        edgesSet.add(depNode.parentPath + EDGE_PATH_SEPARATOR + depNode.childPath);
      } else {
        const specifierName = specifier.importedName ?? specifier.localName;
        const nodeId = depNode.parentPath + NODE_PATH_SEPARATOR + specifierName;
        specifierSet.add(nodeId);
        edgesSet.add(depNode.parentPath + EDGE_PATH_SEPARATOR + nodeId);
      }
    });
  });

  const components = Array.from(componentsSet).map((nodePath) => ({
    data: {
      id: nodePath,
      name: nodePath.split('/').at(-1),
      type: 'module',
    }
  }));

  const specifiers = Array.from(specifierSet).map((nodePath) => ({
    data: {
      id: nodePath,
      name: nodePath.split(NODE_PATH_SEPARATOR).at(-1),
      type: 'specifier',
    }
  }));
  
  const edges = Array.from(edgesSet).map((edgePath) => {
    const [source, target] = edgePath.split(EDGE_PATH_SEPARATOR);
    return ({
      data: {
        id: edgePath,
        source,
        target,
      },
    })
  });

  return {
    nodes: [...components, ...specifiers],
    edges,
  }
}

const boostrap = () => {
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

boostrap();