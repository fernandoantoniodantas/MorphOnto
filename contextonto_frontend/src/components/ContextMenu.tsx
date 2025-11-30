import React from "react";

export interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  nodeId: string | null;
  onRename: (id: string) => void;
  onDelete: (id: string) => void;
  onAddConcept?: (id: string) => void; // apenas para ontologias
  onClose: () => void;
}

// =============================================
//  CONTEXT MENU — COMPLETO
// =============================================
// Regras:
//  ✔ aparece na posição (x,y)
//  ✔ opções: renomear, excluir
//  ✔ se for ontologia: adicionar conceito
//  ✔ clique fora fecha

export default function ContextMenu({
  x,
  y,
  visible,
  nodeId,
  onRename,
  onDelete,
  onAddConcept,
  onClose
}: ContextMenuProps) {
  if (!visible || !nodeId) return null;

  return (
    <div>
      {/* Overlay para clicar fora */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 10
        }}
      />

      {/* Menu */}
      <div
        style={{
          position: "fixed",
          top: y,
          left: x,
          background: "#ffffff",
          border: "1px solid #ccc",
          borderRadius: "6px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.22)",
          padding: "8px 0",
          width: "180px",
          zIndex: 11,
          fontFamily: "system-ui, sans-serif"
        }}
      >
        {/* Renomear */}
        <div
          onClick={() => onRename(nodeId)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Renomear
        </div>

        {/* Adicionar conceito - somente para ontologias */}
        {onAddConcept && (
          <div
            onClick={() => onAddConcept(nodeId)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Adicionar conceito
          </div>
        )}

        {/* Excluir */}
        <div
          onClick={() => onDelete(nodeId)}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px",
            color: "#b00020"
          }}
        >
          Excluir
        </div>
      </div>
    </div>
  );
}
