import type { Metadata } from "next";

import { BlogList } from "@/features/blog/components/blog-list";
import { getHashnodePosts } from "@/features/blog/data/hashnode";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form technical writing on agent runtimes, evaluation methodology, and inference cost.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getHashnodePosts();

  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      <div className="screen-line-after relative flex h-8 w-full px-2 before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56" />

      <div className="min-h-svh">
        <div className="screen-line-after px-4">
          <h1 className="text-3xl font-semibold">Blog</h1>
        </div>

        <div className="p-4">
          <p className="font-mono text-sm text-balance text-muted-foreground">
            Between the lines of the papers you skimmed.
          </p>
        </div>

        <BlogList posts={posts} />

        <div className="h-4" />
      </div>
    </div>
  );
}
