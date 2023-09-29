import type { EdgeDefinition, NodeDataDefinition } from 'cytoscape';

export interface NodeData extends NodeDataDefinition {
  importType: 'module' | 'specifier' | 'side_effect_import';
  type: 'node_module' | 'other';
}

type NodeDefinition = {
  data: NodeData;
}

export type ParsedData = {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}
