# Generated from ContextOnto.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .ContextOntoParser import ContextOntoParser
else:
    from ContextOntoParser import ContextOntoParser

# This class defines a complete listener for a parse tree produced by ContextOntoParser.
class ContextOntoListener(ParseTreeListener):

    # Enter a parse tree produced by ContextOntoParser#program.
    def enterProgram(self, ctx:ContextOntoParser.ProgramContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#program.
    def exitProgram(self, ctx:ContextOntoParser.ProgramContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#ContextDeclaration.
    def enterContextDeclaration(self, ctx:ContextOntoParser.ContextDeclarationContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#ContextDeclaration.
    def exitContextDeclaration(self, ctx:ContextOntoParser.ContextDeclarationContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#decl.
    def enterDecl(self, ctx:ContextOntoParser.DeclContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#decl.
    def exitDecl(self, ctx:ContextOntoParser.DeclContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#OntologyDeclaration.
    def enterOntologyDeclaration(self, ctx:ContextOntoParser.OntologyDeclarationContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#OntologyDeclaration.
    def exitOntologyDeclaration(self, ctx:ContextOntoParser.OntologyDeclarationContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#MorphismDeclaration.
    def enterMorphismDeclaration(self, ctx:ContextOntoParser.MorphismDeclarationContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#MorphismDeclaration.
    def exitMorphismDeclaration(self, ctx:ContextOntoParser.MorphismDeclarationContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#MapStatement.
    def enterMapStatement(self, ctx:ContextOntoParser.MapStatementContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#MapStatement.
    def exitMapStatement(self, ctx:ContextOntoParser.MapStatementContext):
        pass


    # Enter a parse tree produced by ContextOntoParser#PushoutDeclaration.
    def enterPushoutDeclaration(self, ctx:ContextOntoParser.PushoutDeclarationContext):
        pass

    # Exit a parse tree produced by ContextOntoParser#PushoutDeclaration.
    def exitPushoutDeclaration(self, ctx:ContextOntoParser.PushoutDeclarationContext):
        pass



del ContextOntoParser