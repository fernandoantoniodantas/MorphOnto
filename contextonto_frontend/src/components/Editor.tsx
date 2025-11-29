import React, { useState, useCallback } from "react";
import "../styles/editor.css";

import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import OutputPanel from "./OutputPanel";

import type { Node, Edge } from "reactflow";

import { generateCtx } from "../utils/generateCtx";

export default function Editor() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [ctxOutput, setCtxOutput] = useState("");
  const [owlOutput, setOwlOutput] = useState("");
  const [dotOutput, setDotOutput] = useState("");

  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    nodeId: null as string | null
  });

  const handleNodeContextMenu = useCallback((event: any, node: Node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id
    });
  }, []);

  const closeContextMenu = () =>
    setContextMenu({ x: 0, y: 0, nodeId: null });

  const renameNode = () => {
    if (!contextMenu.nodeId) return;
    const newName = prompt("Novo nome:");
    if (!newName) return;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === contextMenu.nodeId
          ? { ...n, data: { ...n.data, label: newName } }
          : n
      )
    );
    closeContextMenu();
  };

  const deleteNode = () => {
    if (!contextMenu.nodeId) return;

    setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));
    setEdges((eds) =>
      eds.filter(
        (e) =>
          e.source !== contextMenu.nodeId &&
          e.target !== contextMenu.nodeId
      )
    );
    closeContextMenu();
  };

  const handleAddNode = useCallback(
    (type: string) => {
      if (type === "context") {
        const exists = nodes.some((n) => n.type === "context");
        if (exists) {
          alert("Só é permitido um único contexto.");
          return;
        }
      }

      const id = `${type}_${nodes.length + 1}`;
      const newNode: Node = {
        id,
        type,
        data: { label: `${type} ${nodes.length + 1}` },
        position: { x: 200, y: 120 + nodes.length * 80 }
      };

      setNodes((prev) => [...prev, newNode]);
    },
    [nodes]
  );

  const handleGenerateCtx = () => {
    const text = generateCtx(nodes, edges);
    setCtxOutput(text);
  };

  const compileBackend = async () => {
    const ctx = generateCtx(nodes, edges);

    const resp = await fetch("http://localhost:5001/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ctx })
    });

    const data = await resp.json();

    if (data.success) {
      setOwlOutput(data.owl || "Sem OWL");
      setDotOutput(data.dot || "Sem DOT");
    } else {
      setOwlOutput("Erro ao gerar OWL:\n" + data.errors);
      setDotOutput("");
    }
  };

  return (
    <div className="editor-container" onClick={closeContextMenu}>

      <Sidebar
        onAddNode={handleAddNode}
        onGenerateCtx={handleGenerateCtx}
        onCompile={compileBackend}
      />

      <Canvas
        nodes={nodes}
        edges={edges}
        setNodes={setNodes}
        setEdges={setEdges}
        onNodeContextMenu={handleNodeContextMenu}
      />

      <OutputPanel
        ctxText={ctxOutput}
        owlText={owlOutput}
        dotText={dotOutput}
      />

      {contextMenu.nodeId && (
        <div
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            background: "white",
            border: "1px solid #ccc",
            padding: "6px",
            zIndex: 999,
            borderRadius: "4px"
          }}
        >
          <div
            style={{ padding: "4px 8px", cursor: "pointer" }}
            onClick={renameNode}
          >
            Renomear
          </div>

          <div
            style={{ padding: "4px 8px", cursor: "pointer", color: "red" }}
            onClick={deleteNode}
          >
            Excluir
          </div>
        </div>
      )}
    </div>
  );
}
