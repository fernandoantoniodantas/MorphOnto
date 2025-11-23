import sys
from pathlib import Path

# ============================
# Corrige o caminho do projeto
# ============================
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# Agora os imports funcionam
from compiler.core.parse_file import parse_ctx_file
from compiler.generators.generate_owl import generate_owl
from compiler.generators.generate_dot import generate_dot

print("### Lendo arquivo .ctx...")

program = parse_ctx_file(path="tests/context_test.ctx")

print("\n### Estrutura Interna dos Contextos ###")
for ctx_name, ctx in program.contexts.items():
    print("-", ctx_name)
    print("   Ontologias:", list(ctx.ontologies.keys()))
    print("   Morfismos:", list(ctx.morphisms.keys()))
    print("   Pushouts:", [p.name for p in ctx.pushouts])
    print()

print("\n### OWL/Turtle ###")
print(generate_owl(program))

print("\n### DOT ###")
print(generate_dot(program))
