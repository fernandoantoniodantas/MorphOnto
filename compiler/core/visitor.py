from compiler.grammar.ContextOntoVisitor import ContextOntoVisitor
from compiler.grammar.ContextOntoParser import ContextOntoParser

from compiler.core.model import (
    ContextProgram,
    Context,
    Ontology,
    Morphism,
    Pushout,
)


class ContextOntoModelBuilder(ContextOntoVisitor):
    """
    Visitor principal do ContextOnto.
    Constrói a estrutura categorial (programa → contextos → ontologias → morfismos → pushouts)
    a partir da árvore sintática produzida pelo parser.
    """

    def __init__(self):
        super().__init__()
        self.program = ContextProgram()
        self._current_context = None   # contexto ativo

    # ---------------------------------------------------------
    #  PROGRAM
    # ---------------------------------------------------------
    def visitProgram(self, ctx: ContextOntoParser.ProgramContext):
        for c in ctx.contextDecl():
            self.visit(c)
        return self.program

    # ---------------------------------------------------------
    #  CONTEXT
    # ---------------------------------------------------------
    def visitContextDeclaration(self, ctx: ContextOntoParser.ContextDeclarationContext):
        name = ctx.ID().getText()

        context = Context(name=name)
        self.program.contexts[name] = context

        # Guardamos o contexto atual para as declarações internas
        previous = self._current_context
        self._current_context = context

        # Processa declarações internas
        for decl in ctx.decl():
            self.visit(decl)

        self._current_context = previous
        return context

    # ---------------------------------------------------------
    #  ONTOLOGY
    # ---------------------------------------------------------
    def visitOntologyDeclaration(self, ctx: ContextOntoParser.OntologyDeclarationContext):
        ont_name = ctx.ID(0).getText()
        ont = Ontology(name=ont_name)

        # conceitos internos
        for c in ctx.ID()[1:]:
            ont.concepts.add(c.getText())

        self._current_context.ontologies[ont_name] = ont
        return ont

    # ---------------------------------------------------------
    #  MORPHISM
    # ---------------------------------------------------------
    def visitMorphismDeclaration(self, ctx: ContextOntoParser.MorphismDeclarationContext):
        morph_name = ctx.ID(0).getText()
        src = ctx.ID(1).getText()
        tgt = ctx.ID(2).getText()

        morph = Morphism(name=morph_name, src=src, tgt=tgt)

        # mapeamentos internos
        for m in ctx.mapStmt():
            a = m.ID(0).getText()
            b = m.ID(1).getText()
            morph.mapping[a] = b

        self._current_context.morphisms[morph_name] = morph
        return morph

    # ---------------------------------------------------------
    #  PUSHOUT
    # ---------------------------------------------------------
    def visitPushoutDeclaration(self, ctx: ContextOntoParser.PushoutDeclarationContext):
        name = ctx.ID(0).getText()
        left = ctx.ID(1).getText()
        right = ctx.ID(2).getText()

        po = Pushout(name=name, left=left, right=right)

        # pushout pertence ao contexto global (top-level)
        # mas depende dos nomes de contextos
        # você pode permitir pushout dentro de contextos se desejar
        self._current_context.pushouts.append(po)

        return po
