import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.2fr_1fr_auto]"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <div>
        <p className="font-heading text-xl font-semibold text-white">Deploy sharp insights to your inbox.</p>
        <p className="mt-2 text-sm text-slate-400">Threat intel, engineering notes, and product updates. Zero noise.</p>
      </div>
      <Input type="email" name="email" placeholder="you@company.com" required aria-label="Email address" />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
