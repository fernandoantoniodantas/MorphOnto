import type { Node, Edge } from "reactflow";

export function compileOntology(nodes: Node[], edges: Edge[]) {
  const owl = `
# OWL OUTPUT (placeholder)
# Ontologias detectadas: ${nodes.length}
`;

  const dot = `
digraph G {
  // DOT placeholder
}
`;

  return { owl, dot };
}
