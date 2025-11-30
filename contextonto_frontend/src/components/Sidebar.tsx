import React, { useState } from "react";

interface SidebarProps {
  addEntityOntology: () => void;
  addContextOntology: () => void;
  addConcept: () => void;
  onGenerateCtx: () => void;
  onCompile: () => void;
}

export default function Sidebar({
  addEntityOntology,
  addContextOntology,
  addConcept,
  onGenerateCtx,
  onCompile
}: SidebarProps) {
  return (
    <div
      style={{
        width: "260px",
        padding: "20px",
        borderRight: "1px solid #ccc",
        background: "#fafafa"
      }}
    >
      <h2>Adicionar Nós</h2>

      <button
        onClick={addEntityOntology}
        style={{
          width: "100%",
          padding: "14px",
          background: "#256eff",
          color: "white",
          borderRadius: "8px",
          marginBottom: "12px",
          fontSize: "17px",
          fontWeight: "600"
        }}
      >
        + Ontologia da Entidade (E)
      </button>

      <button
        onClick={addContextOntology}
        style={{
          width: "100%",
          padding: "14px",
          background: "#2b8a3e",
          color: "white",
          borderRadius: "8px",
          marginBottom: "12px",
          fontSize: "17px",
          fontWeight: "600"
        }}
      >
        + Ontologia de Contexto (C)
      </button>

      <button
        onClick={addConcept}
        style={{
          width: "100%",
          padding: "14px",
          background: "#6c2bd2",
          color: "white",
          borderRadius: "8px",
          marginBottom: "22px",
          fontSize: "17px",
          fontWeight: "600"
        }}
      >
        + Conceito
      </button>

      <h2>Operações</h2>

      <button
        onClick={onGenerateCtx}
        style={{
          width: "100%",
          padding: "14px",
          background: "#0ea5e9",
          color: "white",
          borderRadius: "8px",
          marginBottom: "12px",
          fontSize: "17px",
          fontWeight: "600"
        }}
      >
        Gerar .CTX (modelo)
      </button>

      <button
        onClick={onCompile}
        style={{
          width: "100%",
          padding: "14px",
          background: "#f97316",
          color: "white",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: "600"
        }}
      >
        Compilar (OWL / DOT)
      </button>
    </div>
  );
}
