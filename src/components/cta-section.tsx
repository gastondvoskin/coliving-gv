import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  href: string;
  actionLabel: string;
};

export function CTASection({ title, description, href, actionLabel }: CTASectionProps) {
  return (
    <section className="card p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
      <Link href={href} className="focus-ring mt-4 inline-block rounded-full bg-accent px-4 py-2 font-medium text-white">
        {actionLabel}
      </Link>
    </section>
  );
}
