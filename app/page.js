import Companycarousel from "@/components/Companycarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ChevronRight,
  BugIcon,
  Workflow,
  Handshake,
  ClipboardMinus,
  CalendarCheck2,
  Fingerprint,
} from "lucide-react";
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
    title: "Advanced Issue Tracking",
    description:
      "Efficiently manage issues, tasks, and bugs with a streamlined interface. Track progress, prioritize tasks, and assign them to team members with ease to ensure projects stay on schedule.",
    icon: BugIcon,
  },
  {
    title: "Customizable Workflows",
    description:
      "Design workflows that match your team's unique process. Define custom statuses, transitions, and rules to automate repetitive tasks and keep work moving seamlessly.",
    icon: Workflow,
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Empower your team to collaborate effectively with real-time updates and notifications. Comment on issues, mention team members, and track every change with detailed histories.",
    icon: Handshake,
  },
  {
    title: "Detailed Reporting and Analytics",
    description:
      "Gain insights into your team's performance with built-in reports and custom dashboards. Visualize progress, identify bottlenecks, and make data-driven decisions to improve efficiency.",
    icon: ClipboardMinus,
  },
  {
    title: "Sprint and Project Management",
    description:
      "Organize tasks into sprints, set sprint goals, and manage backlogs. Use boards to visually track work, ensuring your team meets deadlines and achieves project milestones.",
    icon: CalendarCheck2,
  },
  {
    title: "Robust Permissions and Security",
    description:
      "Control who can access and modify project data with fine-grained permissions. Protect sensitive information and maintain data integrity by assigning roles and permissions to team members.",
    icon: Fingerprint,
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
          Empower your team, streamline tasks, and reach milestones faster with
          the ultimate project management tool.
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
            Take Your Team's Productivity to the Next Level
          </h3>
          <p className="text-xl mb-12">
            {" "}
            Empower your team with seamless collaboration and efficient
            workflows that keep projects on track.
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
