import type { MDXComponents } from 'mdx/types';
import { Link2 } from 'lucide-react';
import { Callout } from '@/components/callout';
import { CodeBlock } from '@/components/code-block';

export const mdxComponents: MDXComponents = {
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return <code className="rounded bg-card px-1.5 py-0.5 font-mono text-sm text-primary">{children}</code>;
    }
    return <code className={className}>{children}</code>;
  },
  Callout,
  a: ({ href = '', ...props }) => (
    <a href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4" {...props} />
  ),
  h2: ({ id, children, ...props }) => (
    <h2 id={id} className="group flex scroll-m-24 items-center gap-2" {...props}>
      {children}
      <a href={`#${id}`} className="opacity-0 transition group-hover:opacity-100" aria-label="Copy link to heading">
        <Link2 className="size-4 text-subtle-foreground" />
      </a>
    </h2>
  ),
  h3: ({ id, children, ...props }) => (
    <h3 id={id} className="group flex scroll-m-24 items-center gap-2" {...props}>
      {children}
      <a href={`#${id}`} className="opacity-0 transition group-hover:opacity-100" aria-label="Copy link to heading">
        <Link2 className="size-4 text-subtle-foreground" />
      </a>
    </h3>
  ),
};
