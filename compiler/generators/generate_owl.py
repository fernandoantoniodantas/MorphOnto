from compiler.core.model import ContextProgram

BASE = "http://example.org/ctx#"


def safe_list(x):
    """Garante que listas vindas do parser nunca são None."""
    if x is None:
        return []
    return x


def generate_owl(program: ContextProgram) -> str:
    """
    Gera OWL/Turtle com suporte total a Contexts, Ontologies, Morphisms e PUSHOUT REAL.
    Agora com tratamento seguro para ontologias e conceitos vazios.
    """

    out = []

    out.append(f"@prefix : <{BASE}> .")
    out.append("@prefix owl: <http://www.w3.org/2002/07/owl#> .")
    out.append("@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .")
    out.append("")

    # ============================================================
    # CONTEXTOS
    # ============================================================
    for ctx in program.contexts.values():
        out.append(f"# ================================")
        out.append(f"# Context: {ctx.name}")
        out.append(f"# ================================")

        out.append(f":{ctx.name} a owl:Ontology .")
        out.append("")

        # ---------------------------------------------
        # Ontologias
        # ---------------------------------------------
        for ont in ctx.ontologies.values():

            # Toda ontologia é uma classe
            out.append(f":{ont.name} a owl:Class .")

            # Tratar lista de conceitos de forma segura
            concepts = safe_list(ont.concepts)

            for c in concepts:
                out.append(f":{c} a owl:Class ; rdfs:subClassOf :{ont.name} .")

            out.append("")

        # ---------------------------------------------
        # Morfismos
        # ---------------------------------------------
        for morph in ctx.morphisms.values():
            out.append(f":{morph.name} a owl:ObjectProperty ;")
            out.append(f"    rdfs:domain :{morph.src} ;")
            out.append(f"    rdfs:range  :{morph.tgt} .")

            for a, b in safe_list(morph.mapping.items() if morph.mapping else []):
                out.append(f":{a} rdfs:subClassOf [")
                out.append(f"    a owl:Restriction ;")
                out.append(f"    owl:onProperty :{morph.name} ;")
                out.append(f"    owl:someValuesFrom :{b}")
                out.append("] .")

            out.append("")

        # ---------------------------------------------
        # PUSHOUTS
        # ---------------------------------------------
        for po in ctx.pushouts:
            out.append(f"# Pushout {po.name} = IntegrateContexts({po.left}, {po.right})")
            out.append(f":{po.name} a owl:Class .")

            merged = safe_list(ctx.ontologies[po.name].concepts)
            for c in merged:
                out.append(f":{c} rdfs:subClassOf :{po.name} .")

            if po.equivalences:
                for (a, b) in po.equivalences:
                    out.append(f":{a} owl:equivalentClass :{b} .")

            out.append("")

        out.append("")

    return "\n".join(out)
