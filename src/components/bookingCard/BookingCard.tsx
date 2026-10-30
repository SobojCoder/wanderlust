"use client";
import { IDestinations } from "@/app/destinations/page";
import { authClient } from "@/lib/auth-client";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const BookingCard = ({ destination }: { destination: IDestinations }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const departureDate = (
      e.currentTarget.elements.namedItem("departureDate") as HTMLInputElement
    ).value;

    const data = {
      userName: user?.name,
      email: user?.email,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch('http://localhost:5000/bookings',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    const bookingData = await res.json();
    console.log(bookingData);
  };

  return (
    <aside className="lg:sticky lg:top-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 p-6 text-white sm:p-8">
          <p className="text-sm text-slate-300">Trip price</p>

          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-extrabold sm:text-4xl">
              {destination.price}
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
              <span className="text-slate-500">Departure</span>
              <span className="font-semibold text-slate-800">
                {destination.departureDate}
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

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
              Destination details available
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck size={18} className="shrink-0 text-emerald-500" />
              Review booking details before payment
            </div>
          </div>
          <form onSubmit={handleBooking}>
            <input
              type="date"
              name="departureDate"
              aria-label="Departure date"
              defaultValue={destination.departureDate}
              className="my-4 border w-full p-2 rounded-2xl"
            />

            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Book This Trip
              <ArrowUpRight size={19} />
            </Button>
          </form>
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
