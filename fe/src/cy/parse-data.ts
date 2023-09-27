import { ParsedData } from '../@types';


const EDGE_PATH_SEPARATOR = '->'
const NODE_PATH_SEPARATOR = '|'

export const parseData = (): ParsedData => {
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
