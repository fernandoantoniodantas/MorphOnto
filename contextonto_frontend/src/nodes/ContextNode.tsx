// src/nodes/ContextNode.tsx
import React from "react";
import type { NodeProps } from "reactflow";

export interface ContextNodeData {
  id: string;
  label: string;
  mode: "context";
  onContextMenu?: (e: React.MouseEvent, id: string) => void;
}

export default function ContextNode({ data }: NodeProps<ContextNodeData>) {
  const color = "#2b8a3e"; // verde

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

        pointerEvents: "none",   // ⭐ fundamental (não bloquear edges)
      }}
    >
      {/* título */}
      <div
        style={{
          pointerEvents: "auto",   // permite contexto/renomear/excluir
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

      {/* área interna do grupo */}
      <div
        style={{
          flex: 1,
          pointerEvents: "none",   // permite que conceitos recebam cliques
        }}
      />
    </div>
  );
}
