import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <h2 className="text-4xl font-light leading-tight text-white md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/90 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-14 h-11 gap-4 rounded-none bg-white px-8 text-sm font-medium tracking-widest text-black! uppercase hover:bg-white/90">
          Book Your Trip Today
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </section>
  );
}
