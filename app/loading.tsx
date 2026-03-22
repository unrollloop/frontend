import { LoadingCards } from '@/components/loading-cards';

export default function Loading() {
  return (
    <div className="container py-16">
      <div className="mb-10 h-24 animate-pulse rounded-3xl bg-card/70" />
      <LoadingCards />
    </div>
  );
}
