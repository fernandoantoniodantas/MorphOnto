import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function PushoutNode({ data }: NodeProps) {
  return (
    <div style={{
      background: "#fde2e4",
      border: "2px solid #f59ca9",
      color: "#7a0024",
      width: "110px",
      height: "110px",
      borderRadius: "50%",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      position: "relative"
    }}>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#c9184a", width: 10, height: 10 }}
      />

      🔶 {data.label}

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#c9184a", width: 10, height: 10 }}
      />

    </div>
  );
}
