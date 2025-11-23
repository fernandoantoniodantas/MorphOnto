import React, { useState, useCallback } from "react";
import "../styles/editor.css";

import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import OutputPanel from "./OutputPanel";
import type { Node, Edge } from "reactflow";

export default function Editor() {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [ctxOutput, setCtxOutput] = useState("");
  const [owlOutput, setOwlOutput] = useState("");
  const [dotOutput, setDotOutput] = useState("");

  // ------------------------------------------------------
  // MENU CONTEXTUAL
  // ------------------------------------------------------
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string | null;
  }>({ x: 0, y: 0, nodeId: null });

  const handleNodeContextMenu = useCallback((event: any, node: Node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  }, []);

  const closeContextMenu = () => {
    setContextMenu({ x: 0, y: 0, nodeId: null });
  };

  const deleteNode = () => {
    if (!contextMenu.nodeId) return;
    setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));
    closeContextMenu();
  };

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

  // ------------------------------------------------------
  // SANITIZAÇÃO: transforma labels em nomes válidos
  // ------------------------------------------------------
  const sanitizeName = (label: string) => {
    label = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    label = label.replace(/[^a-zA-Z0-9 ]/g, "");

    if (label.startsWith("Contexto")) return "Ctx" + label.replace(/\D/g, "");
    if (label.startsWith("Ontologia")) return "Ont" + label.replace(/\D/g, "");
    if (label.startsWith("Conceito")) return "Cpt" + label.replace(/\D/g, "");

    return label.replace(/\s+/g, "_");
  };

  // ------------------------------------------------------
  // SEMÂNTICA: validar morphisms
  // ------------------------------------------------------
  const isValidMorphism = (src: Node, tgt: Node) => {
    if (tgt.type === "Contexto") {
      if (src.type === "Ontologia" || src.type === "Conceito") {
        return true;
      }
    }
    return false;
  };

  // ------------------------------------------------------
  // Correção automática da direção do morphism
  // ENTIDADE -> CONTEXTO
  // ------------------------------------------------------
  const fixDirection = (src: Node, tgt: Node): [Node, Node] => {
    if (src.type === "Contexto" && tgt.type !== "Contexto") {
      return [tgt, src];
    }
    return [src, tgt];
  };

  // ------------------------------------------------------
  // GERAÇÃO DO .CTX (100% compatível com o compilador)
  // ------------------------------------------------------
  const generateCtx = () => {
    let output = "";

    const contextNodes = nodes.filter((n) => n.type === "Contexto");
    const ontologyNodes = nodes.filter((n) => n.type === "Ontologia");
    const conceptNodes = nodes.filter((n) => n.type === "Conceito");

    const contextName =
      contextNodes.length > 0
        ? sanitizeName(contextNodes[0].data.label)
        : "GeneratedContext";

    output += `context ${contextName} {\n`;

    // ------------------------------------------------------
    // CORREÇÃO IMPORTANTE: NÃO GERAR "{}"
    // ------------------------------------------------------
    ontologyNodes.forEach((ont) => {
      const name = sanitizeName(ont.data.label);
      output += `    ontology ${name} {\n`;
      output += `    }\n`;
    });

    conceptNodes.forEach((c) => {
      const name = sanitizeName(c.data.label);
      output += `    concept ${name};\n`;
    });

    edges.forEach((e) => {
      const src = nodes.find((n) => n.id === e.source);
      const tgt = nodes.find((n) => n.id === e.target);

      if (!src || !tgt) return;
      if (src.type === "Pushout" || tgt.type === "Pushout") return;

      let [srcNode, tgtNode] = fixDirection(src, tgt);

      if (!isValidMorphism(srcNode, tgtNode)) return;

      const srcName = sanitizeName(srcNode.data.label);
      const tgtName = sanitizeName(tgtNode.data.label);

      output += `    morphism ${srcName} -> ${tgtName};\n`;
    });

    output += "}\n";

    return output;
  };

  const handleGenerateCtx = () => {
    const text = generateCtx();
    setCtxOutput(text);
  };

  // ------------------------------------------------------
  // COMPILAR NO BACKEND
  // ------------------------------------------------------
  const compileBackend = async () => {
    const ctxText = generateCtx();

    const resp = await fetch("http://localhost:5001/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ctx: ctxText })
    });

    const data = await resp.json();

    if (data.success) {
      setOwlOutput(data.owl);
      setDotOutput(data.dot);
    } else {
      setOwlOutput("Erro ao gerar OWL:\n" + data.errors);
      setDotOutput("");
    }
  };

  // ------------------------------------------------------
  // ADICIONAR NÓS
  // ------------------------------------------------------
  const handleAddNode = useCallback((type: string) => {
    const id = `${type}_${nodes.length + 1}`;

    const newNode: Node = {
      id,
      type,
      position: { x: 150, y: 80 + nodes.length * 80 },
      data: { label: `${type} ${nodes.length + 1}` }
    };

    setNodes((nds) => [...nds, newNode]);

  }, [nodes]);

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
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
            style={{
              padding: "4px 8px",
              cursor: "pointer",
              color: "red"
            }}
            onClick={deleteNode}
          >
            Excluir
          </div>
        </div>
      )}
    </div>
  );
}
