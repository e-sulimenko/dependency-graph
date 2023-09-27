import type { EdgeDefinition, NodeDataDefinition } from 'cytoscape';

export interface NodeData extends NodeDataDefinition {
  type: 'module' | 'specifier' | 'side_effect_import'
}

type NodeDefinition = {
  data: NodeData;
}

export type ParsedData = {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}
