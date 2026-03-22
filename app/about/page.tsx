export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl space-y-6 rounded-[2rem] border border-border/20 bg-card/70 p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-subtle-foreground">About Unroll Loop</p>
        <h1 className="font-heading text-5xl font-semibold text-foreground">Cyber clarity for teams shipping serious software.</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Unroll Loop publishes technical research, architecture lessons, and operational insights for engineering organizations that care deeply about resilience, speed, and signal quality.
        </p>
      </div>
    </div>
  );
}
