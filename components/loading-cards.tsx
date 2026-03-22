export function LoadingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="h-72 animate-pulse rounded-3xl border border-border/20 bg-card/70" />
      ))}
    </div>
  );
}
