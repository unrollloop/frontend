'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TagBadge } from '@/components/tag-badge';
import type { Post } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export function BlogCard({ post }: { post: Post }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full overflow-hidden bg-gradient-to-br from-card to-surface">
        <div className="absolute inset-0 bg-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col gap-5">
          <div className="flex items-center justify-between gap-2">
            <Badge>{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              {post.readingTime}
            </span>
          </div>
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.22em] text-subtle-foreground">{formatDate(post.date)}</p>
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{post.title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{post.description}</p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            Read article <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
