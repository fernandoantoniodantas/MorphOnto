import React, { useState, useEffect } from "react";
import Prism from "prismjs";

// Importar os temas básicos do Prism
import "prismjs/themes/prism.css";

// Importar linguagens específicas (usamos markup como fallback)
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-turtle.js";   // útil para OWL RDF/Turtle
import "prismjs/components/prism-json.js";

interface OutputPanelProps {
  ctxText: string;
  owlText: string;
  dotText: string;
}

export default function OutputPanel({
  ctxText,
  owlText,
  dotText
}: OutputPanelProps) {
  const [tab, setTab] = useState<"ctx" | "owl" | "dot">("ctx");
  const [highlighted, setHighlighted] = useState("");

  const styles = {
    tabActive: {
      background: "#0d6efd",
      color: "white"
    },
    tabBase: {
      padding: "8px 12px",
      cursor: "pointer",
      border: "1px solid #ccc",
      borderBottom: "none",
      background: "#f1f1f1",
      fontWeight: 600
    }
  };

  // ==== SELECIONA O TEXTO CORRETO ====
  const rawText = tab === "ctx" ? ctxText : tab === "owl" ? owlText : dotText;

  // ==== REALIZA O HIGHLIGHT COM FALLBACK ====
  useEffect(() => {
    try {
      const lang =
        tab === "owl"
          ? "turtle"
          : tab === "dot"
          ? "markup"
          : "js"; // ctx → usa sintaxe tipo DSL

      const grammar = Prism.languages[lang] || Prism.languages.markup;
      const result = Prism.highlight(rawText, grammar, lang);
      setHighlighted(result);
    } catch (err) {
      // fallback simples
      setHighlighted(rawText);
    }
  }, [tab, rawText]);

  return (
    <div
      style={{
        width: "33%",
        borderLeft: "1px solid #ccc",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* === TABS === */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        <div
          style={{
            ...styles.tabBase,
            ...(tab === "ctx" ? styles.tabActive : {})
          }}
          onClick={() => setTab("ctx")}
        >
          .CTX
        </div>

        <div
          style={{
            ...styles.tabBase,
            ...(tab === "owl" ? styles.tabActive : {})
          }}
          onClick={() => setTab("owl")}
        >
          OWL
        </div>

        <div
          style={{
            ...styles.tabBase,
            ...(tab === "dot" ? styles.tabActive : {})
          }}
          onClick={() => setTab("dot")}
        >
          DOT
        </div>
      </div>

      {/* === ÁREA DE TEXTO COM PRISM === */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          background: "#fafafa",
          overflowY: "auto",
          fontSize: "14px"
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: "monospace",
            whiteSpace: "pre-wrap"
          }}
        >
          <code
            className="language-markup"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  );
}
