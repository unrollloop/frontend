import Link from 'next/link';
import { siteConfig } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border/10 py-10">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Secure systems, shipped with clarity.</p>
        <div className="flex gap-4">
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <Link href="/category/security" className="hover:text-foreground">Security</Link>
          <a href={siteConfig.links.github} className="hover:text-foreground">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
