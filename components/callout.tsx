import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  info: {
    icon: Info,
    className: 'border-primary/20 bg-primary/10 text-sky-50',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-400/20 bg-amber-400/10 text-amber-50',
  },
};

export function Callout({
  type = 'info',
  children,
}: {
  type?: keyof typeof variants;
  children: React.ReactNode;
}) {
  const Icon = variants[type].icon;
  return (
    <div className={cn('my-6 flex gap-3 rounded-2xl border p-4', variants[type].className)}>
      <Icon className="mt-1 size-4 shrink-0" />
      <div className="text-sm leading-6">{children}</div>
    </div>
  );
}
