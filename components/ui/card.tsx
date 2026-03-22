import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative rounded-3xl border border-border/20 bg-card/70 p-6 shadow-[0_0_0_1px_rgb(var(--border)/0.08)] backdrop-blur-xl transition-all',
        className,
      )}
      {...props}
    />
  );
}
