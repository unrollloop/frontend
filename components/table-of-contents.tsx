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
    <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:block">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">On this page</p>
      <ul className="space-y-3 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 2 ? 'pl-3' : ''}>
            <a href={`#${heading.id}`} className={cn('text-slate-400 transition hover:text-white', active === heading.id && 'text-primary')}>
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
