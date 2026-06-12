import { decode } from "@/shared/utils/compress-url";
import { renderTreeToSvg } from "@/features/freelancers-cut/server/render-tree-to-svg";
import { svgToPng } from "@/features/freelancers-cut/server/generate-png";
import { loadServerImages } from "@/features/freelancers-cut/server/server-image-loader";
import type { PagesFunction } from "@cloudflare/workers-types";
// @ts-ignore
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";

export const onRequest: PagesFunction = (async (context: any) => {
  const url = new URL(context.request.url);
  const unlockedPerksQuery = url.searchParams.get("unlockedPerks");

  if (!unlockedPerksQuery) {
    return new Response("Missing unlockedPerks", { status: 400 });
  }

  try {
    const unlockedNodes = decode(unlockedPerksQuery);
    const imageCache = await loadServerImages(url.origin);
    const svg = renderTreeToSvg(unlockedNodes, imageCache);

    const png = await svgToPng(svg, resvgWasm, 1200);

    return new Response(png as any, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, immutable",
      },
    }) as any;
  } catch (err) {
    console.error("Image generation failed:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}) as any;
