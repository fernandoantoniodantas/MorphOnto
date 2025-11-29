import { Handle, Position } from "reactflow";

interface NodeProps {
  data: { label: string };
}

export default function ContextNode({ data }: NodeProps) {
  return (
    <div
      style={{
        padding: "12px 18px",
        background: "#cfe2ff",
        border: "2px solid #84b0f2",
        borderRadius: "12px",
        fontWeight: "bold",
        color: "#0a3e78",
        minWidth: "200px",
        minHeight: "60px",
        textAlign: "center",
        fontSize: "16px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        position: "relative"
      }}
    >

      {/* TOP HANDLES */}
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />

      {/* RIGHT HANDLES */}
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />

      {/* LABEL */}
      📘 {data.label}

      {/* LEFT HANDLES */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />

      {/* BOTTOM HANDLES */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        style={{ background: "#0d6efd", width: 12, height: 12 }}
      />

    </div>
  );
}
