import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function ConceptNode({ data }: NodeProps) {
  return (
    <div style={{
      padding: "10px 14px",
      background: "#fff3cd",
      border: "2px solid #ccb45d",
      borderRadius: "10px",
      fontWeight: "bold",
      color: "#7a5b00",
      minWidth: "130px",
      textAlign: "center",
      position: "relative"
    }}>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#cc9a06", width: 10, height: 10 }}
      />

      🟡 {data.label}

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#cc9a06", width: 10, height: 10 }}
      />

    </div>
  );
}
