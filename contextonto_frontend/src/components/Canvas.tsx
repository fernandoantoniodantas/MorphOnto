import React from "react";
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
  type Connection
} from "reactflow";

import ContextNode from "../nodes/ContextNode";
import OntologyNode from "../nodes/OntologyNode";
import ConceptNode from "../nodes/ConceptNode";
import PushoutNode from "../nodes/PushoutNode";

import "reactflow/dist/style.css";

const nodeTypes = {
  Contexto: ContextNode,
  Ontologia: OntologyNode,
  Conceito: ConceptNode,
  Pushout: PushoutNode,
};

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: (nodes: Node[]) => Node[]) => void;
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void;
  onNodeContextMenu: (event: any, node: Node) => void;
}

export default function Canvas({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodeContextMenu
}: CanvasProps) {

  const onNodesChange = (changes: NodeChange[]) =>
    setNodes((nds) => applyNodeChanges(changes, nds));

  const onEdgesChange = (changes: EdgeChange[]) =>
    setEdges((eds) => applyEdgeChanges(changes, eds));

  const onConnect = (connection: Connection) =>
    setEdges((eds) => [
      ...eds,
      {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      }
    ]);

  return (
    <div className="canvas-panel">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
