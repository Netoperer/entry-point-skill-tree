// functions/_middleware.ts
import { getUnlockedMajors } from "@/features/freelancers-cut/core/get-unlocked-majors";
import { decode } from "@/shared/utils/compress-url";
import { type PagesFunction } from "@cloudflare/workers-types";

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

  if (!url.pathname.startsWith("/freelancers-cut")) {
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

  const title = "Entry Point: Freelancer's Cut Skill Tree";
  const description = Array.from(unlockedMajorPerks.entries())
    .map(([perk, level]) => `${perk.name}: ${level}`)
    .join(", ");

  const imageUrl = new URL("/freelancers-cut/image", url.origin);
  imageUrl.searchParams.set("unlocked", unlockedPerksQuery);
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

  return new Response(modified) as any;
};
