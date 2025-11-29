export type NodeType =
  | "context"
  | "ontology"
  | "concept"
  | "pushout";

export interface ContextNodeData {
  label: string; // Display label
}

export interface OntologyNodeData {
  label: string;
  context: string; // Owner context
}

export interface ConceptNodeData {
  label: string;
  ontology: string; // Owner ontology
  context: string;  // Derived from parent ontology
}

export interface BaseNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: any;
}
