// functions/_middleware.ts

import type { PagesFunction } from "@cloudflare/workers-types";
import { SPECIALIZATION_ENTRIES } from "@/features/freelancers-cut/config/specializations";
import { getUnlockedMajors } from "@/features/freelancers-cut/core/get-unlocked-majors";
import { decode } from "@/shared/utils/compress-url";

function escapeHtml(unsafe: string) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export const onRequest: PagesFunction = async ({ request, next }) => {
	const url = new URL(request.url);
	const params = url.searchParams;

	if (
		!url.pathname.startsWith("/freelancers-cut") ||
		url.pathname.includes("image")
	) {
		return next();
	}

	const unlockedPerksQuery = params.get("unlocked");

	if (!unlockedPerksQuery) {
		return next();
	}

	const response = await next();
	const html = await response.text();

	const unlockedPerks = decode(unlockedPerksQuery);
	const unlockedMajorPerks = getUnlockedMajors(unlockedPerks);
	const specializationQuery = params.get("specialization");
	const specialization = specializationQuery
		? SPECIALIZATION_ENTRIES[specializationQuery]
		: undefined;

	const title = "Entry Point: Freelancer's Cut Skill Tree";
	const description = [
		...(specialization ? [`${specialization.name} Specialization`] : []),
		...Array.from(unlockedMajorPerks.entries()).map(
			([perk, level]) => `${perk.name} ${level}`,
		),
	].join("\n");

	const imageUrl = new URL("/freelancers-cut/image", url.origin);
	imageUrl.searchParams.set("unlocked", unlockedPerksQuery);
	if (specializationQuery) {
		imageUrl.searchParams.set("specialization", specializationQuery);
	}
	const image = imageUrl.toString();
	const canonicalUrl = url.origin + url.pathname + url.search;

	const metaTags = `
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  `;

	// Inject before </head>
	const modified = html.replace("</head>", `${metaTags}\n</head>`);

	return new Response(modified, {
		headers: {
			...Object.fromEntries(response.headers),
			"content-type": "text/html;charset=UTF-8",
		},
		// biome-ignore lint/suspicious/noExplicitAny: just work please
	}) as any;
};
