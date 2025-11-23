import React from "react";
import "../styles/palette.css";

export default function Palette() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="palette">
      <h4>Elementos</h4>

      <div className="palette-item"
           draggable
           onDragStart={(e) => onDragStart(e, "context")}>
        Context
      </div>

      <div className="palette-item"
           draggable
           onDragStart={(e) => onDragStart(e, "ontology")}>
        Ontology
      </div>

      <div className="palette-item"
           draggable
           onDragStart={(e) => onDragStart(e, "concept")}>
        Concept
      </div>

      <div className="palette-item"
           draggable
           onDragStart={(e) => onDragStart(e, "pushout")}>
        Pushout
      </div>
    </div>
  );
}
