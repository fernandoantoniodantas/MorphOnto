import sys
import os

# adiciona o diretório pai (onde está compiler/)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
sys.path.append(PARENT_DIR)

from compiler.core.parse_file import parse_ctx_file
from compiler.generators.generate_owl import generate_owl
from compiler.generators.generate_dot import generate_dot

print("### Parsing ###")
program = parse_ctx_file(path=os.path.join(CURRENT_DIR, "pushout_test.ctx"))

# compute pushouts
for ctx in program.contexts.values():
    for po in ctx.pushouts:
        program.compute_pushout(ctx, po)

print("\n### OWL ###")
print(generate_owl(program))

print("\n### DOT ###")
print(generate_dot(program))
