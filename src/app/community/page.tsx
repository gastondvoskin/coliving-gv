import { listing } from "@/lib/listing";

export default function CommunityPage() {
  return (
    <div className="container-shell mt-10 pb-10">
      <h1 className="text-3xl font-semibold">Community</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        This house is presented as a calm, collaboration-friendly coliving environment with space to focus and shared moments in common areas.
      </p>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="card p-5">
          <h2 className="text-xl font-semibold">House culture</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Respectful communication, tidy shared spaces, and mindful noise help everyone feel at home.</p>
        </article>
        <article className="card p-5">
          <h2 className="text-xl font-semibold">Cowork friendly</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{listing.amenities.find((item) => item.toLowerCase().includes("trabajo")) ?? "Workspace-ready setup"} plus reliable internet supports remote schedules.</p>
        </article>
        <article className="card p-5">
          <h2 className="text-xl font-semibold">Quiet hours</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Keep evenings low-noise and coordinate social plans with housemates in advance.</p>
        </article>
        <article className="card p-5">
          <h2 className="text-xl font-semibold">Shared meals</h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Kitchen and dining spaces are set up for occasional group meals and casual gatherings.</p>
        </article>
      </section>
    </div>
  );
}
