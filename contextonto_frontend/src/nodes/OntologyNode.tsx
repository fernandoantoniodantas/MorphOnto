import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function OntologyNode({ data }: NodeProps) {
  return (
    <div style={{
      padding: "10px 14px",
      background: "#d1e7dd",
      border: "2px solid #86c2a5",
      borderRadius: "10px",
      fontWeight: "bold",
      color: "#0d4628",
      minWidth: "130px",
      textAlign: "center",
      position: "relative"
    }}>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#198754", width: 10, height: 10 }}
      />

      🟢 {data.label}

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#198754", width: 10, height: 10 }}
      />

    </div>
  );
}
