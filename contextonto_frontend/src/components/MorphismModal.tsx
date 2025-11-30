import React from "react";

interface MorphismData {
  entityOnt?: string;
  contextOnt?: string;
  from?: string;
  to?: string;
}

interface MorphismModalProps {
  open: boolean;
  data: MorphismData | null;
  onConfirm: (value: MorphismData) => void;
  onCancel: () => void;
}

export default function MorphismModal({ open, data, onConfirm, onCancel }: MorphismModalProps) {
  if (!open) return null;

  const { entityOnt, contextOnt, from, to } = data || {};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Morfismo</h2>
        <p>De: {from}</p>
        <p>Para: {to}</p>
        <p>Ontologia da entidade: {entityOnt}</p>
        <p>Ontologia de contexto: {contextOnt}</p>

        <div className="modal-actions">
          <button onClick={() => onConfirm({ entityOnt, contextOnt, from, to })}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}