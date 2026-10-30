"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon, UserIcon } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/Add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

const authLinks = [
  { label: "Login", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const menuItemClass =
    "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none";

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
                pathName === link.href &&
                  "font-medium text-[#0eb6d4] underline underline-offset-4",
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
          {user ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                aria-label="Open account menu"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#0eb6d4]/60"
                render={
                  <button className="flex gap-3 items-center cursor-pointer" type="button">
                      <h2 className="font-semibold  text-sm text-foreground/80 transition-colors hover:text-[#0eb6d4]">{user?.name}</h2> 
                    <Avatar className="size-10 ring-4 ring-emerald-100">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image as string}
                        alt={user?.name}
                      />
                      <AvatarFallback className="bg-[#0eb6d4] text-white">
                        {user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                }
              />
              <PopoverContent align="end" sideOffset={8} className="w-64 p-0">
                <div className="flex items-center gap-3 border-b border-border px-3 py-3">
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image as string}
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-[#0eb6d4] text-white">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <PopoverHeader>
                      <PopoverTitle className="truncate">
                        {user.name}
                      </PopoverTitle>
                      <PopoverDescription className="truncate text-xs">
                        {user.email}
                      </PopoverDescription>
                    </PopoverHeader>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 p-1.5">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className={menuItemClass}
                  >
                    <UserIcon className="size-4" />
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={cn(
                      menuItemClass,
                      "text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive",
                    )}
                  >
                    <LogOutIcon className="size-4" />
                    Sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            authLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-[#0eb6d4]"
              >
                {link.label}
              </Link>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
