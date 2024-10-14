import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/pages/home/contact/Contact";
import Hero from "@/components/pages/home/hero/Hero";
import Services from "@/components/pages/home/services/Services";
import Testimonials from "@/components/pages/home/testimonials/Testimonials";
import { ReactLenis } from "../lib/react-lenis";

export default function Home() {
  const lenisOptions = {
    lerp: 0.07, 
    duration: 1.5,
    smoothTouch: true,
    smooth: true,
  };
  return (
    <>
      <ReactLenis root options={lenisOptions}>
        <Hero />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </ReactLenis>
    </>
  );
}
