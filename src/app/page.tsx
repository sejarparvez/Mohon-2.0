import Footer from "@/components/layout/footer/Footer";
import Contact from "@/components/pages/home/contact/Contact";
import Hero from "@/components/pages/home/hero/Hero";
import Services from "@/components/pages/home/services/Services";
import Testimonials from "@/components/pages/home/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
