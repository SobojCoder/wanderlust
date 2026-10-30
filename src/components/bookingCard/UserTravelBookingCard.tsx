"use client"
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { IBooking } from '@/type/bookingType';

const UserTravelBookingCard = ({booking}:{booking: IBooking}) => {
console.log("booking list",booking);
    const handleCancleBooking = async() =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-booking/${booking._id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        console.log(data);
        redirect("/my-bookings");
      }

    return (
        <div>
            
            <article
              key={booking._id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-md"
            >
              <div className="grid md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
                {/* Left image */}
                <div className="relative min-h-60 overflow-hidden md:min-h-full">
                  <Image
                    src={booking.imageUrl}
                    alt={booking.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                    {booking.category}
                  </span>
                </div>

                {/* Right details */}
                <div className="flex min-w-0 flex-col p-5 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-2 flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin className="size-4 text-emerald-600" />
                        {booking.country}
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {booking.name}
                      </h2>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    {booking.description}
                  </p>

                  {/* Trip information */}
                  <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-5 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <CalendarDays className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">Departure</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {booking.departureDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Clock3 className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Duration</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {booking.duration}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                        <Users className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Travelers</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {booking.travelers}{" "}
                          {booking.travelers === 1 ? "Person" : "People"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price and bottom-right buttons */}
                  <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        Total booking price
                      </p>
                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {booking.price}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <Link
                        href={`/my-bookings/${booking._id}`}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-background px-5 py-2 text-sm font-medium transition-colors hover:border-emerald-600 hover:text-emerald-700"
                      >
                        View Details
                        <ArrowRight className="ml-1 size-4" />
                      </Link>

                      <Button
                        
                        variant="destructive"
                        className="rounded-xl px-5"
                        onClick={handleCancleBooking}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          
        </div>
    );
};

export default UserTravelBookingCard;