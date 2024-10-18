import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/pages/home/contact/Contact";
import Hero from "@/components/pages/home/hero/Hero";
import Team from "@/components/pages/home/team/Team";
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
        <Team />
        <Contact />
        <Footer />
      </ReactLenis>
    </>
  );
}
