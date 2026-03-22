import { notFound } from 'next/navigation';
import { BlogCard } from '@/components/blog-card';
import { getAllPosts, getPostsByCategory } from '@/lib/blog';
import { slugify } from '@/lib/utils';

export async function generateStaticParams() {
  return Array.from(new Set(getAllPosts().map((post) => slugify(post.category)))).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  if (posts.length === 0) notFound();

  return (
    <div className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Category</p>
        <h1 className="font-heading text-5xl font-semibold tracking-tight text-white">{posts[0].category}</h1>
        <p className="text-lg leading-8 text-slate-300">Curated articles focused on {posts[0].category.toLowerCase()} for builders and defenders.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
    </div>
  );
}
