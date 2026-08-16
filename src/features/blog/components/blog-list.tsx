"use client";

import dayjs from "dayjs";
import { SearchIcon, XIcon } from "lucide-react";
import { useMemo, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { HashnodePost } from "@/features/blog/data/hashnode";

export function BlogList({ posts }: { posts: HashnodePost[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return posts;

    return posts.filter((post) =>
      `${post.title} ${post.brief} ${post.categories.join(" ")}`
        .toLowerCase()
        .includes(needle)
    );
  }, [posts, query]);

  return (
    <>
      <div className="screen-line-before screen-line-after p-2">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>

          <InputGroupInput
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      <div className="relative pt-4">
        <div className="pointer-events-none absolute inset-0 -z-1 max-sm:hidden sm:flex sm:justify-center">
          <div className="w-px bg-edge" />
        </div>

        {filtered.length === 0 ? (
          <div className="screen-line-before screen-line-after p-4">
            <p className="font-mono text-sm">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((post) => (
              <PostCard key={post.link} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function PostCard({ post }: { post: HashnodePost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener"
      className="group/post flex flex-col gap-2 p-4 transition-colors hover:bg-accent2"
    >
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="font-mono text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {dayjs(post.publishedAt).format("DD.MM.YYYY")}
          </time>
        </dd>
      </dl>

      <h2 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
        {post.title}
      </h2>

      <p className="font-mono text-sm text-pretty text-muted-foreground">
        {post.brief}
      </p>
    </a>
  );
}
