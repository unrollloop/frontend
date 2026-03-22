import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { slugify } from '@/lib/utils';

export function TagBadge({ tag }: { tag: string }) {
  return (
    <Link href={`/blog?tag=${slugify(tag)}`}>
      <Badge className="border-accent/30 bg-accent/10 text-accent">#{tag}</Badge>
    </Link>
  );
}
