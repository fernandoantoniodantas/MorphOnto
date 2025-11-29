import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function OntologyNode({ data }: NodeProps) {
  return (
    <div
      style={{
        padding: "12px 16px",
        background: "#d1e7dd",
        border: "2px solid #86c2a5",
        borderRadius: "10px",
        fontWeight: "600",
        color: "#0f5132",
        minWidth: "150px",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
      }}
    >
      {/* Saída */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#198754",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />

      🟩 {data.label}

      {/* Entrada */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#198754",
          width: 12,
          height: 12,
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
