import { Banner } from "@/components/homepage/banner";
import { WhyChoose } from "@/components/homepage/why-choose";
import Featured from "@/components/homepage/Featured";
import { Testimonials } from "@/components/homepage/testimonials";
import { Cta } from "@/components/homepage/cta";

export default function Home() {
  return (
    <>
      <Banner />
      <Featured />
      <WhyChoose />
      <Testimonials />
      <Cta />
    </>
  );
}
