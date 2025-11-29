import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function ConceptNode({ data }: NodeProps) {
  return (
    <div
      style={{
        padding: "12px 16px",
        background: "#fff3cd",
        border: "2px solid #c9a84c",
        borderRadius: "10px",
        fontWeight: "600",
        color: "#7a5b00",
        minWidth: "150px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.15)"
      }}
    >
      {/* Saída */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#cc9a06",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />

      🟨 {data.label}

      {/* Entrada */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#cc9a06",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
