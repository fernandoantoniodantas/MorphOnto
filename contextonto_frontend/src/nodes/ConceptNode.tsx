import React from "react";
import { Handle, Position } from "reactflow";
import type { NodeProps } from "reactflow";

export interface ConceptNodeData {
  label: string;
}

export default function ConceptNode({ data }: NodeProps<ConceptNodeData>) {
  return (
    <div
      style={{
        width: "90px",
        minHeight: "36px",
        padding: "6px 8px",
        boxSizing: "border-box",

        background: "#6c2bd2",
        color: "white",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "grab",
        position: "relative",

        zIndex: 100,          // ⭐ garante que fica acima da ontologia
        pointerEvents: "auto" // ⭐ para poder clicar e arrastar normalmente
      }}
    >
      {data.label}

      {/* HANDLE DE ENTRADA */}
      <Handle
        type="target"
        id="in"
        position={Position.Top}
        style={{
          width: 10,
          height: 10,
          background: "white",
          border: "2px solid black",
          borderRadius: "50%",
          cursor: "crosshair",

          position: "absolute",
          top: -6,

          zIndex: 200,         // ⭐ obrigatoriamente NA FRENTE
          pointerEvents: "auto",
        }}
      />

      {/* HANDLE DE SAÍDA */}
      <Handle
        type="source"
        id="out"
        position={Position.Bottom}
        style={{
          width: 10,
          height: 10,
          background: "white",
          border: "2px solid black",
          borderRadius: "50%",
          cursor: "crosshair",

          position: "absolute",
          bottom: -6,

          zIndex: 200,         // ⭐ idem
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
