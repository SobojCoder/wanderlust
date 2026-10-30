"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Japan In Spring Was A Dream. Cherry Blossoms Everywhere, Delicious Food And A Guide Who Made Every Stop Feel Personal And Unique."',
    name: "Emily Watson",
    location: "London, UK",
    image: "/images/person2.png",
  },
  {
    quote:
      '"From The Desert Safari To The Sunset Cruise, Everything Ran Smoothly. This Was The Easiest And Most Enjoyable Trip We Have Ever Booked."',
    name: "David Park",
    location: "Seoul, South Korea",
    image: "/images/person1.png",
  },
];

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-background px-4 py-16 md:py-24">
      <Carousel
        opts={{ align: "start", loop: false }}
        setApi={setApi}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-medium text-foreground md:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous slide"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
              className="size-11 rounded-full border-border/70 text-muted-foreground"
            >
              <ArrowLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next slide"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
              className="size-11 rounded-full border-border/70 text-muted-foreground"
            >
              <ArrowRightIcon className="size-4" />
            </Button>
          </div>
        </div>

        <CarouselContent className="mt-8">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.name} className="md:basis-1/2">
              <div className="flex h-full gap-5 rounded-md border border-border/70 bg-white p-6">
                <div className="flex flex-1 flex-col justify-between">
                  <p className="text-[15px] leading-relaxed text-foreground">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-[#0eb6d4]">
                      — {testimonial.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={156}
                  height={196}
                  className="h-[196px] w-[156px] shrink-0 rounded-sm object-cover max-sm:h-[160px] max-sm:w-[110px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
