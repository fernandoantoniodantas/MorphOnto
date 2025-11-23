# compiler_adapter.py — versão com enriquecimento automático (o usuário não precisa definir classes/axiomas manualmente dentro do conceito e da ontologia)

import sys
from pathlib import Path

# ------------------------------------------------------------
# Adiciona a raiz do projeto ao PYTHONPATH
# ------------------------------------------------------------
ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT))

# ------------------------------------------------------------
# Imports do compilador
# ------------------------------------------------------------
from compiler.core.parse_file import parse_ctx_file
from compiler.generators.generate_owl import generate_owl
from compiler.generators.generate_dot import generate_dot


# ------------------------------------------------------------
# ENRIQUECIMENTO AUTOMÁTICO DO MODELO (Opção A)
# ------------------------------------------------------------
def enrich_model(model):
    """
    Opção A — enriquecimento automático:
      - Toda Ontologia vira uma OWL Class
      - Todo Conceito vira uma OWL Class
      - Todo Contexto vira uma OWL Class
      - Morphisms viram axiomas rdfs:subClassOf
    """

    # 1) Criar OWL classes para todos os objetos
    for obj in model.objects:
        model.add_class(obj)

    # 2) Transformar morphisms em subClassOf
    for (src, tgt) in model.morphisms:
        model.add_subclass(src, tgt)

    return model


# ------------------------------------------------------------
# Função principal usada pela API Flask
# ------------------------------------------------------------
def compile_ctx(ctx_text: str, is_text=True):
    """
    Compila um código ContextOnto (texto).
    Retorna OWL, DOT e erros.
    """

    try:
        # 1) Parsing
        model = parse_ctx_file(None, ctx_text=ctx_text)

        # 2) Aplicar enriquecimento automático
        model = enrich_model(model)

        # 3) Gerar OWL
        owl_output = generate_owl(model)

        # 4) Gerar DOT
        dot_output = generate_dot(model)

        return {
            "success": True,
            "owl": owl_output,
            "dot": dot_output,
            "errors": None
        }

    except Exception as e:
        return {
            "success": False,
            "owl": None,
            "dot": None,
            "errors": str(e)
        }
