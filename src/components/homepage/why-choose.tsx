import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e6f7fb] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium text-foreground md:text-5xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-md bg-white p-6 shadow-sm md:p-7"
            >
              <Image
                src={feature.icon}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <h3 className="mt-5 text-2xl font-normal text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
