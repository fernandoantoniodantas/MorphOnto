# Generated from ContextOnto.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .ContextOntoParser import ContextOntoParser
else:
    from ContextOntoParser import ContextOntoParser

# This class defines a complete generic visitor for a parse tree produced by ContextOntoParser.

class ContextOntoVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by ContextOntoParser#program.
    def visitProgram(self, ctx:ContextOntoParser.ProgramContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#ContextDeclaration.
    def visitContextDeclaration(self, ctx:ContextOntoParser.ContextDeclarationContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#decl.
    def visitDecl(self, ctx:ContextOntoParser.DeclContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#OntologyDeclaration.
    def visitOntologyDeclaration(self, ctx:ContextOntoParser.OntologyDeclarationContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#MorphismDeclaration.
    def visitMorphismDeclaration(self, ctx:ContextOntoParser.MorphismDeclarationContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#MapStatement.
    def visitMapStatement(self, ctx:ContextOntoParser.MapStatementContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ContextOntoParser#PushoutDeclaration.
    def visitPushoutDeclaration(self, ctx:ContextOntoParser.PushoutDeclarationContext):
        return self.visitChildren(ctx)



del ContextOntoParser