import type { EdgeProps } from "reactflow";
import { BaseEdge, getBezierPath } from "reactflow";

export default function MappingEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={path} style={{ stroke: "#0d47a1", strokeWidth: 2 }} />
    </>
  );
}
