import "server-only";

export const HASHNODE_BLOG_URL = "https://theagentstack.hashnode.dev";
const FEED_URL = `${HASHNODE_BLOG_URL}/rss.xml`;

export type HashnodePost = {
  title: string;
  link: string;
  /** ISO-8601 publish date. */
  publishedAt: string;
  /** Plain-text excerpt, already stripped of markup. */
  brief: string;
  categories: string[];
};

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function tag(block: string, name: string): string {
  const match = block.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`)
  );
  return match ? decodeEntities(match[1]).trim() : "";
}

function toExcerpt(html: string, maxLength = 160): string {
  const text = decodeEntities(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;

  // Cut on a word boundary so the ellipsis never lands mid-word.
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/**
 * Reads the Hashnode RSS feed for The Agent Stack.
 *
 * Revalidated hourly so newly published posts appear without a redeploy.
 * Returns an empty list if the feed is unreachable, leaving the section to
 * render nothing rather than failing the whole page.
 */
export async function getHashnodePosts(): Promise<HashnodePost[]> {
  let xml: string;

  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];
    xml = await response.text();
  } catch {
    return [];
  }

  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items
    .map((item): HashnodePost => {
      const publishedAt = tag(item, "pubDate");

      return {
        title: tag(item, "title"),
        link: tag(item, "link"),
        publishedAt: publishedAt
          ? new Date(publishedAt).toISOString()
          : new Date(0).toISOString(),
        brief: toExcerpt(tag(item, "description")),
        categories: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(
          (match) => decodeEntities(match[1]).trim()
        ),
      };
    })
    .filter((post) => post.title && post.link)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
