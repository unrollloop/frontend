'use client';

import { useMemo, useState } from 'react';
import { BlogCard } from '@/components/blog-card';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import type { Post } from '@/lib/blog';
import { slugify } from '@/lib/utils';

type BlogFiltersProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
  initialQuery?: string;
  initialCategory?: string;
  initialTag?: string;
  initialSort?: string;
};

export function BlogFilters({
  posts,
  categories,
  tags,
  initialQuery = '',
  initialCategory = 'all',
  initialTag = 'all',
  initialSort = 'latest',
}: BlogFiltersProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);
  const [sort, setSort] = useState<'latest' | 'popular'>(initialSort === 'popular' ? 'popular' : 'latest');

  const filtered = useMemo(() => {
    return [...posts]
      .filter((post) => (category === 'all' ? true : slugify(post.category) === category))
      .filter((post) => (tag === 'all' ? true : post.tags.some((item) => slugify(item) === tag)))
      .filter((post) => {
        if (!query) return true;
        const haystack = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
      .sort((a, b) => {
        if (sort === 'popular') {
          return Number(b.popular) - Number(a.popular) || +new Date(b.date) - +new Date(a.date);
        }
        return +new Date(b.date) - +new Date(a.date);
      });
  }, [category, posts, query, sort, tag]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-border/20 bg-card/70 p-5 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <SearchBar value={query} onChange={setQuery} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-border/20 bg-background/70 px-4 text-sm text-foreground outline-none focus:border-primary/60">
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={slugify(item)}>{item}</option>
          ))}
        </select>
        <select value={tag} onChange={(e) => setTag(e.target.value)} className="rounded-2xl border border-border/20 bg-background/70 px-4 text-sm text-foreground outline-none focus:border-primary/60">
          <option value="all">All tags</option>
          {tags.map((item) => (
            <option key={item} value={slugify(item)}>{item}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <Button variant={sort === 'latest' ? 'default' : 'secondary'} className="flex-1" onClick={() => setSort('latest')}>Latest</Button>
          <Button variant={sort === 'popular' ? 'default' : 'secondary'} className="flex-1" onClick={() => setSort('popular')}>Popular</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
      {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No articles match this filter set.</p> : null}
    </div>
  );
}
