export function sanitize(label: string): string {
  if (!label) return "Unnamed";

  // Remove acentos
  let out = label.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Remove símbolos estranhos
  out = out.replace(/[^a-zA-Z0-9 ]/g, "");

  // Normalização por prefixo
  if (out.toLowerCase().startsWith("context")) {
    return "Ctx" + out.replace(/\D/g, "");
  }

  if (out.toLowerCase().startsWith("ontology")) {
    return "Ont" + out.replace(/\D/g, "");
  }

  if (out.toLowerCase().startsWith("concept")) {
    return "Cpt" + out.replace(/\D/g, "");
  }

  // Caso geral
  return out.replace(/\s+/g, "_");
}
