import type { EdgeDefinition, NodeDataDefinition } from 'cytoscape';

export interface NodeData extends NodeDataDefinition {
  type: 'module' | 'specifier' | 'tmp'
}

type NodeDefinition = {
  data: NodeData;
}

export type ParsedData = {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}
