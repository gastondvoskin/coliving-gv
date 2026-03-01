import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell mt-20 pb-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">The page you requested does not exist.</p>
      <Link href="/" className="focus-ring mt-6 inline-block rounded-full bg-accent px-4 py-2 font-medium text-white">
        Back home
      </Link>
    </div>
  );
}
