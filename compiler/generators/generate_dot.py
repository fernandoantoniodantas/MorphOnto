from compiler.core.model import ContextProgram

def generate_dot(program: ContextProgram) -> str:
    """
    Gera gráfico em DOT:
      - Cada contexto vira um cluster grande
      - Cada ontologia vira um cluster interno
      - Conceitos são nós
      - Morfismos são arestas
      - Pushouts reais:
            • equivalências como arestas tracejadas
            • ontologia resultante é um cluster
    """

    out = []
    out.append("digraph G {")
    out.append("  rankdir=LR;")
    out.append("  compound=true;")
    out.append("")

    # =====================================================
    # CONTEXTOS
    # =====================================================
    for ctx in program.contexts.values():
        out.append(f'  subgraph cluster_{ctx.name} {{')
        out.append(f'    label = "Context: {ctx.name}";')
        out.append("    style=filled; fillcolor=lightgray;")

        # -----------------------------------------
        # Ontologias dentro do contexto
        # -----------------------------------------
        for ont in ctx.ontologies.values():
            out.append(f'    subgraph cluster_{ctx.name}_{ont.name} {{')
            out.append(f'      label = "Ontology: {ont.name}";')

            for c in ont.concepts:
                node_id = f"{ctx.name}_{ont.name}_{c}"
                out.append(f'      "{node_id}" [label="{c}"];')

            out.append("    }")

        out.append("  }")
        out.append("")

    # =====================================================
    # MORFISMOS
    # =====================================================
    for ctx in program.contexts.values():
        for morph in ctx.morphisms.values():
            for a, b in morph.mapping.items():
                src_node = f"{ctx.name}_{morph.src}_{a}"
                tgt_node = f"{ctx.name}_{morph.tgt}_{b}"
                out.append(
                    f'  "{src_node}" -> "{tgt_node}" '
                    f'[label="{morph.name}"];'
                )

    # =====================================================
    # PUSHOUTS (REAL)
    # =====================================================
    for ctx in program.contexts.values():
        for po in ctx.pushouts:
            # cluster visual do pushout
            out.append(f'  subgraph cluster_pushout_{po.name} {{')
            out.append(f'    label = "Pushout: {po.name}";')
            out.append(f'    "{po.name}" [shape=diamond, style=filled, fillcolor=yellow];')

            # equivalências calculadas no compute_pushout()
            for (a, b) in po.equivalences:
                a_node = f"{ctx.name}_{po.left}_{a}"
                b_node = f"{ctx.name}_{po.right}_{b}"

                out.append(
                    f'    "{a_node}" -> "{b_node}" '
                    f'[style=dashed, color=blue, label="≡"];'
                )
                out.append(
                    f'    "{b_node}" -> "{a_node}" '
                    f'[style=dashed, color=blue, label="≡"];'
                )

            out.append("  }")
            out.append("")

    out.append("}")
    return "\n".join(out)
