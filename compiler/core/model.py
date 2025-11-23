from dataclasses import dataclass, field
from typing import Dict, List, Set


# ============================
# BASIC STRUCTURES
# ============================

@dataclass
class Ontology:
    name: str
    concepts: Set[str] = field(default_factory=set)


@dataclass
class Morphism:
    name: str
    src: str          # name of domain ontology C
    tgt: str          # name of codomain ontology A or B
    mapping: Dict[str, str] = field(default_factory=dict)


@dataclass
class Pushout:
    """
    A pushout declaration:
      pushout ExecEnv = IntegrateContexts(A, B)
    In the visitor, A and B are stored into:
       left  = A
       right = B
    """
    name: str
    left: str
    right: str
    equivalences: List[tuple] = field(default_factory=list)   # filled after computation


# ============================
# CONTEXT
# ============================

@dataclass
class Context:
    name: str
    ontologies: Dict[str, Ontology] = field(default_factory=dict)
    morphisms: Dict[str, Morphism] = field(default_factory=dict)
    pushouts: List[Pushout] = field(default_factory=list)


# ============================
# PROGRAM ROOT
# ============================

@dataclass
class ContextProgram:
    contexts: Dict[str, Context] = field(default_factory=dict)

    # ------------------------------------------------------
    # Compute pushout INSIDE a given context
    # ------------------------------------------------------
    def compute_pushout(self, ctx: Context, po: Pushout):
        """
        Given a context ctx and pushout:
            pushout P = IntegrateContexts(A, B)
        We build ontology P inside the context.

        Algorithm:
          1. A and B are the names of ontologies inside ctx.
          2. Merge A.concepts ∪ B.concepts.
          3. For each pair of morphisms with domain C and codomains A, B,
             create equivalences.
        """

        if po.left not in ctx.ontologies or po.right not in ctx.ontologies:
            raise ValueError(f"Ontologies {po.left} or {po.right} missing in context {ctx.name}")

        A = ctx.ontologies[po.left]
        B = ctx.ontologies[po.right]

        # Create the new ontology
        result = Ontology(name=po.name)
        result.concepts = set(A.concepts) | set(B.concepts)

        # Find morphisms C→A and C→B inside this same context
        equivalences = []

        # For every ontology C in the context
        for C_name, C_ont in ctx.ontologies.items():
            m1 = None
            m2 = None

            # look for morphisms C -> A and C -> B
            for m in ctx.morphisms.values():
                if m.src == C_name and m.tgt == po.left:
                    m1 = m
                if m.src == C_name and m.tgt == po.right:
                    m2 = m

            # If both morphisms exist, unify concepts
            if m1 and m2:
                for src in m1.mapping:
                    if src in m2.mapping:
                        equivalences.append((m1.mapping[src], m2.mapping[src]))

        # Store equivalences back into the pushout object
        po.equivalences = equivalences

        # Add pushout ontology to the context
        ctx.ontologies[po.name] = result

        return result
