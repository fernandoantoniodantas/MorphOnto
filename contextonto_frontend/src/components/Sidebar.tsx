import React from "react";

interface SidebarProps {
  onAddNode: (type: string) => void;
  onGenerateCtx: () => void;
  onCompile: () => void;
}

export default function Sidebar({
  onAddNode,
  onGenerateCtx,
  onCompile
}: SidebarProps) {
  return (
    <div
      className="sidebar"
      style={{
        width: "220px",
        padding: "20px",
        borderRight: "1px solid #ccc",
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>ContextOnto</h3>

      {/* criar CONTEXTO */}
      <button
        onClick={() => onAddNode("context")}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#e3f2fd",
          border: "1px solid #90caf9",
          borderRadius: "6px",
          fontWeight: "600"
        }}
      >
        + Add Context
      </button>

      {/* criar ONTOLOGIA */}
      <button
        onClick={() => onAddNode("ontology")}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#e8f5e9",
          border: "1px solid #a5d6a7",
          borderRadius: "6px",
          fontWeight: "600"
        }}
      >
        + Add Ontology
      </button>

      {/* criar CONCEITO */}
      <button
        onClick={() => onAddNode("concept")}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#fff8e1",
          border: "1px solid #ffe082",
          borderRadius: "6px",
          fontWeight: "600"
        }}
      >
        + Add Concept
      </button>

      <hr />

      {/* gerar ctx */}
      <button
        onClick={onGenerateCtx}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#e0e0e0",
          border: "1px solid #bdbdbd",
          borderRadius: "6px",
          fontWeight: "600"
        }}
      >
        Generate .ctx
      </button>

      {/* compilar */}
      <button
        onClick={onCompile}
        style={{
          padding: "10px",
          cursor: "pointer",
          background: "#d1c4e9",
          border: "1px solid #b39ddb",
          borderRadius: "6px",
          fontWeight: "600"
        }}
      >
        Compile (OWL + DOT)
      </button>
    </div>
  );
}
