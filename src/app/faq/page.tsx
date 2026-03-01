import { listing } from "@/lib/listing";

const defaultQuestions = [
  {
    q: "Is this a booking checkout flow?",
    a: "No. This site collects inquiry requests only; bookings are handled separately."
  },
  {
    q: "How does check-in work?",
    a: "Check-in details are coordinated after inquiry approval."
  },
  {
    q: "Are parties allowed?",
    a: "No se permiten fiestas."
  },
  {
    q: "Can I ask about quiet hours, smoking, or pets?",
    a: "Yes. Use the inquiry form to confirm house rules before any stay."
  }
];

export default function FaqPage() {
  const rules = listing.houseRules.length > 0 ? listing.houseRules : ["Please confirm house rules in your inquiry."];

  return (
    <div className="container-shell mt-10 pb-10">
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <div className="mt-8 grid gap-4">
        {defaultQuestions.map((item) => (
          <article key={item.q} className="card p-5">
            <h2 className="text-lg font-semibold">{item.q}</h2>
            <p className="mt-2 text-slate-700 dark:text-slate-200">{item.a}</p>
          </article>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">House rules</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700 dark:text-slate-200">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
