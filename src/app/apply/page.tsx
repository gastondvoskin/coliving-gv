import { ApplyForm } from "@/components/apply-form";
import { listing } from "@/lib/listing";

export default function ApplyPage() {
  return (
    <div className="container-shell mt-10 pb-10">
      <h1 className="text-3xl font-semibold">Apply / Request a Tour / Ask Availability</h1>
      <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
        This form is an inquiry only. Submitting does not create a reservation or payment.
      </p>
      <div className="mt-6 card p-5">
        <p className="text-sm text-slate-700 dark:text-slate-200">Property: {listing.title}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200">Location: {listing.locationText}</p>
      </div>
      <ApplyForm />
    </div>
  );
}
