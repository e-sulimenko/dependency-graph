import type { NodeDefinition, EdgeDefinition } from 'cytoscape';

export type ParsedData = {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}
