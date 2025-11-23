export async function compileCtx(ctxText: string) {
  const resp = await fetch("http://127.0.0.1:5001/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ctx: ctxText })
  });

  return await resp.json();
}
