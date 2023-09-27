import type { EdgeDefinition } from 'cytoscape';
import type { ParsedData, NodeData, NodeDefinition } from '../@types';


const EDGE_PATH_SEPARATOR = '->'
const NODE_PATH_SEPARATOR = '|'

const createNode = (id: string, name: string, type: NodeData['type']): NodeDefinition => ({
  data: {
    id,
    name,
    type,
  },
});

const createEdge = (id: string): EdgeDefinition => {
  const [source, target] = id.split(EDGE_PATH_SEPARATOR);
  return ({
    data: {
      id,
      source,
      target,
    }
  });
}

export const parseData = (): ParsedData => {
  const nodesDict: Record<string, ParsedData['nodes'][0]> = {}
  const edgeDict: Record<string, ParsedData['edges'][0]> = {}

  initialData.forEach((depNode) => {
    nodesDict[depNode.parentPath] = createNode(
      depNode.parentPath,
      depNode.parentPath.split('/').at(-1) ?? depNode.parentPath,
      'module',
    );

    if (depNode.specifiers.length === 0) {
      nodesDict[depNode.childPath] = createNode(
        depNode.childPath,
        depNode.childPath.split('/').at(-1) ?? depNode.childPath,
        'side_effect_import',
      );
      const edgeId = depNode.parentPath + EDGE_PATH_SEPARATOR + depNode.childPath;
      edgeDict[edgeId] = createEdge(edgeId);
    }

    depNode.specifiers.forEach((specifier) => {
      if (specifier.type === 'ImportDefaultSpecifier') {
        nodesDict[depNode.childPath] = createNode(
          depNode.childPath,
          depNode.childPath.split('/').at(-1) ?? depNode.childPath,
          'module',
        );
        const edgeId = depNode.parentPath + EDGE_PATH_SEPARATOR + depNode.childPath;
        edgeDict[edgeId] = createEdge(edgeId);
      } else {
        const specifierName = specifier.importedName ?? specifier.localName;
        const nodeId = depNode.childPath + NODE_PATH_SEPARATOR + specifierName;
        nodesDict[nodeId] = createNode(
          nodeId,
          specifierName,
          'specifier',
        );
        const edgeId = depNode.parentPath + EDGE_PATH_SEPARATOR + nodeId;
        edgeDict[edgeId] = createEdge(edgeId);
      }
    });
  });

  console.log(nodesDict);

  return {
    nodes: Object.values(nodesDict),
    edges: Object.values(edgeDict),
  }
}
