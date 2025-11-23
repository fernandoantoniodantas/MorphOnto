import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function ContextNode({ data }: NodeProps) {
  return (
    <div style={{
      padding: "10px 14px",
      background: "#cfe2ff",
      border: "2px solid #84b0f2",
      borderRadius: "10px",
      fontWeight: "bold",
      color: "#0a3e78",
      minWidth: "130px",
      textAlign: "center",
      position: "relative"
    }}>
      
      {/* Handle de saída */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#0d6efd", width: 10, height: 10 }}
      />

      📘 {data.label}

      {/* Handle de entrada */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#0d6efd", width: 10, height: 10 }}
      />
    </div>
  );
}
