import Link from "next/link";
import { ArrowLeft, MapPin, CalendarDays, Clock3, Tag } from "lucide-react";
import Image from "next/image";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";
import BookingCard from "@/components/bookingCard/BookingCard";
import { notFound } from "next/navigation";
import getTokenFromSever from "@/lib/getTokenFromSever";

export interface Root {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const token = await getTokenFromSever();

  const res = await fetch(`http://localhost:5000/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) notFound();
  const destination = await res.json();

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="flex justify-between items-center my-3">
          <Link
            href="/destinations"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to destinations
          </Link>

          {/* Top-right action buttons */}
          <div className="flex items-center gap-2">
            <EditDestinationDialog destination={destination} />
            <DeleteDestinationDialog id={id} />
          </div>
        </div>

        {/* Hero image */}
        <section className="relative h-75 overflow-hidden rounded-3xl sm:h-105 lg:h-125">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            width={1280}
            height={500}
            priority
            sizes="(max-width: 640px) 100vw, 1280px"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
            <span className="rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-lg">
              {destination.category}
            </span>
          </div>

          <div className="absolute bottom-6 left-5 right-5 text-white sm:bottom-10 sm:left-10">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={18} />
              {destination.country}
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
              Discover beautiful places, unforgettable experiences, and your
              next great adventure.
            </p>
          </div>
        </section>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* Destination information */}
          <div className="space-y-8 lg:col-span-2">
            {/* Trip overview */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
              <div className="mb-6">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Explore the destination
                </p>

                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  About this trip
                </h2>
              </div>

              <p className="text-base leading-8 text-slate-600">
                {destination.description}
              </p>
            </section>

            {/* Trip information */}
            <section>
              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Trip information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Clock3 size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Trip duration</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {destination.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <CalendarDays size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Departure date</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {destination.departureDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                    <Tag size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Travel category</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {destination.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Destination</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {destination.country}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why book with us */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Why book with us
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: <Tag size={22} />,
                    title: "Best price guarantee",
                    description:
                      "Book directly with no hidden fees — the price you see is the price you pay.",
                  },
                  {
                    icon: <CalendarDays size={22} />,
                    title: "Free cancellation",
                    description:
                      "Change of plans? Cancel up to 7 days before departure for a full refund.",
                  },
                  {
                    icon: <Clock3 size={22} />,
                    title: "24/7 travel support",
                    description:
                      "Our team is around the clock to help before, during, and after your trip.",
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                      {item.icon}
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking card */}
          <BookingCard destination={destination} />
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
