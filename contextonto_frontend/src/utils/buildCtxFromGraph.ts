import type { Node, Edge } from "reactflow";

export function buildCtxFromGraph(nodes: Node[], edges: Edge[]): string {
  let out = "";

  // Separar nós por contexto
  const contexts = new Map<string, Node[]>();

  for (const n of nodes) {
    const ctxName = n.data?.context ?? "Main";
    if (!contexts.has(ctxName)) contexts.set(ctxName, []);
    contexts.get(ctxName)!.push(n);
  }

  // Para cada contexto, gerar bloco .ctx
  for (const [ctxName, ctxNodes] of contexts) {
    out += `context ${ctxName} {\n\n`;

    // -------------------------------------
    // Ontologias
    // -------------------------------------
    const ontologies = ctxNodes.filter(n => n.type === "ontology");

    for (const o of ontologies) {
      out += `  ontology ${o.data.label} {\n`;

      const concepts = ctxNodes.filter(
        c => c.type === "concept" && c.data.ontology === o.data.label
      );

      for (const c of concepts) {
        out += `    ${c.data.label}\n`;
      }

      out += `  }\n\n`;
    }

    // -------------------------------------
    // Morfismos (edges)
    // -------------------------------------
    const morphisms = edges.filter(e =>
      ctxNodes.some(n => n.id === e.source) &&
      ctxNodes.some(n => n.id === e.target)
    );

    for (const e of morphisms) {
      const src = nodes.find(n => n.id === e.source);
      const tgt = nodes.find(n => n.id === e.target);

      if (!src || !tgt) continue;

      const morphName = e.label ?? `m_${Date.now()}`;

      out += `  morphism ${morphName} : ${src.data.label} -> ${tgt.data.label} {\n`;
      out += `    /* mapping ainda não especificado graficamente */\n`;
      out += `  }\n\n`;
    }

    // -------------------------------------
    // Pushouts
    // -------------------------------------
    const pushouts = ctxNodes.filter(n => n.type === "pushout");

    for (const p of pushouts) {
      out += `  pushout ${p.data.label} = IntegrateContexts(${p.data.left}, ${p.data.right})\n\n`;
    }

    out += `}\n\n`;
  }

  return out;
}
