import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { slugify } from '@/lib/utils';
import { mdxComponents } from '@/components/mdx-components';

const contentDirectory = path.join(process.cwd(), 'content', 'posts');

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  category: string;
  author: string;
  description: string;
  featured?: boolean;
  popular?: boolean;
  cover?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};

const prettyCodeOptions = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  keepBackground: false,
};

export function getPostSlugs() {
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const source = fs.readFileSync(path.join(contentDirectory, fileName), 'utf8');
      const { data, content } = matter(source);
      const stats = readingTime(content);
      return {
        slug,
        content,
        readingTime: stats.text,
        ...(data as PostFrontmatter),
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 2) {
  return getAllPosts().filter((post) => post.featured).slice(0, limit);
}

export function getRelatedPosts(currentSlug: string, category: string, tags: string[], limit = 3) {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score:
        Number(post.category === category) * 2 +
        post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getPostsByCategory(categorySlug: string) {
  return getAllPosts().filter((post) => slugify(post.category) === categorySlug);
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort();
}

export async function getCompiledPost(slug: string) {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const compiled = await compileMDX<PostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'append' }],
          [rehypePrettyCode, prettyCodeOptions],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    ...post,
    rawContent: post.content,
    content: compiled.content,
  };
}

export function extractHeadings(content: string) {
  const headingRegex = /^##?\s+(.*)$/gm;
  const headings: { title: string; id: string; level: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1].trim();
    headings.push({
      title,
      id: slugify(title),
      level: match[0].startsWith('## ') ? 2 : 1,
    });
  }

  return headings;
}
