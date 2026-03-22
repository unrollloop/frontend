import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/category/research', label: 'Research' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight text-white">
          Unroll <span className="text-primary">Loop</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
