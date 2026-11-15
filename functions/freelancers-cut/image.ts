/** biome-ignore-all lint/suspicious/noExplicitAny: it's working so far i'll let it be*/
import type { PagesFunction } from "@cloudflare/workers-types";
// @ts-expect-error
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm";
import { svgToPng } from "@/features/freelancers-cut/server/generate-png";
import { renderTreeToSvg } from "@/features/freelancers-cut/server/render-tree-to-svg";
import { loadServerImages } from "@/features/freelancers-cut/server/server-image-loader";
import { decode } from "@/shared/utils/compress-url";

export const onRequest: PagesFunction = (async (context: any) => {
	const cache = (caches as any).default;
	const cachedResponse = await cache.match(context.request);
	if (cachedResponse) {
		return cachedResponse;
	}

	const url = new URL(context.request.url);
	const unlockedPerksQuery = url.searchParams.get("unlocked");
	const specialization = url.searchParams.get("specialization");

	if (!unlockedPerksQuery) {
		return new Response("Missing 'unlocked' parameter", { status: 400 });
	}

	try {
		const unlockedNodes = decode(unlockedPerksQuery);
		const imageCache = await loadServerImages(url.origin);
		const svg = renderTreeToSvg(unlockedNodes, imageCache, specialization);

		const png = await svgToPng(svg, resvgWasm, 1200);

		const response = new Response(png as unknown as BodyInit, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=604800, immutable",
				"X-Content-Type-Options": "nosniff",
				"Content-Length": png.byteLength.toString(),
			},
		});

		context.waitUntil(cache.put(context.request, response.clone()));
		return response as any;
	} catch (err: any) {
		return new Response(`Image generation failed: ${err.message}`, {
			status: 500,
		});
	}
}) as any;
