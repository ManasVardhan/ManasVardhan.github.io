import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";

import { Icons } from "./icons";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> =
  {
    GitHub: Icons.github,
    LinkedIn: Icons.linkedin,
    "The Agent Stack": Icons.hashnode,
    PyPI: Icons.pypi,
  };

export function SiteFooter() {
  return (
    <footer className="border-t border-edge py-8">
      <div className="mx-auto max-w-3xl px-4">
        <nav>
          <ul className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.title];

              return (
                <li key={link.href}>
                  <a
                    className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {Icon ? <Icon className="size-5" /> : null}
                    <span className="sr-only">{link.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]" />
    </footer>
  );
}
