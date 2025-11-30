import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeTypes,
  type ReactFlowInstance
} from "reactflow";

import "reactflow/dist/style.css";

import ContextNode from "../nodes/ContextNode";
import OntologyNode from "../nodes/OntologyNode";
import ConceptNode from "../nodes/ConceptNode";

// ------------------------------------
// TIPOS DE NÓS
// ------------------------------------
const nodeTypes: NodeTypes = {
  context: ContextNode,
  ontology: OntologyNode,
  concept: ConceptNode
};

// ------------------------------------
// PROPS
// ------------------------------------
interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (fn: (nodes: Node[]) => Node[]) => void;
  setEdges: (fn: (edges: Edge[]) => Edge[]) => void;
  onEdgeConnect?: (params: Connection) => void;
}

// ------------------------------------
// CANVAS COMPONENT
// ------------------------------------
export default function Canvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  onEdgeConnect
}: CanvasProps) {

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  // ------------------------------------
  // MOVIMENTAÇÃO DE NÓS
  // ------------------------------------
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((prevNodes) => {
        const updated = applyNodeChanges(changes, prevNodes);

        const move = changes.find((c) => c.type === "position");
        if (!move) return updated;

        const movedNode = updated.find((n) => n.id === move.id);
        if (!movedNode) return updated;

        // ------------------------------------
        // SE O NÓ É CONCEITO → verificar container
        // ------------------------------------
        if (movedNode.type === "concept") {
          const px = movedNode.position.x;
          const py = movedNode.position.y;

          // ⭐ IMPORTANTE: tamanho real dos group nodes
          const CONTAINER_W = 300;
          const CONTAINER_H = 220;

          // margem para facilitar encaixe
          const MARGIN = 12;

          const container = updated.find((n) => {
            if (!(n.type === "ontology" || n.type === "context")) return false;

            return (
              px >= n.position.x - MARGIN &&
              px <= n.position.x + CONTAINER_W + MARGIN &&
              py >= n.position.y - MARGIN &&
              py <= n.position.y + CONTAINER_H + MARGIN
            );
          });

          if (container) {
            movedNode.parentNode = container.id;
            movedNode.extent = "parent";

            movedNode.position = {
              x: px - container.position.x,
              y: py - container.position.y
            };
          } else {
            movedNode.parentNode = undefined;
            movedNode.extent = undefined;
          }
        }

        return [...updated];
      });
    },
    [setNodes]
  );

  // ------------------------------------
  // MUDANÇA DE ARESTAS
  // ------------------------------------
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((prev) => applyEdgeChanges(changes, prev));
    },
    [setEdges]
  );

  // ------------------------------------
  // CRIAÇÃO DE ARESTAS
  // ------------------------------------
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((prev) => {
        const newEdge = {
          id: `edge_${params.source}_${params.target}_${Date.now()}`,
          source: params.source!,
          target: params.target!,
          type: "smoothstep",
          animated: false,
        };
        return [...prev, newEdge];
      });

      if (onEdgeConnect) onEdgeConnect(params);
    },
    [setEdges, onEdgeConnect]
  );

  // ------------------------------------
  // JSX
  // ------------------------------------
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setRfInstance}
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
