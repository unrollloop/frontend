import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog-card';
import { ReadingProgress } from '@/components/reading-progress';
import { TableOfContents } from '@/components/table-of-contents';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { extractHeadings, getAllPosts, getCompiledPost, getRelatedPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getCompiledPost(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.rawContent);
  const related = getRelatedPosts(post.slug, post.category, post.tags);
  const views = 1200 + post.slug.length * 73;

  return (
    <div className="container py-16">
      <ReadingProgress />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="space-y-10">
          <header className="space-y-5">
            <Badge>{post.category}</Badge>
            <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-white">{post.title}</h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">{post.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime}</span>
              <span>{views.toLocaleString()} views</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            {post.content}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="font-heading text-2xl font-semibold text-white">Author</p>
            <Separator />
            <div className="mt-5 space-y-2 text-sm text-slate-300">
              <p className="font-medium text-white">{post.author}</p>
              <p>Unroll Loop blends threat research with production-grade engineering guidance for modern teams.</p>
            </div>
          </div>

          <section className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Related articles</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-white">Continue the thread.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => <BlogCard key={item.slug} post={item} />)}
            </div>
          </section>
        </article>
        <TableOfContents headings={headings} />
      </div>
    </div>
  );
}
