import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Clock3,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import EditDestinationDialog from "@/components/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/DeleteDestinationDialog";

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

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destination/${id}`);
  const destination = await res.json();

  console.log(destination);
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
<div className="flex items-center gap-2 sm:right-8 sm:top-8">
 
  <EditDestinationDialog destination = {destination}/>
  <DeleteDestinationDialog id={id} />

 
</div>
</div>


        {/* Hero image */}
        <section className="relative h-[300px] overflow-hidden rounded-3xl sm:h-[420px] lg:h-[500px]">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            width={500}
            height={700}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
          </div>

          {/* Booking card */}
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
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-emerald-500"
                    />
                    Destination details available
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <ShieldCheck
                      size={18}
                      className="shrink-0 text-emerald-500"
                    />
                    Review booking details before payment
                  </div>
                </div>

                <Link
                  href={`/booking/${destination._id}`}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                  Book This Trip
                  <ArrowUpRight size={19} />
                </Link>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Booking availability and final pricing should be confirmed
                  before payment.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
