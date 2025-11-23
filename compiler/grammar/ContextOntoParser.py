# Generated from ContextOnto.g4 by ANTLR 4.13.2
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO

def serializedATN():
    return [
        4,1,17,79,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,1,0,5,0,16,8,0,10,0,12,0,19,9,0,1,0,1,0,1,1,1,1,1,1,1,1,5,1,27,
        8,1,10,1,12,1,30,9,1,1,1,1,1,1,2,1,2,1,2,3,2,37,8,2,1,3,1,3,1,3,
        1,3,5,3,43,8,3,10,3,12,3,46,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,
        1,4,1,4,5,4,58,8,4,10,4,12,4,61,9,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,
        1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,0,0,7,0,2,4,6,8,10,12,0,
        0,77,0,17,1,0,0,0,2,22,1,0,0,0,4,36,1,0,0,0,6,38,1,0,0,0,8,49,1,
        0,0,0,10,64,1,0,0,0,12,68,1,0,0,0,14,16,3,2,1,0,15,14,1,0,0,0,16,
        19,1,0,0,0,17,15,1,0,0,0,17,18,1,0,0,0,18,20,1,0,0,0,19,17,1,0,0,
        0,20,21,5,0,0,1,21,1,1,0,0,0,22,23,5,1,0,0,23,24,5,14,0,0,24,28,
        5,2,0,0,25,27,3,4,2,0,26,25,1,0,0,0,27,30,1,0,0,0,28,26,1,0,0,0,
        28,29,1,0,0,0,29,31,1,0,0,0,30,28,1,0,0,0,31,32,5,3,0,0,32,3,1,0,
        0,0,33,37,3,6,3,0,34,37,3,8,4,0,35,37,3,12,6,0,36,33,1,0,0,0,36,
        34,1,0,0,0,36,35,1,0,0,0,37,5,1,0,0,0,38,39,5,4,0,0,39,40,5,14,0,
        0,40,44,5,2,0,0,41,43,5,14,0,0,42,41,1,0,0,0,43,46,1,0,0,0,44,42,
        1,0,0,0,44,45,1,0,0,0,45,47,1,0,0,0,46,44,1,0,0,0,47,48,5,3,0,0,
        48,7,1,0,0,0,49,50,5,5,0,0,50,51,5,14,0,0,51,52,5,6,0,0,52,53,5,
        14,0,0,53,54,5,7,0,0,54,55,5,14,0,0,55,59,5,2,0,0,56,58,3,10,5,0,
        57,56,1,0,0,0,58,61,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,62,1,
        0,0,0,61,59,1,0,0,0,62,63,5,3,0,0,63,9,1,0,0,0,64,65,5,14,0,0,65,
        66,5,7,0,0,66,67,5,14,0,0,67,11,1,0,0,0,68,69,5,8,0,0,69,70,5,14,
        0,0,70,71,5,9,0,0,71,72,5,10,0,0,72,73,5,11,0,0,73,74,5,14,0,0,74,
        75,5,12,0,0,75,76,5,14,0,0,76,77,5,13,0,0,77,13,1,0,0,0,5,17,28,
        36,44,59
    ]

class ContextOntoParser ( Parser ):

    grammarFileName = "ContextOnto.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'context'", "'{'", "'}'", "'ontology'", 
                     "'morphism'", "':'", "'->'", "'pushout'", "'='", "'IntegrateContexts'", 
                     "'('", "','", "')'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "ID", "WS", "LINE_COMMENT", 
                      "BLOCK_COMMENT" ]

    RULE_program = 0
    RULE_contextDecl = 1
    RULE_decl = 2
    RULE_ontologyDecl = 3
    RULE_morphismDecl = 4
    RULE_mapStmt = 5
    RULE_pushoutDecl = 6

    ruleNames =  [ "program", "contextDecl", "decl", "ontologyDecl", "morphismDecl", 
                   "mapStmt", "pushoutDecl" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    T__4=5
    T__5=6
    T__6=7
    T__7=8
    T__8=9
    T__9=10
    T__10=11
    T__11=12
    T__12=13
    ID=14
    WS=15
    LINE_COMMENT=16
    BLOCK_COMMENT=17

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ProgramContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EOF(self):
            return self.getToken(ContextOntoParser.EOF, 0)

        def contextDecl(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(ContextOntoParser.ContextDeclContext)
            else:
                return self.getTypedRuleContext(ContextOntoParser.ContextDeclContext,i)


        def getRuleIndex(self):
            return ContextOntoParser.RULE_program

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterProgram" ):
                listener.enterProgram(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitProgram" ):
                listener.exitProgram(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitProgram" ):
                return visitor.visitProgram(self)
            else:
                return visitor.visitChildren(self)




    def program(self):

        localctx = ContextOntoParser.ProgramContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_program)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 17
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==1:
                self.state = 14
                self.contextDecl()
                self.state = 19
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 20
            self.match(ContextOntoParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ContextDeclContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return ContextOntoParser.RULE_contextDecl

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class ContextDeclarationContext(ContextDeclContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a ContextOntoParser.ContextDeclContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ID(self):
            return self.getToken(ContextOntoParser.ID, 0)
        def decl(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(ContextOntoParser.DeclContext)
            else:
                return self.getTypedRuleContext(ContextOntoParser.DeclContext,i)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterContextDeclaration" ):
                listener.enterContextDeclaration(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitContextDeclaration" ):
                listener.exitContextDeclaration(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitContextDeclaration" ):
                return visitor.visitContextDeclaration(self)
            else:
                return visitor.visitChildren(self)



    def contextDecl(self):

        localctx = ContextOntoParser.ContextDeclContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_contextDecl)
        self._la = 0 # Token type
        try:
            localctx = ContextOntoParser.ContextDeclarationContext(self, localctx)
            self.enterOuterAlt(localctx, 1)
            self.state = 22
            self.match(ContextOntoParser.T__0)
            self.state = 23
            self.match(ContextOntoParser.ID)
            self.state = 24
            self.match(ContextOntoParser.T__1)
            self.state = 28
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while (((_la) & ~0x3f) == 0 and ((1 << _la) & 304) != 0):
                self.state = 25
                self.decl()
                self.state = 30
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 31
            self.match(ContextOntoParser.T__2)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class DeclContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def ontologyDecl(self):
            return self.getTypedRuleContext(ContextOntoParser.OntologyDeclContext,0)


        def morphismDecl(self):
            return self.getTypedRuleContext(ContextOntoParser.MorphismDeclContext,0)


        def pushoutDecl(self):
            return self.getTypedRuleContext(ContextOntoParser.PushoutDeclContext,0)


        def getRuleIndex(self):
            return ContextOntoParser.RULE_decl

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterDecl" ):
                listener.enterDecl(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitDecl" ):
                listener.exitDecl(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitDecl" ):
                return visitor.visitDecl(self)
            else:
                return visitor.visitChildren(self)




    def decl(self):

        localctx = ContextOntoParser.DeclContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_decl)
        try:
            self.state = 36
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [4]:
                self.enterOuterAlt(localctx, 1)
                self.state = 33
                self.ontologyDecl()
                pass
            elif token in [5]:
                self.enterOuterAlt(localctx, 2)
                self.state = 34
                self.morphismDecl()
                pass
            elif token in [8]:
                self.enterOuterAlt(localctx, 3)
                self.state = 35
                self.pushoutDecl()
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class OntologyDeclContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return ContextOntoParser.RULE_ontologyDecl

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class OntologyDeclarationContext(OntologyDeclContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a ContextOntoParser.OntologyDeclContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ID(self, i:int=None):
            if i is None:
                return self.getTokens(ContextOntoParser.ID)
            else:
                return self.getToken(ContextOntoParser.ID, i)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterOntologyDeclaration" ):
                listener.enterOntologyDeclaration(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitOntologyDeclaration" ):
                listener.exitOntologyDeclaration(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitOntologyDeclaration" ):
                return visitor.visitOntologyDeclaration(self)
            else:
                return visitor.visitChildren(self)



    def ontologyDecl(self):

        localctx = ContextOntoParser.OntologyDeclContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_ontologyDecl)
        self._la = 0 # Token type
        try:
            localctx = ContextOntoParser.OntologyDeclarationContext(self, localctx)
            self.enterOuterAlt(localctx, 1)
            self.state = 38
            self.match(ContextOntoParser.T__3)
            self.state = 39
            self.match(ContextOntoParser.ID)
            self.state = 40
            self.match(ContextOntoParser.T__1)
            self.state = 44
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==14:
                self.state = 41
                self.match(ContextOntoParser.ID)
                self.state = 46
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 47
            self.match(ContextOntoParser.T__2)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class MorphismDeclContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return ContextOntoParser.RULE_morphismDecl

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class MorphismDeclarationContext(MorphismDeclContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a ContextOntoParser.MorphismDeclContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ID(self, i:int=None):
            if i is None:
                return self.getTokens(ContextOntoParser.ID)
            else:
                return self.getToken(ContextOntoParser.ID, i)
        def mapStmt(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(ContextOntoParser.MapStmtContext)
            else:
                return self.getTypedRuleContext(ContextOntoParser.MapStmtContext,i)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterMorphismDeclaration" ):
                listener.enterMorphismDeclaration(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitMorphismDeclaration" ):
                listener.exitMorphismDeclaration(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitMorphismDeclaration" ):
                return visitor.visitMorphismDeclaration(self)
            else:
                return visitor.visitChildren(self)



    def morphismDecl(self):

        localctx = ContextOntoParser.MorphismDeclContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_morphismDecl)
        self._la = 0 # Token type
        try:
            localctx = ContextOntoParser.MorphismDeclarationContext(self, localctx)
            self.enterOuterAlt(localctx, 1)
            self.state = 49
            self.match(ContextOntoParser.T__4)
            self.state = 50
            self.match(ContextOntoParser.ID)
            self.state = 51
            self.match(ContextOntoParser.T__5)
            self.state = 52
            self.match(ContextOntoParser.ID)
            self.state = 53
            self.match(ContextOntoParser.T__6)
            self.state = 54
            self.match(ContextOntoParser.ID)
            self.state = 55
            self.match(ContextOntoParser.T__1)
            self.state = 59
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==14:
                self.state = 56
                self.mapStmt()
                self.state = 61
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 62
            self.match(ContextOntoParser.T__2)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class MapStmtContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return ContextOntoParser.RULE_mapStmt

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class MapStatementContext(MapStmtContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a ContextOntoParser.MapStmtContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ID(self, i:int=None):
            if i is None:
                return self.getTokens(ContextOntoParser.ID)
            else:
                return self.getToken(ContextOntoParser.ID, i)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterMapStatement" ):
                listener.enterMapStatement(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitMapStatement" ):
                listener.exitMapStatement(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitMapStatement" ):
                return visitor.visitMapStatement(self)
            else:
                return visitor.visitChildren(self)



    def mapStmt(self):

        localctx = ContextOntoParser.MapStmtContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_mapStmt)
        try:
            localctx = ContextOntoParser.MapStatementContext(self, localctx)
            self.enterOuterAlt(localctx, 1)
            self.state = 64
            self.match(ContextOntoParser.ID)
            self.state = 65
            self.match(ContextOntoParser.T__6)
            self.state = 66
            self.match(ContextOntoParser.ID)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class PushoutDeclContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return ContextOntoParser.RULE_pushoutDecl

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class PushoutDeclarationContext(PushoutDeclContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a ContextOntoParser.PushoutDeclContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def ID(self, i:int=None):
            if i is None:
                return self.getTokens(ContextOntoParser.ID)
            else:
                return self.getToken(ContextOntoParser.ID, i)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterPushoutDeclaration" ):
                listener.enterPushoutDeclaration(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitPushoutDeclaration" ):
                listener.exitPushoutDeclaration(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitPushoutDeclaration" ):
                return visitor.visitPushoutDeclaration(self)
            else:
                return visitor.visitChildren(self)



    def pushoutDecl(self):

        localctx = ContextOntoParser.PushoutDeclContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_pushoutDecl)
        try:
            localctx = ContextOntoParser.PushoutDeclarationContext(self, localctx)
            self.enterOuterAlt(localctx, 1)
            self.state = 68
            self.match(ContextOntoParser.T__7)
            self.state = 69
            self.match(ContextOntoParser.ID)
            self.state = 70
            self.match(ContextOntoParser.T__8)
            self.state = 71
            self.match(ContextOntoParser.T__9)
            self.state = 72
            self.match(ContextOntoParser.T__10)
            self.state = 73
            self.match(ContextOntoParser.ID)
            self.state = 74
            self.match(ContextOntoParser.T__11)
            self.state = 75
            self.match(ContextOntoParser.ID)
            self.state = 76
            self.match(ContextOntoParser.T__12)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





