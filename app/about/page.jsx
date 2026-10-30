import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Rocket, Zap, Users, Code2, Sparkles, CheckCircle2, Github, Linkedin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About iconScrum — Built for High-Velocity Engineering",
  description: "Learn about iconScrum's mission to eliminate agile bloat and deliver lightning-fast sprint management.",
};

export default function AboutPage() {
  const pillars = [
    {
      icon: Zap,
      title: "Eliminate Agile Bloat",
      description:
        "Traditional project management tools have become cumbersome spreadsheets disguised as software. iconScrum strips away the noise, focusing purely on what drives sprint completion.",
      color: "from-blue-500/20 to-blue-500/5",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: Rocket,
      title: "High-Velocity Sprints",
      description:
        "Create, organize, and monitor sprints with immediate visual feedback. Drag-and-drop Kanban boards keep your team in flow without page reloads or clunky modal loops.",
      color: "from-indigo-500/20 to-indigo-500/5",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-400",
    },
    {
      icon: Users,
      title: "Seamless Collaboration",
      description:
        "Multi-organization support with fine-grained role assignments. Engineers, product owners, and stakeholders share a single source of truth for all deliverables.",
      color: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
    {
      icon: Code2,
      title: "Engineered with Modern Tech",
      description:
        "Built using Next.js 15 App Router, React 19, Prisma ORM, PostgreSQL, TailwindCSS, and GSAP animations for silky 60fps responsiveness and rock-solid reliability.",
      color: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-16 space-y-6">
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 px-3.5 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Our Mission & Vision
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Project management your team will{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              actually love
            </span>{" "}
            using.
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl leading-relaxed">
            iconScrum was founded on a simple observation: modern software teams spend more time wrestling with their project tracking tools than shipping meaningful software. We set out to change that with speed, clarity, and aesthetic craft.
          </p>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border ${pillar.border} bg-zinc-900/60 backdrop-blur-md p-8 transition-all hover:translate-y-[-2px]`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-40 pointer-events-none`} />
                <div className="relative z-10">
                  <div className={`p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 w-fit mb-5 ${pillar.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Creator / Engineering Spotlight */}
        <div className="rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs">
                Crafted by
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Pawan Suthar
              </h2>
              <p className="text-zinc-300 leading-relaxed max-w-xl">
                Full-stack developer passionate about building ultra-fast web applications, elegant developer tools, and intuitive digital experiences with scalable architectures.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <Link
                  href="https://portfolio-nine-inky-66.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-md shadow-blue-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Portfolio
                </Link>
                <Link
                  href="https://github.com/pawan-suthar1537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pawansuthar1537/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Ready to experience the new standard?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Get started in seconds. No credit card required, free for growing engineering teams.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25">
                Start Using iconScrum Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
