# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from compiler_adapter import compile_ctx

app = Flask(__name__)
CORS(app)

@app.route("/compile", methods=["POST"])
def compile_endpoint():
    """
    Espera:
    {
        "ctx": "...texto do arquivo..."
    }
    ou
    upload multipart/form-data
    """

    # JSON direto
    if request.is_json:
        data = request.get_json()
        ctx_text = data.get("ctx", "")
        result = compile_ctx(ctx_text, is_text=True)
        return jsonify(result)

    # Upload de arquivo .ctx
    if "file" in request.files:
        file = request.files["file"]
        ctx_text = file.read().decode("utf-8")
        result = compile_ctx(ctx_text, is_text=True)
        return jsonify(result)

    return jsonify({"success": False, "errors": "Nenhum arquivo ou JSON enviado."}), 400


@app.route("/")
def index():
    return jsonify({
        "message": "ContextOnto API ativa",
        "endpoints": ["/compile"]
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
