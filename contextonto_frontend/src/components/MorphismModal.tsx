import { useState } from "react";
import "../styles/modal.css";

interface MorphismModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export default function MorphismModal({ isOpen, onClose, onConfirm }: MorphismModalProps) {
  const [name, setName] = useState("e1");

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Create Morphism</h3>
        <label>Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <div className="modal-buttons">
          <button className="btn-confirm" onClick={() => onConfirm(name)}>Confirm</button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
