import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { SVGProps } from "react";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contactDetails = [
  { label: "786 901 1622", href: "tel:+17869016222" },
  { label: "info@wandarland.com", href: "mailto:info@wandarland.com" },
];

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <path d="M7.5 16.5v-6" />
      <circle cx="7.5" cy="7.9" r="0.7" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-6" />
      <path d="M11.5 13.4c0-1.3 1-2.4 2.3-2.4s2.3 1.1 2.3 2.4v3.1" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialLinks = [
  { label: "X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-10 md:px-6">
        <p className="font-serif text-6xl leading-none font-bold md:text-8xl xl:text-[104px]">
          Wanderlast
        </p>
        <p className="mt-5 text-sm text-white/80 md:text-base">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_0.9fr] lg:gap-6">
          <div>
            <h3 className="text-base tracking-wide uppercase">Newsletter</h3>
            <p className="mt-3 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-6 w-full max-w-xs">
              <Input
                type="email"
                aria-label="Email address"
                placeholder="Enter email"
                className="h-10 rounded-none border-0 bg-white/5 pr-11 pl-4 text-sm placeholder:text-white/50"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/70 transition-colors hover:text-white"
              >
                <ArrowUpRightIcon className="size-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base tracking-wide uppercase">Quick Links</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base tracking-wide uppercase">Support</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base tracking-wide uppercase">Contact Us</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  <a
                    href={detail.href}
                    className="text-base text-white/70 transition-colors hover:text-white"
                  >
                    {detail.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/60">
              © 2026 Wanderlust. All rights reserved.
            </p>
            <div className="flex items-center gap-9">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex text-white/70 transition-colors hover:text-white"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
