import React, { useState } from "react";

interface OutputPanelProps {
  ctxText: string;
  owlText: string;
  dotText: string;
}

export default function OutputPanel({
  ctxText,
  owlText,
  dotText
}: OutputPanelProps) {
  const [tab, setTab] = useState<"ctx" | "owl" | "dot">("ctx");

  const activeStyle = {
    background: "#0d6efd",
    color: "white"
  };

  const baseStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderBottom: "none",
    fontWeight: "600",
    background: "#f1f1f1"
  };

  const renderContent = () => {
    if (tab === "ctx") return ctxText;
    if (tab === "owl") return owlText;
    return dotText;
  };

  return (
    <div
      style={{
        width: "33%",
        borderLeft: "1px solid #ccc",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* === Tabs === */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        <div
          style={{
            ...baseStyle,
            ...(tab === "ctx" ? activeStyle : {})
          }}
          onClick={() => setTab("ctx")}
        >
          .CTX
        </div>

        <div
          style={{
            ...baseStyle,
            ...(tab === "owl" ? activeStyle : {})
          }}
          onClick={() => setTab("owl")}
        >
          OWL
        </div>

        <div
          style={{
            ...baseStyle,
            ...(tab === "dot" ? activeStyle : {})
          }}
          onClick={() => setTab("dot")}
        >
          DOT
        </div>
      </div>

      {/* === TEXT AREA === */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          fontFamily: "monospace",
          fontSize: "13px",
          background: "#fafafa",
          whiteSpace: "pre-wrap",
          lineHeight: "1.4"
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}
