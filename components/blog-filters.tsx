'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogCard } from '@/components/blog-card';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import type { Post } from '@/lib/blog';
import { slugify } from '@/lib/utils';

type BlogFiltersProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
};

type FilterState = {
  query: string;
  category: string;
  tag: string;
  sort: 'latest' | 'popular';
};

function getFiltersFromSearchParams(searchParams: Pick<URLSearchParams, 'get'>): FilterState {
  const sort = searchParams.get('sort');

  return {
    query: searchParams.get('query') ?? '',
    category: searchParams.get('category') ?? 'all',
    tag: searchParams.get('tag') ?? 'all',
    sort: sort === 'popular' ? 'popular' : 'latest',
  };
}

export function BlogFilters({ posts, categories, tags }: BlogFiltersProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => getFiltersFromSearchParams(searchParams));

  useEffect(() => {
    setFilters(getFiltersFromSearchParams(searchParams));
  }, [searchParams]);

  const filtered = useMemo(() => {
    return [...posts]
      .filter((post) => (filters.category === 'all' ? true : slugify(post.category) === filters.category))
      .filter((post) => (filters.tag === 'all' ? true : post.tags.some((item) => slugify(item) === filters.tag)))
      .filter((post) => {
        if (!filters.query) return true;
        const haystack = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
        return haystack.includes(filters.query.toLowerCase());
      })
      .sort((a, b) => {
        if (filters.sort === 'popular') {
          return Number(b.popular) - Number(a.popular) || +new Date(b.date) - +new Date(a.date);
        }
        return +new Date(b.date) - +new Date(a.date);
      });
  }, [filters, posts]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-border/20 bg-card/70 p-5 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <SearchBar value={filters.query} onChange={(query) => setFilters((current) => ({ ...current, query }))} />
        <select
          value={filters.category}
          onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value }))}
          className="rounded-2xl border border-border/20 bg-background/70 px-4 text-sm text-foreground outline-none focus:border-primary/60"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={slugify(item)}>{item}</option>
          ))}
        </select>
        <select
          value={filters.tag}
          onChange={(event) => setFilters((current) => ({ ...current, tag: event.target.value }))}
          className="rounded-2xl border border-border/20 bg-background/70 px-4 text-sm text-foreground outline-none focus:border-primary/60"
        >
          <option value="all">All tags</option>
          {tags.map((item) => (
            <option key={item} value={slugify(item)}>{item}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <Button variant={filters.sort === 'latest' ? 'default' : 'secondary'} className="flex-1" onClick={() => setFilters((current) => ({ ...current, sort: 'latest' }))}>Latest</Button>
          <Button variant={filters.sort === 'popular' ? 'default' : 'secondary'} className="flex-1" onClick={() => setFilters((current) => ({ ...current, sort: 'popular' }))}>Popular</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
      {filtered.length === 0 ? <p className="text-sm text-muted-foreground">No articles match this filter set.</p> : null}
    </div>
  );
}
