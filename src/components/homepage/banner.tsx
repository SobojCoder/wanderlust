import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-10 text-center">
        <h1 className="max-w-4xl text-5xl font-light leading-[1.05] text-white md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-sm text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button className="h-12 gap-2 rounded-md bg-[#0eb6d4] px-8 text-sm font-semibold tracking-widest uppercase text-white hover:bg-[#0eb6d4]/85">
            Explore Now
            <ArrowRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-md border-white/30 bg-white/15 px-8 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm hover:bg-white/25 hover:text-white"
          >
            View Destination
          </Button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 border-t border-white/20 bg-black/40 backdrop-blur-sm md:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex flex-col justify-center gap-0.5 border-white/15 px-5 py-3.5 text-left border-b md:border-b-0 md:border-r"
          >
            <span className="text-[15px] font-semibold text-white">
              {field.label}
            </span>
            <span className="text-xs text-white/70">{field.value}</span>
          </div>
        ))}
        <Button className="col-span-2 min-h-14 rounded-none bg-[#0eb6d4] px-10 text-base font-medium text-white hover:bg-[#0eb6d4]/85 md:col-span-1">
          Search
        </Button>
      </div>
    </section>
  );
}
