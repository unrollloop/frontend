import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle-foreground">404</p>
      <h1 className="font-heading text-5xl font-semibold text-foreground">Signal not found.</h1>
      <p className="max-w-lg text-muted-foreground">The page you requested is either archived, moved, or never made it into the pipeline.</p>
      <Button asChild><Link href="/">Return home</Link></Button>
    </div>
  );
}
