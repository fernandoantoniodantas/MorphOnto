import axios from "axios";

export async function compileCtx(ctx: string) {
  const response = await axios.post("http://localhost:5001/compile", { ctx });
  return response.data;
}
