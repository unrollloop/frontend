'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <div className="container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle-foreground">System fault</p>
          <h1 className="font-heading text-4xl font-semibold text-foreground">Something drifted off the happy path.</h1>
          <p className="max-w-lg text-muted-foreground">We logged the failure and kept the terminal warm. Try again or head back to the homepage.</p>
          <Button onClick={reset}>Retry render</Button>
        </div>
      </body>
    </html>
  );
}
