import Companycarousel from "@/components/Companycarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ChevronRight, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import faqs from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    title: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    icon: Layout,
  },
  {
    title: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    icon: Layout,
  },
  {
    title: "Easy to use",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Sed euismod, nunc ut aliquam aliquam, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.",
    icon: Layout,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* herosection */}
      <section className="container mx-auto py-20 text-center">
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">
          Streamline your Work Flow <br />
          <span className="flex mx-auto gap-3 sm:gap-4 items-center">
            {" "}
            With
            <Image
              src={"/logo.png"}
              alt="logo"
              width={400}
              height={100}
              className="h-14 sm:h-24 w-auto object-contain"
            />
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          lorem50 sd eihfseeh fuhuehf iovw hifweio vewi
        </p>
        <Link href="/onboarding">
          <Button size="lg" className="mr-2">
            Get Strted <ChevronRight size={18} />
          </Button>
        </Link>
        <Link href="#features">
          <Button size="lg" className="mr-4" variant="outline">
            Learn More <ChevronRight size={18} className="ml-1" />
          </Button>
        </Link>
      </section>
      {/* featres section */}
      <section id="features" className="bg-gray-900 py-20 px-5">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              return (
                <Card key={i} className="bg-gray-800">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mb-4 text-blue-300" />
                    <h4 className="text-xl font-semibold mb-2">
                      {feature?.title}
                    </h4>
                    <p className="text-gray-300">{feature?.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* carousel */}
      <section className=" py-20 ">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Trusted by top Companies
          </h3>
          <Companycarousel />
        </div>
      </section>
      {/* faqs */}
      <section className=" bg-gray-900 py-20 px-5 ">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Frequently answerd questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs &&
              faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger>{f?.question}</AccordionTrigger>
                  <AccordionContent>{f?.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </section>
      {/* calltoaction */}
      <section className=" py-20 text-center px-5 ">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-6 ">
            Ready to Transform your workflow
          </h3>
          <p className="text-xl mb-12">
            {" "}
            ehihe udhfujsdhf jksdhjkfhsdkj hfiushf iehfwhf iwqjfeo
          </p>
          <Link href="/onboarding">
            <Button size="lg" className="animate-bounce">
              Start for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
