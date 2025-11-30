// src/components/Editor.tsx
import React, { useState, useCallback } from "react";
import type { Node, Edge } from "reactflow";

import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import ContextMenu from "./ContextMenu";
import { generateCtx } from "../utils/generateCtx";

// ---------------------------------------------
// TYPES
// ---------------------------------------------
type CompileResponse = {
  owl?: string;
  dot?: string;
  error?: string;
};

// Gera ID único
function createNodeId(): string {
  return `node_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function Editor() {
  // ---------------------------------------------
  // ESTADOS GLOBAIS
  // ---------------------------------------------
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const [ctxText, setCtxText] = useState("");
  const [owlText, setOwlText] = useState("");
  const [dotText, setDotText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  // ---------------------------------------------
  // CONTEXT MENU STATE
  // ---------------------------------------------
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const openContextMenu = useCallback((event: React.MouseEvent, nodeId: string) => {
    event.preventDefault();
    setMenuPos({ x: event.clientX, y: event.clientY });
    setSelectedNodeId(nodeId);
    setMenuVisible(true);
  }, []);

  const closeContextMenu = useCallback(() => {
    setMenuVisible(false);
    setSelectedNodeId(null);
  }, []);

  // ---------------------------------------------
  // RENOMEAR NODE
  // ---------------------------------------------
  const handleRename = useCallback(
    (id: string) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return;

      const novoNome = prompt("Novo nome:", node.data.label);
      if (!novoNome) return;

      setNodes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: novoNome } } : n))
      );

      closeContextMenu();
    },
    [nodes, closeContextMenu]
  );

  // ---------------------------------------------
  // EXCLUIR NODE
  // ---------------------------------------------
  const handleDelete = useCallback(
    (id: string) => {
      setNodes((prev) => prev.filter((n) => n.id !== id));
      setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
      closeContextMenu();
    },
    [closeContextMenu]
  );

  // ---------------------------------------------
  // ADICIONAR CONCEITO DENTRO DA ONTOLOGIA
  // ---------------------------------------------
  const handleAddConceptInside = useCallback(
    (ontoId: string) => {
      const id = createNodeId();

      const newConcept: Node = {
        id,
        type: "concept",
        parentNode: ontoId,
        extent: "parent",
        position: { x: 30, y: 60 },
        data: {
          label: `Concept_${id.slice(-4)}`
        }
      };

      setNodes((prev) => [...prev, newConcept]);
      closeContextMenu();
    },
    [closeContextMenu]
  );

  // ---------------------------------------------
  // ADICIONAR NÓS (sidebar)
  // ---------------------------------------------
  const handleAddNode = useCallback(
    (kind: string) => {
      const baseX = 100 + nodes.length * 30;
      const baseY = 80 + nodes.length * 20;

      if (kind === "entity") {
        const id = createNodeId();
        const newNode: Node = {
          id,
          type: "ontology",
          position: { x: baseX, y: baseY },
          data: {
            id, // ⭐ fundamental
            label: "EntityOntology",
            mode: "entity",
            onContextMenu: openContextMenu
          }
        };
        setNodes((prev) => [...prev, newNode]);
        return;
      }

      if (kind === "context") {
        const id = createNodeId();
        const newNode: Node = {
          id,
          type: "context",
          position: { x: baseX + 200, y: baseY },
          data: {
            id,
            label: "ContextOntology",
            mode: "context",
            onContextMenu: openContextMenu
          }
        };
        setNodes((prev) => [...prev, newNode]);
        return;
      }

      if (kind === "concept") {
        const id = createNodeId();
        const newNode: Node = {
          id,
          type: "concept",
          position: { x: baseX + 120, y: baseY + 80 },
          data: {
            label: `Concept_${id.slice(-4)}`
          }
        };
        setNodes((prev) => [...prev, newNode]);
        return;
      }
    },
    [nodes, openContextMenu]
  );

  // ---------------------------------------------
  // GERAR CTX
  // ---------------------------------------------
  const handleGenerateCtx = useCallback(() => {
    const ctx = generateCtx(nodes, edges);
    setCtxText(ctx);
    setError(null);
  }, [nodes, edges]);

  // ---------------------------------------------
  // COMPILAR CTX → OWL/DOT
  // ---------------------------------------------
  const handleCompile = useCallback(async () => {
    try {
      setIsCompiling(true);
      setError(null);

      const ctx = ctxText.trim() || generateCtx(nodes, edges);

      if (!ctx.trim()) {
        setError("Nada para compilar.");
        setIsCompiling(false);
        return;
      }

      const resp = await fetch("http://localhost:8000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ctx })
      });

      if (!resp.ok) throw new Error("Erro no servidor.");

      const data = (await resp.json()) as CompileResponse;

      if (data.error) {
        setError(data.error);
        setOwlText("");
        setDotText("");
      } else {
        setOwlText(data.owl ?? "");
        setDotText(data.dot ?? "");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setIsCompiling(false);
    }
  }, [ctxText, nodes, edges]);

  // ---------------------------------------------
  // LAYOUT: 3 COLUNAS
  // ---------------------------------------------
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr 420px",
        height: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
    >
      {/* SIDEBAR */}
      <div style={{ borderRight: "1px solid #ddd", padding: 16, background: "#f8f9fa" }}>
        <Sidebar
          addEntityOntology={() => handleAddNode("entity")}
          addContextOntology={() => handleAddNode("context")}
          addConcept={() => handleAddNode("concept")}
          onGenerateCtx={handleGenerateCtx}
          onCompile={handleCompile}
        />
      </div>

      {/* CANVAS */}
      <div style={{ position: "relative" }}>
        <Canvas nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
      </div>

      {/* PAINEL DIREITO */}
      <div
        style={{
          borderLeft: "1px solid #ddd",
          padding: 12,
          overflowY: "auto",
          background: "#fafafa",
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}
      >
        <div>
          <label>CTX</label>
          <textarea value={ctxText} readOnly style={{ width: "100%", height: 180 }} />
        </div>

        <div>
          <label>OWL</label>
          <textarea value={owlText} readOnly style={{ width: "100%", height: 180 }} />
        </div>

        <div>
          <label>DOT</label>
          <textarea value={dotText} readOnly style={{ width: "100%", height: 180 }} />
        </div>

        <div style={{ fontSize: 12 }}>
          {isCompiling && "Compilando…"}
          {!isCompiling && !error && "Pronto."}
          {error && <span style={{ color: "#b00020" }}>Erro: {error}</span>}
        </div>
      </div>

      {/* CONTEXT MENU */}
      <ContextMenu
        x={menuPos.x}
        y={menuPos.y}
        visible={menuVisible}
        nodeId={selectedNodeId}
        onRename={handleRename}
        onDelete={handleDelete}
        onAddConcept={handleAddConceptInside}
        onClose={closeContextMenu}
      />
    </div>
  );
}
