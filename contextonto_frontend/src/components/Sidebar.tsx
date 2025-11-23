interface SidebarProps {
  onAddNode: (type: string) => void;
  onGenerateCtx: () => void;
  onCompile: () => void;
}

export default function Sidebar({ onAddNode, onGenerateCtx, onCompile }: SidebarProps) {
  return (
    <div className="sidebar">

      <h2>Ferramentas</h2>

      <button onClick={() => onAddNode("Contexto")}>+ Contexto</button>
      <button onClick={() => onAddNode("Ontologia")}>+ Ontologia</button>
      <button onClick={() => onAddNode("Conceito")}>+ Conceito</button>
      <button onClick={() => onAddNode("Pushout")}>+ Pushout</button>

      <hr />

      <button className="compile-btn" onClick={onGenerateCtx}>
        Gerar .ctx
      </button>

      <button className="compile-btn" onClick={onCompile}>
        Compilar (.ctx → OWL / DOT)
      </button>
    </div>
  );
}
