import sys
from core.parse_file import parse_file
from generators.generate_owl import generate_turtle
from generators.generate_dot import generate_dot

def main():
    if len(sys.argv) < 2:
        print("Uso: python cli.py arquivo.ctx")
        return

    program = parse_file(sys.argv[1])

    ttl = generate_turtle(program)
    dot = generate_dot(program)

    with open("out.owl.ttl", "w") as f:
        f.write(ttl)
    with open("out.dot", "w") as f:
        f.write(dot)

    print("Gerado: out.owl.ttl e out.dot")

if __name__ == "__main__":
    main()
