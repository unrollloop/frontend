export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">About Unroll Loop</p>
        <h1 className="font-heading text-5xl font-semibold text-white">Cyber clarity for teams shipping serious software.</h1>
        <p className="text-lg leading-8 text-slate-300">
          Unroll Loop publishes technical research, architecture lessons, and operational insights for engineering organizations that care deeply about resilience, speed, and signal quality.
        </p>
      </div>
    </div>
  );
}
