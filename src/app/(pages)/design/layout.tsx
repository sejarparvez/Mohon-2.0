import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/footer/Footer";
import Hero from "@/components/pages/home/hero/Hero";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header fixed />
      <Hero />
      {children}
      <Footer />
    </div>
  );
}
