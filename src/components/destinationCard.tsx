
import { MapPin, CalendarDays, Clock3, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

interface DestinationCardProps {
  destination: Root;
}

export default function DestinationCard({
  destination,
}: DestinationCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-800 backdrop-blur-md">
          {destination.category}
        </span>

        {/* Price */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="mb-1 text-xs font-medium text-white/80">
            Starting from
          </p>
          <p className="text-2xl font-bold">
            {destination.price}
          </p>
        </div>

     
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-1.5 text-sm text-gray-500">
          <MapPin size={16} className="shrink-0 text-blue-600" />
          <span>{destination.country}</span>
        </div>

        <h2 className="mb-2 line-clamp-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {destination.name}
        </h2>

        <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {destination.description}
        </p>

        {/* Trip details */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="text-blue-600" />
            <span>{destination.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-600" />
            <span>{destination.departureDate}</span>
          </div>
        </div>

        {/* Action */}
        <Link href={`/destinations/${destination._id}`}>
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-600"
        >
          Explore Trip
          <ArrowUpRight size={18} />
        </button>
        </Link>
      </div>
    </article>
  );
}
