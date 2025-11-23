from antlr4 import FileStream, InputStream, CommonTokenStream

from compiler.grammar.ContextOntoLexer import ContextOntoLexer
from compiler.grammar.ContextOntoParser import ContextOntoParser

from compiler.core.visitor import ContextOntoModelBuilder


def parse_ctx_file(path=None, ctx_text=None):
    """
    Retorna um ContextProgram contendo:
       - contexts
       - ontologies
       - morphisms
       - pushouts
    """

    if ctx_text is not None:
        input_stream = InputStream(ctx_text)
    else:
        input_stream = FileStream(path, encoding="utf-8")

    lexer = ContextOntoLexer(input_stream)
    tokens = CommonTokenStream(lexer)
    parser = ContextOntoParser(tokens)

    tree = parser.program()

    visitor = ContextOntoModelBuilder()
    program = visitor.visit(tree)

    return program
