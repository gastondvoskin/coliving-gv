import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/spaces", label: "Spaces" },
  { href: "/amenities", label: "Amenities" },
  { href: "/community", label: "Community" },
  { href: "/apply", label: "Apply" },
  { href: "/faq", label: "FAQ" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-base/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="container-shell py-3">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="focus-ring rounded-md text-sm font-semibold tracking-wide">
            Coliving BA
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/apply" className="focus-ring rounded-full bg-accent px-3 py-1 text-sm font-medium text-white">
              Ask availability
            </Link>
          </div>
        </div>
        <nav aria-label="Primary" className="mt-3 overflow-x-auto">
          <ul className="flex min-w-max items-center gap-4 pb-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring rounded-md px-1 text-sm text-slate-600 hover:text-accent dark:text-slate-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
