import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IDestinations } from "@/type/destinationsType";

const FALLBACK_DESTINATIONS: IDestinations[] = [
  {
    _id: "bali-paradise",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    departureDate: "2026-05-15",
    imageUrl: "/images/destinations/image1.png",
    description:
      "Relax on pristine beaches and immerse yourself in vibrant Balinese culture.",
  },
  {
    _id: "swiss-alps-adventure",
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    category: "Mountain",
    price: "3200",
    duration: "8 Days/7 Nights",
    departureDate: "2026-06-10",
    imageUrl: "/images/destinations/image2.png",
    description:
      "Breathtaking alpine views, scenic trains and charming mountain villages.",
  },
  {
    _id: "kyoto-in-spring",
    name: "Kyoto In Spring",
    country: "Japan",
    category: "Culture",
    price: "2950",
    duration: "6 Days/5 Nights",
    departureDate: "2026-04-01",
    imageUrl: "/images/destinations/image3.png",
    description:
      "Cherry blossoms everywhere, ancient temples and unforgettable cuisine.",
  },
  {
    _id: "maldives-getaway",
    name: "Maldives Getaway",
    country: "Maldives",
    category: "Island",
    price: "3500",
    duration: "5 Days/4 Nights",
    departureDate: "2026-07-20",
    imageUrl: "/images/destinations/image4.png",
    description:
      "Overwater villas, turquoise lagoons and world class snorkeling.",
  },
  {
    _id: "santorini-sunsets",
    name: "Santorini Sunsets",
    country: "Greece",
    category: "Island",
    price: "2800",
    duration: "6 Days/5 Nights",
    departureDate: "2026-09-05",
    imageUrl: "/images/destinations/image5.png",
    description:
      "Whitewashed villages, caldera views and legendary Mediterranean sunsets.",
  },
  {
    _id: "nepal-himalayan-trail",
    name: "Nepal Himalayan Trail",
    country: "Nepal",
    category: "Adventure",
    price: "2700",
    duration: "7 Days/6 Nights",
    departureDate: "2026-10-12",
    imageUrl: "/images/destinations/image6.png",
    description:
      "Trek beneath the world's highest peaks and discover authentic mountain villages.",
  },
];

/** Stable pseudo rating (4.0 - 4.9) since the API has no rating field. */
function getRating(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 1000;
  }
  return (4 + (hash % 10) / 10).toFixed(1);
}

function FeaturedCard({ destination }: { destination: IDestinations }) {
  return (
    <Link
      href={`/destinations/${destination._id}`}
      className="w-[280px] shrink-0 grow-0 pr-5 sm:w-[340px] md:w-[380px]"
    >
      <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
        {/* Image */}
        <div className="relative h-56 overflow-hidden md:h-64">
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            width={760}
            height={512}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />

          {/* Rating */}
          <Badge
            variant="outline"
            className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md"
          >
            {getRating(destination._id)}
            <StarIcon className="size-3 fill-foreground text-foreground" />
          </Badge>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-4 text-[#0eb6d4]" />
            <span>{destination.country}</span>
          </div>

          <div className="mt-2 flex items-baseline justify-between gap-4">
            <h3 className="line-clamp-1 text-xl font-semibold text-foreground">
              {destination.name}
            </h3>
            <p className="shrink-0 text-xl font-bold text-foreground">
              {destination.price.startsWith("$")
                ? destination.price
                : `$${destination.price}`}
              <span className="text-xs font-normal text-muted-foreground">
                /person
              </span>
            </p>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDaysIcon className="size-4 text-[#0eb6d4]" />
            <span>{destination.duration}</span>
          </div>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-[#0eb6d4] uppercase">
            Book Now
            <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}

const Featured = async () => {
  let destinations: IDestinations[] = FALLBACK_DESTINATIONS;

  try {
    const res = await fetch("http://localhost:5000/destinations");
    const data = await res.json();
    destinations = data.slice(0, 8);
    if (res.ok) {
      if (Array.isArray(data) && data.length > 0) {
      }
    }
  } catch {
    destinations = FALLBACK_DESTINATIONS;
  }

  return (
    <section className="overflow-hidden bg-background py-16 md:py-24">
      {/* Header */}
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="text-4xl font-medium text-foreground md:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link href="/destinations" className="shrink-0">
          <Button
            variant="outline"
            className="h-11 gap-2 border-[#0eb6d4]/40 px-6 text-sm font-semibold tracking-widest text-[#0eb6d4] uppercase hover:border-[#0eb6d4] hover:bg-[#e6f7fb] hover:text-[#0eb6d4]"
          >
            All Destinations
            <ArrowRightIcon className="size-4" />
          </Button>
        </Link>
      </div>

      {/* Sliding marquee of destination cards */}
      <MarqueeText
        duration={15}
        direction="right"
        pauseOnHover
        className="mt-12"
      >
        {destinations.map((destination) => (
          <FeaturedCard key={destination._id} destination={destination} />
        ))}
      </MarqueeText>
    </section>
  );
};

export default Featured;
