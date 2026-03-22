import { BlogFilters } from '@/components/blog-filters';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

export const metadata = {
  title: 'Blog',
  description: 'Cybersecurity research, product updates, and engineering deep dives from Unroll Loop.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">All posts</p>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-white">Research, engineering, and sharp product notes.</h1>
        <p className="text-lg leading-8 text-slate-300">Filter by category, tag, or popularity to surface the exact insight you need.</p>
      </div>
      <BlogFilters posts={posts} categories={siteConfig.categories} tags={getAllTags()} />
    </div>
  );
}
