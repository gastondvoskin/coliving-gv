"use client";

import { FormEvent, type ReactNode, useMemo, useState } from "react";

type FormValues = {
  name: string;
  email: string;
  moveInMonth: string;
  stayLength: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  moveInMonth: "",
  stayLength: "",
  message: ""
};

export function ApplyForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (values.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.moveInMonth) {
      next.moveInMonth = "Select your intended move-in month.";
    }
    if (!values.stayLength) {
      next.stayLength = "Select a stay length range.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Please share at least 10 characters.";
    }
    return next;
  }, [values]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setValues(initialValues);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card mt-8 space-y-4 p-6">
      <Field label="Full name" error={errors.name}>
        <input
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          type="email"
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Intended move-in month" error={errors.moveInMonth}>
          <input
            type="month"
            className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
            value={values.moveInMonth}
            onChange={(event) => setValues((prev) => ({ ...prev, moveInMonth: event.target.value }))}
          />
        </Field>
        <Field label="Stay length range" error={errors.stayLength}>
          <select
            className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
            value={values.stayLength}
            onChange={(event) => setValues((prev) => ({ ...prev, stayLength: event.target.value }))}
          >
            <option value="">Select one</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6-12 months">6-12 months</option>
            <option value="12+ months">12+ months</option>
          </select>
        </Field>
      </div>
      <Field label="Short message" error={errors.message}>
        <textarea
          rows={4}
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
        />
      </Field>
      <button type="submit" className="focus-ring rounded-full bg-accent px-4 py-2 font-medium text-white">
        Submit inquiry
      </button>
      {submitted ? <p className="text-sm text-emerald-700 dark:text-emerald-400">Inquiry sent (mock). We will contact you soon.</p> : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-700 dark:text-rose-400">{error}</span> : null}
    </label>
  );
}
