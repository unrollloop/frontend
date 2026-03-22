'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type Heading = { title: string; id: string; level: number };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-3xl border border-border/20 bg-card/70 p-5 lg:block">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-subtle-foreground">On this page</p>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 2 && 'pl-3', heading.level === 3 && 'pl-6')}>
            <a href={`#${heading.id}`} className={cn('text-muted-foreground transition hover:text-foreground', active === heading.id && 'text-primary')}>
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
