import type { Node, Edge } from "reactflow";

export function sanitize(label: string): string {
  return label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_]/g, "_");
}

export function generateCtx(nodes: Node[], edges: Edge[]): string {
  const contextNode = nodes.find((n) => n.type === "context");

  if (!contextNode)
    return "// erro: nenhum contexto encontrado";

  const ctxName = sanitize(contextNode.data.label);

  const ontologyNodes = nodes.filter((n) => n.type === "ontology");
  const conceptNodes = nodes.filter((n) => n.type === "concept");

  let out = `context ${ctxName} {\n`;

  ontologyNodes.forEach((o) => {
    out += `    ontology ${sanitize(o.data.label)} {}\n`;
  });

  // --- conceito pertence a alguma ontologia? (semântica estrutural)
  conceptNodes.forEach((c) => {
    const insideOntology = edges.some((e) => e.target === c.id);
    if (!insideOntology) {
      out += `    concept ${sanitize(c.data.label)};\n`;
    }
  });

  // --- morfismos válidos
  edges.forEach((e) => {
    const src = nodes.find((n) => n.id === e.source);
    const tgt = nodes.find((n) => n.id === e.target);
    if (!src || !tgt) return;

    // regra ContextOnto:
    // Ontology -> Context
    // Concept -> Ontology
    if (
      (src.type === "ontology" && tgt.type === "context") ||
      (src.type === "concept" && tgt.type === "ontology")
    ) {
      out += `    morphism ${sanitize(src.data.label)} -> ${sanitize(
        tgt.data.label
      )};\n`;
    }
  });

  out += "}\n";
  return out;
}
