// src/utils/generateCtx.ts
import type { Node, Edge } from "reactflow";

/* ============================================
   TIPOS INTERNOS
============================================ */
interface OntologyMap {
  [id: string]: {
    id: string;
    label: string;
    mode: "entity" | "context";
    concepts: string[];
  };
}

interface MorphismBlock {
  id: string;
  from: string;
  to: string;
  pairs: { source: string; target: string }[];
}

/* ============================================
   FUNÇÃO PRINCIPAL
============================================ */
export function generateCtx(nodes: Node[], edges: Edge[]): string {
  if (!nodes.length) return "// nenhum nó encontrado";

  const ontologyMap: OntologyMap = {};
  const conceptMap: Record<string, { label: string; parent?: string }> = {};

  /* ============================================
     1) COLETAR ONTOLOGIAS E CONCEITOS
  ============================================ */
  for (const n of nodes) {
    if (n.type === "ontology" || n.type === "context") {
      ontologyMap[n.id] = {
        id: n.id,
        label: n.data.label,
        mode: n.data.mode,
        concepts: []
      };
    }

    if (n.type === "concept") {
      conceptMap[n.id] = {
        label: n.data.label,
        parent: n.parentNode
      };
    }
  }

  /* ============================================
     2) ALOCAR CONCEITOS DENTRO DAS ONTOLOGIAS
  ============================================ */
  for (const cid in conceptMap) {
    const c = conceptMap[cid];
    if (c.parent && ontologyMap[c.parent]) {
      ontologyMap[c.parent].concepts.push(c.label);
    }
  }

  /* ============================================
     3) DETECTAR MORPHISMS ENTRE ONTOLOGIAS
        (edges entre conceitos)
  ============================================ */
  const morphisms: MorphismBlock[] = [];

  for (const e of edges) {
    const sourceConcept = conceptMap[e.source];
    const targetConcept = conceptMap[e.target];
    if (!sourceConcept || !targetConcept) continue;

    const ontoA = sourceConcept.parent;
    const ontoB = targetConcept.parent;
    if (!ontoA || !ontoB) continue;
    if (ontoA === ontoB) continue;

    const labelA = ontologyMap[ontoA]?.label;
    const labelB = ontologyMap[ontoB]?.label;
    if (!labelA || !labelB) continue;

    const morphismId = `${labelA}_to_${labelB}`;

    let block = morphisms.find((m) => m.id === morphismId);
    if (!block) {
      block = {
        id: morphismId,
        from: labelA,
        to: labelB,
        pairs: []
      };
      morphisms.push(block);
    }

    block.pairs.push({
      source: sourceConcept.label,
      target: targetConcept.label
    });
  }

  /* ============================================
     4) GERAR TEXTO CTX
  ============================================ */

  const lines: string[] = [];

  // ---- cabeçalho ----
  const numOnt = Object.values(ontologyMap).length;
  const numConcepts = nodes.filter((n) => n.type === "concept").length;

  lines.push(`# ============================================`);
  lines.push(`#  Arquivo CTX gerado automaticamente`);
  lines.push(`#  Ontologias: ${numOnt}`);
  lines.push(`#  Conceitos: ${numConcepts}`);
  lines.push(`#  Morphisms: ${morphisms.length}`);
  lines.push(`# ============================================`);
  lines.push("");

  // ---- ontologias ----
  for (const ontId of Object.keys(ontologyMap)) {
    const ont = ontologyMap[ontId];

    const kind = ont.mode === "entity" ? "entity ontology" : "context ontology";

    lines.push(`${kind} ${ont.label} {`);

    const sorted = ont.concepts.sort((a, b) => a.localeCompare(b));

    for (const c of sorted) {
      lines.push(`    concept ${c}`);
    }

    lines.push("}\n");
  }

  // ---- morphisms ----
  for (const m of morphisms) {
    lines.push(`morphism ${m.id} : ${m.from} → ${m.to} {`);

    for (const pair of m.pairs) {
      lines.push(`    ${pair.source} ↦ ${pair.target}`);
    }

    lines.push("}\n");
  }

  return lines.join("\n");
}
