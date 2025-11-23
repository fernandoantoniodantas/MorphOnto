export type NodeType = "context" | "ontology" | "concept";

export interface ContextNodeData {
  label: string; // Nome do contexto
}

export interface OntologyNodeData {
  label: string; // Nome da ontologia
  context: string; // Dono
}

export interface ConceptNodeData {
  label: string; // Nome do conceito
  ontology: string; // Dono
  context: string; // Dono do dono
}
