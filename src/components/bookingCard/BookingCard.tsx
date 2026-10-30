"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  InfoIcon,
  Loader2Icon,
  MinusIcon,
  PlusIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { IDestinations } from "@/app/destinations/page";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

type BookingStatus =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const MAX_TRAVELERS = 10;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const BookingCard = ({ destination }: { destination: IDestinations }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [travelers, setTravelers] = React.useState(1);
  const [departureDate, setDepartureDate] = React.useState(
    destination.departureDate
  );
  const [status, setStatus] = React.useState<BookingStatus>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const numericPrice =
    Number(String(destination.price).replace(/[^0-9.]/g, "")) || 0;
  const total = currencyFormatter.format(numericPrice * travelers);
  const today = new Date().toISOString().slice(0, 10);

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setStatus(null);

    const bookingPayload = {
      userName: user.name,
      email: user.email,
      ...destination,
      departureDate,
      bookingDate: new Date(),
      travelers,
    };

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!res.ok) {
        throw new Error(`Booking request failed with status ${res.status}`);
      }

      setStatus({
        type: "success",
        message: "Your booking is confirmed!",
      });
    } catch {
      setStatus({
        type: "error",
        message: "We couldn't complete your booking. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Price header */}
        <div className="bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm text-slate-300">Trip price</p>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-extrabold sm:text-4xl">
              {destination.price}
            </span>
            <span className="text-sm font-medium text-slate-400">
              / person
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Check the final price and availability before booking.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900">
            Your trip at a glance
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-slate-500">Destination</span>
              <span className="font-semibold text-slate-800">
                {destination.name}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-slate-500">Duration</span>
              <span className="font-semibold text-slate-800">
                {destination.duration}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-slate-500">Category</span>
              <span className="font-semibold text-slate-800">
                {destination.category}
              </span>
            </div>
          </div>

          <div className="my-6 border-t border-slate-100" />

          {status?.type === "success" ? (
            /* Booking confirmed */
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <CheckCircle2Icon className="mx-auto size-9 text-emerald-600" />

              <p className="mt-3 font-bold text-emerald-900">
                Booking confirmed
              </p>
              <p className="mt-1 text-sm text-emerald-700">
                {status.message} {destination.name} for{" "}
                {travelers === 1 ? "1 traveler" : `${travelers} travelers`} on{" "}
                {departureDate}.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                <Link
                  href="/my-bookings"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  View my bookings
                </Link>
                <button
                  type="button"
                  onClick={() => setStatus(null)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                  Book another trip
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-5">
              {/* Travelers */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Travelers
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    How many people are joining?
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Remove traveler"
                    onClick={() =>
                      setTravelers((current) => Math.max(1, current - 1))
                    }
                    disabled={travelers <= 1}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <MinusIcon className="size-4" />
                  </button>

                  <span
                    aria-live="polite"
                    className="w-6 text-center text-lg font-bold text-slate-900"
                  >
                    {travelers}
                  </span>

                  <button
                    type="button"
                    aria-label="Add traveler"
                    onClick={() =>
                      setTravelers((current) =>
                        Math.min(MAX_TRAVELERS, current + 1)
                      )
                    }
                    disabled={travelers >= MAX_TRAVELERS}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                </div>
              </div>

              {/* Departure date */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="departure-date"
                  className="text-sm font-semibold text-slate-800"
                >
                  Departure date
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="departure-date"
                    type="date"
                    name="departureDate"
                    value={departureDate}
                    min={today}
                    onChange={(event) => setDepartureDate(event.target.value)}
                    required
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-800 outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Total price
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {destination.price} ×{" "}
                    {travelers === 1 ? "1 traveler" : `${travelers} travelers`}
                  </p>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">
                  {total}
                </p>
              </div>

              {/* Error message */}
              {status?.type === "error" && (
                <p
                  role="alert"
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-600"
                >
                  <CircleAlertIcon className="size-4 shrink-0" />
                  {status.message}
                </p>
              )}

              {user ? (
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2Icon className="size-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      Book This Trip
                      <ArrowUpRightIcon className="size-4.5" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    Sign in to confirm your booking
                  </p>
                  <Link
                    href="/sign-in"
                    className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Sign in to book
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </div>
              )}
            </form>
          )}

          <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle2Icon size={18} className="shrink-0 text-emerald-500" />
              Instant booking confirmation
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheckIcon size={18} className="shrink-0 text-emerald-500" />
              Review booking details before payment
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <InfoIcon size={18} className="shrink-0 text-emerald-500" />
              Free cancellation up to 7 days before departure
            </div>
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            Booking availability and final pricing should be confirmed before
            payment.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default BookingCard;
