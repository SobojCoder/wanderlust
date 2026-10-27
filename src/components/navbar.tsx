import Link from "next/link";
import { UserIcon } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/Add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/sign-up" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:px-6">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm text-foreground/80 transition-colors hover:text-[#0eb6d4]",
                link.active &&
                  "font-medium text-[#0eb6d4] underline underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-[#0eb6d4] md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          Wanderlast
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-[#0eb6d4]"
          >
            <UserIcon className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
          {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-foreground/80 transition-colors hover:text-[#0eb6d4]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
