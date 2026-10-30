import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  BadgeCheckIcon,
  CalendarDaysIcon,
  GlobeIcon,
  MapPinIcon,
  PlaneTakeoffIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "cn";
import { auth } from "@/lib/auth";
import { IBooking } from "@/type/bookingType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProfileSettings from "@/components/profile/ProfileSettings";

async function getBookings(email: string): Promise<IBooking[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${email}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const bookings = await getBookings(user.email);

  const now = new Date();
  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter((booking) => {
    const departure = new Date(booking.departureDate);
    return (
      !Number.isNaN(departure.getTime()) &&
      departure >= now &&
      booking.status !== "Cancelled"
    );
  }).length;
  const travelers = bookings.reduce(
    (sum, booking) => sum + (Number(booking.travelers) || 0),
    0
  );
  const countries = new Set(bookings.map((booking) => booking.country)).size;

  const joinedAt = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const stats = [
    { label: "Total bookings", value: totalBookings, icon: CalendarDaysIcon },
    { label: "Upcoming trips", value: upcomingTrips, icon: PlaneTakeoffIcon },
    { label: "Travelers", value: travelers, icon: UsersIcon },
    { label: "Countries", value: countries, icon: GlobeIcon },
  ];

  const recentBookings = bookings.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f9fc]">
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        {/* Page header */}
        <div className="mb-9">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Your travel account
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Manage your personal details, keep your account secure, and keep an
            eye on your travel activity — all in one place.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Sidebar: identity + recent bookings */}
          <aside className="flex flex-col gap-6">
            <Card className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm ring-0">
              <CardContent className="flex flex-col items-center px-0 text-center">
                <Avatar className="size-20 ring-4 ring-emerald-100">
                  <AvatarImage
                    referrerPolicy="no-referrer"
                    src={(user.image as string | null) ?? undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-[#0eb6d4] text-xl text-white">
                    {user.name[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {user.name}
                </h2>
                <p className="mt-1 text-sm break-all text-slate-500">
                  {user.email}
                </p>

                {user.emailVerified ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <BadgeCheckIcon className="size-3.5" />
                    Email verified
                  </span>
                ) : (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    <BadgeCheckIcon className="size-3.5" />
                    Unverified email
                  </span>
                )}

                <Separator className="my-5 w-full bg-slate-100" />

                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Member since</span>
                    <span className="font-medium text-slate-700">
                      {joinedAt}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-slate-500">Account status</span>
                    <span className="font-medium text-emerald-700">
                      Active
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm ring-0">
              <CardHeader className="px-0">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg font-bold text-slate-900">
                    Recent bookings
                  </CardTitle>
                  <Link
                    href="/my-bookings"
                    className="text-sm font-medium text-emerald-700 hover:underline"
                  >
                    View all
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="mt-4 space-y-1 px-0">
                {recentBookings.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-7 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      No bookings yet
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Your booked trips will show up here.
                    </p>
                    <Link
                      href="/destinations"
                      className="mt-4 inline-flex h-9 items-center rounded-xl bg-[#199cb6] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#158aa2]"
                    >
                      Explore destinations
                    </Link>
                  </div>
                ) : (
                  recentBookings.map((booking) => (
                    <Link
                      key={booking._id}
                      href="/my-bookings"
                      className="group flex items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-[#f7f9fc]"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <MapPinIcon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {booking.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {booking.country} · Departs {booking.departureDate}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          booking.status === "Confirmed"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        )}
                      >
                        {booking.status}
                      </span>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Main column: stats + settings forms */}
          <div className="flex flex-col gap-6">
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm ring-0"
                >
                  <CardContent className="flex flex-col gap-3 px-0">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <stat.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ProfileSettings
              user={{
                name: user.name,
                email: user.email,
                image: (user.image as string | null) ?? null,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
