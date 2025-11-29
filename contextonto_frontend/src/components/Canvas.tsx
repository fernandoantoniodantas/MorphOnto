import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeTypes
} from "reactflow";

import "reactflow/dist/style.css";

// === IMPORTAR SEUS COMPONENTES DE NÓ ===
import ContextNode from "../nodes/ContextNode";
import OntologyNode from "../nodes/OntologyNode";
import ConceptNode from "../nodes/ConceptNode";

// === REGISTRO DOS TIPOS DE NÓ ===
const nodeTypes: NodeTypes = {
  context: ContextNode,
  ontology: OntologyNode,
  concept: ConceptNode
};

// =======================================
// DETECTAR SE UM CONCEITO FOI COLOCADO
// DENTRO DE UMA ONTOLOGIA
// =======================================
function detectConceptInsideOntology(movingNode: Node, nodes: Node[]) {
  if (movingNode.type !== "concept") return null;

  const movingPos = movingNode.positionAbsolute || movingNode.position;
  const ontologies = nodes.filter((n) => n.type === "ontology");

  for (const ont of ontologies) {
    const oPos = ont.positionAbsolute || ont.position;

    const oW = ont.width || 160;
    const oH = ont.height || 80;

    const inside =
      movingPos.x > oPos.x &&
      movingPos.x < oPos.x + oW &&
      movingPos.y > oPos.y &&
      movingPos.y < oPos.y + oH;

    if (inside) return ont;
  }

  return null;
}

// =======================================
// CANVAS
// =======================================
interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (fn: (nodes: Node[]) => Node[]) => void;
  setEdges: (fn: (edges: Edge[]) => Edge[]) => void;
  onNodeContextMenu: (event: any, node: Node) => void;
}

export default function Canvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodeContextMenu
}: CanvasProps) {

  // Atualiza nós (drag, resize, move)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prev) => {
        const updated = applyNodeChanges(changes, prev);

        // --- TYPE NARROWING SEGURO ---
        const drag = changes.find(
          (c): c is NodeChange & { id: string } =>
            c.type === "position" && "id" in c
        );

        if (!drag) return updated;

        const movingNode = updated.find((n) => n.id === drag.id);
        if (!movingNode) return updated;

        const parentOntology = detectConceptInsideOntology(movingNode, updated);

        if (parentOntology) {
          console.log(
            `Conceito '${movingNode.data.label}' está dentro da Ontologia '${parentOntology.data.label}'`
          );
        }

        return updated;
      });
    },
    [setNodes]
  );

  // Atualiza edges existentes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prev) => applyEdgeChanges(changes, prev));
    },
    [setEdges]
  );

  // Cria novas conexões
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((prev) => addEdge(params, prev));
    },
    [setEdges]
  );

  return (
    <div className="canvas-area" style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        defaultEdgeOptions={{ type: "smoothstep" }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
