interface OutputPanelProps {
  ctxText: string;
  owlText: string;
  dotText: string;
}

export default function OutputPanel({ ctxText, owlText, dotText }: OutputPanelProps) {
  return (
    <div className="output-panel">

      <div className="output-section">
        <h3>Arquivo .ctx</h3>
        <pre className="output-box">{ctxText}</pre>
      </div>

      <div className="output-section">
        <h3>OWL (TTL)</h3>
        <pre className="output-box">{owlText}</pre>
      </div>

      <div className="output-section">
        <h3>DOT</h3>
        <pre className="output-box">{dotText}</pre>
      </div>

    </div>
  );
}
