import { Suspense } from 'react';
import { BlogFilters } from '@/components/blog-filters';
import { LoadingCards } from '@/components/loading-cards';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

export const metadata = {
  title: 'Blog',
  description: 'Cybersecurity research, product updates, and engineering deep dives from Unroll Loop.',
};

function BlogFiltersFallback() {
  return (
    <div className="space-y-8">
      <div className="h-24 rounded-3xl border border-border/20 bg-card/70" />
      <LoadingCards />
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle-foreground">All posts</p>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-foreground">Research, engineering, and sharp product notes.</h1>
        <p className="text-lg leading-8 text-muted-foreground">Filter by category, tag, or popularity to surface the exact insight you need.</p>
      </div>
      <Suspense fallback={<BlogFiltersFallback />}>
        <BlogFilters posts={posts} categories={siteConfig.categories} tags={getAllTags()} />
      </Suspense>
    </div>
  );
}
