import { Banner } from "@/components/banner";
import { WhyChoose } from "@/components/why-choose";
import Featured from "@/components/Featured";
import { Testimonials } from "@/components/testimonials";
import { Cta } from "@/components/cta";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChoose />
      <Featured />
      <Testimonials />
      <Cta />
    </>
  );
}
