import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  FileText,
  Layers,
  Palette,
  PenTool,
  Printer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const printDesignServices = [
  {
    title: "Brochures & Flyers",
    description:
      "Eye-catching brochures and flyers that effectively communicate your message.",
    icon: FileText,
  },
  {
    title: "Business Cards",
    description:
      "Memorable business cards that make a lasting first impression.",
    icon: PenTool,
  },
  {
    title: "Posters & Banners",
    description:
      "Impactful posters and banners that grab attention and convey information clearly.",
    icon: Layers,
  },
  {
    title: "Packaging Design",
    description:
      "Innovative packaging designs that enhance product appeal and brand recognition.",
    icon: Palette,
  },
];

const portfolioItems = [
  {
    title: "Corporate Brochure",
    description: "A sleek tri-fold brochure design for a tech company.",
    image:
      "https://img.freepik.com/free-psd/business-bifold-brochure-template_1435-1541.jpg?w=1380&h=980&t=st=1701706614~exp=1701707214~hmac=d0bd5c6e7b3b7d7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e",
  },
  {
    title: "Event Poster",
    description: "A vibrant poster design for a music festival.",
    image:
      "https://img.freepik.com/free-psd/music-event-poster-template_23-2148990720.jpg?w=1380&h=980&t=st=1701706643~exp=1701707243~hmac=d0bd5c6e7b3b7d7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e",
  },
  {
    title: "Product Packaging",
    description: "Innovative packaging design for an organic food brand.",
    image:
      "https://img.freepik.com/free-psd/food-packaging-mockup_439185-2941.jpg?w=1380&h=980&t=st=1701706669~exp=1701707269~hmac=d0bd5c6e7b3b7d7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e",
  },
];

export default function PrintDesignPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <div className="lg:w-1/2">
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Bring Your Ideas to <span className="text-primary">Print</span>
              </h1>
              <p className="mb-8 text-xl text-muted-foreground">
                Create stunning print designs that make a lasting impression and
                elevate your brand.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="lg:w-1/2">
              <Image
                src="https://img.freepik.com/free-vector/gradient-geometric-design-background_23-2149120340.jpg?w=1380&h=980&t=st=1701706701~exp=1701707301~hmac=d0bd5c6e7b3b7d7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e"
                alt="Print Design Illustration"
                width={700}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-background via-background to-background/50"></div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Print Design Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {printDesignServices.map((service) => (
              <Card
                key={service.title}
                className="bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Design Process
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {["Consultation", "Concept", "Design", "Refinement"].map(
              (step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                    {index + 1}
                  </div>
                  <h3 className="mb-2 text-center text-xl font-semibold">
                    {step}
                  </h3>
                  <p className="text-center text-sm text-muted-foreground">
                    We work closely with you to ensure your vision comes to life
                    in print.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our Print Design Portfolio
          </h2>
          <Tabs defaultValue="item1" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              {portfolioItems.map((item, index) => (
                <TabsTrigger key={index} value={`item${index + 1}`}>
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {portfolioItems.map((item, index) => (
              <TabsContent key={index} value={`item${index + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            What Our Clients Say
          </h2>
          <div className="mx-auto max-w-4xl">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-6">
                <p className="mb-6 text-xl italic">
                  The print designs created by this team exceeded our
                  expectations. Their attention to detail and creativity truly
                  brought our brand to life on paper.
                </p>
                <div className="flex items-center">
                  <Image
                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200&h=200&t=st=1701706740~exp=1701707340~hmac=d0bd5c6e7b3b7d7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e7e"
                    alt="Client"
                    width={60}
                    height={60}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Michael Thompson</p>
                    <p className="text-sm opacity-75">
                      Marketing Manager, Global Innovations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Why Choose Our Print Design Services
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Expert Designers",
                description:
                  "Our team of skilled designers brings years of experience to every project.",
                icon: PenTool,
              },
              {
                title: "Quality Materials",
                description:
                  "We use only the highest quality materials to ensure your prints look and feel premium.",
                icon: Palette,
              },
              {
                title: "Quick Turnaround",
                description:
                  "We deliver your print designs on time, every time, without compromising on quality.",
                icon: Printer,
              },
            ].map((item, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="contact"
        className="bg-primary py-20 text-primary-foreground"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Bring Your Ideas to Print?
          </h2>
          <p className="mb-8 text-xl">
            Let&#39;s create stunning print designs that make a lasting
            impression
          </p>
          <Button asChild size="lg" variant="secondary" className="group">
            <Link href="/contact">
              Get a Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}