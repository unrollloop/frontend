import Link from 'next/link';
import { ArrowRight, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react';
import { BlogCard } from '@/components/blog-card';
import { NewsletterForm } from '@/components/newsletter-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/constants';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(2);
  const latestResearch = getAllPosts().slice(0, 3);

  return (
    <div className="pb-24">
      <section className="relative overflow-hidden pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="container grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary">Cyber intelligence meets developer tooling</Badge>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Unrolling Complexity in Cyber &amp; Code
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Precision research, engineering patterns, and product updates for teams defending modern software at speed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/blog">Explore the blog <ArrowRight className="ml-2 size-4" /></Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/category/research">Read research</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: 'Security research', icon: ShieldCheck },
                { label: 'Engineering deep dives', icon: TerminalSquare },
                { label: 'AI + DevOps intelligence', icon: Sparkles },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <item.icon className="mb-4 size-5 text-primary" />
                  <p className="text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <div className="mb-5 flex gap-2">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-4 font-mono text-sm text-slate-300">
              <p className="text-primary">&gt; Initializing Unroll Loop…</p>
              <p><span className="text-slate-500">[intel]</span> ingesting security signals</p>
              <p><span className="text-slate-500">[eng]</span> translating findings into ship-ready guidance</p>
              <p><span className="text-slate-500">[ops]</span> delivering clarity without noise</p>
            </div>
            <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Categories</p>
              <div className="flex flex-wrap gap-2">
                {siteConfig.categories.map((category) => (
                  <Badge key={category} className="border-white/10 bg-white/5 text-slate-300">{category}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-8 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Featured articles</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white">Signal-rich reads for defenders and builders.</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Latest research</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-white">Fresh analysis from the Unroll Loop team.</h2>
          </div>
          <Link href="/blog" className="text-sm text-primary">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestResearch.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>
      </section>

      <section className="container py-12">
        <NewsletterForm />
      </section>
    </div>
  );
}
