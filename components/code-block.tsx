'use client';

import { Children, isValidElement, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

function flattenText(node: React.ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === 'string') return child;
      if (typeof child === 'number') return String(child);
      if (isValidElement<{ children?: React.ReactNode }>(child)) return flattenText(child.props.children);
      return '';
    })
    .join('');
}

export function CodeBlock({ children }: { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => flattenText(children).trim(), [children]);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-400">
        <span className="font-mono">snippet</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-3 text-xs">
          {copied ? <Check className="mr-1 size-3.5" /> : <Copy className="mr-1 size-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm [&_code]:bg-transparent [&_code]:p-0">{children}</pre>
    </div>
  );
}
