// src/nodes/OntologyNode.tsx
import React from "react";
import type { NodeProps } from "reactflow";

export interface OntologyNodeData {
  id: string;
  label: string;
  mode: "entity" | "context";
  onContextMenu?: (e: React.MouseEvent, id: string) => void;
}

export default function OntologyNode({ data }: NodeProps<OntologyNodeData>) {
  const color = data.mode === "entity" ? "#256eff" : "#7c3aed";

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        data.onContextMenu?.(e, data.id);
      }}
      style={{
        position: "relative",
        width: 300,
        height: 220,
        boxSizing: "border-box",

        border: `3px solid ${color}`,
        borderRadius: 10,

        background: "transparent",

        display: "flex",
        flexDirection: "column",

        pointerEvents: "none",      // ⭐ NÃO BLOQUEAR CLIQUES
      }}
    >
      {/* título */}
      <div
        style={{
          pointerEvents: "auto",    // menu funciona
          userSelect: "none",
          background: color,
          color: "white",
          padding: "6px 10px",
          fontWeight: "bold",
          borderRadius: "6px 6px 0 0",
          fontSize: 13,
        }}
      >
        {data.label}
      </div>

      {/* área interna: VAZIA para conceitos */}
      <div
        style={{
          flex: 1,
          pointerEvents: "none",    // deixa conceitos clicáveis
        }}
      />
    </div>
  );
}
