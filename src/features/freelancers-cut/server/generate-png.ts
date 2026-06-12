import { initWasm, Resvg } from "@resvg/resvg-wasm";

let initialized = false;

async function initialize(wasmModule: WebAssembly.Module) {
  if (initialized) return;
  await initWasm(wasmModule);
  initialized = true;
}

export async function svgToPng(
  svg: string,
  wasmModule: WebAssembly.Module,
  width?: number,
): Promise<Uint8Array> {
  await initialize(wasmModule);

  const resvg = new Resvg(svg, {
    fitTo: width ? { mode: "width", value: width } : undefined,
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
