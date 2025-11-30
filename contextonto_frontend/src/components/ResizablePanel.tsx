import React from "react";
import type { ReactNode } from "react";

export interface ResizablePanelProps {
  left: ReactNode;
  right: ReactNode;
}

export default function ResizablePanel({ left, right }: ResizablePanelProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ flex: 2, borderRight: "1px solid #ccc" }}>
        {left}
      </div>

      <div style={{ flex: 1 }}>
        {right}
      </div>
    </div>
  );
}
