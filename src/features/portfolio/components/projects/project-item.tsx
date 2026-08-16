import { LinkIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleContent,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { ProseMono } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) {
  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        {project.image && (
          <div className="aspect-video overflow-hidden rounded-t-lg border-b border-edge bg-muted">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              width={640}
              height={360}
              className="size-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center p-3">
          <div className="flex-1">
            <h3 className="text-lg leading-snug font-medium text-balance">
              {project.title}
            </h3>
          </div>

          <SimpleTooltip content="Open Project Link">
            <a
              className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
              href={addQueryParams(project.link, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
            >
              <LinkIcon className="pointer-events-none size-4" />
              <span className="sr-only">Open Project Link</span>
            </a>
          </SimpleTooltip>
        </div>

        <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-edge shadow-inner">
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in">
              {project.description && (
                <ProseMono>
                  <Markdown>{project.description}</Markdown>
                </ProseMono>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
