import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  BarChart3,
  Users,
  Workflow,
  Target,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Issue Tracking",
    description:
      "Track bugs, tasks, and stories with custom workflows. Every issue has full history and context.",
    icon: Target,
    accent: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Sprint Planning",
    description:
      "Plan work in time-boxed sprints. Start, monitor, and close sprints with clear boundaries.",
    icon: Workflow,
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    title: "Team Collaboration",
    description:
      "Assign work, mention teammates, and track changes. Everyone stays in sync automatically.",
    icon: Users,
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    title: "Analytics",
    description:
      "Burndown charts, velocity tracking, and custom reports. Make decisions backed by data.",
    icon: BarChart3,
    accent: "from-orange-500/20 to-orange-500/5",
  },
  {
    title: "Custom Workflows",
    description:
      "Design workflows that match how your team works. Custom statuses, transitions, and rules.",
    icon: Zap,
    accent: "from-pink-500/20 to-pink-500/5",
  },
  {
    title: "Enterprise Security",
    description:
      "Role-based permissions, SSO, and audit logs. Keep your work secure and compliant.",
    icon: Shield,
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
];

const stats = [
  { value: "10k+", label: "Active users" },
  { value: "500+", label: "Teams onboarded" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Support coverage" },
];

const testimonials = [
  {
    quote:
      "Finally, a project management tool that doesn't feel like a spreadsheet. Our team actually enjoys using it.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "Vercel",
  },
  {
    quote:
      "We moved from Jira in a week. The migration was smooth and the team was productive from day one.",
    author: "Marcus Rodriguez",
    role: "CTO",
    company: "Stripe",
  },
  {
    quote:
      "The sprint management is exactly what we needed. Simple enough for startups, powerful enough for scale-ups.",
    author: "Emily Park",
    role: "Product Director",
    company: "Linear",
  },
];

const integrations = [
  { name: "GitHub", slug: "github" },
  { name: "GitLab", slug: "gitlab" },
  { name: "Slack", slug: "slack" },
  { name: "Figma", slug: "figma" },
  { name: "Notion", slug: "notion" },
  { name: "Discord", slug: "discord" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="iconScrum"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-gray-400 hover:text-gray-100"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm text-gray-400 hover:text-gray-100"
            >
              Customers
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-gray-400 hover:text-gray-100"
            >
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Project management, reimagined
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Ship faster with{" "}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  clarity
                </span>
              </h1>
              <p className="max-w-xl text-lg text-gray-400">
                The project management tool your team will actually want to use.
                Plan sprints, track issues, and ship work without the chaos.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-zinc-700"
                  >
                    See how it works
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                No credit card required. Free for teams up to 10.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-violet-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <img
                  src="https://picsum.photos/seed/jiraclone-dashboard/800/600"
                  alt="iconScrum dashboard preview"
                  className="rounded-lg shadow-2xl"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-zinc-800 bg-zinc-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-100">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Powerful features without the complexity. Built for teams who want
              to focus on work, not tooling.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group relative border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <CardContent className="relative p-6">
                  <feature.icon className="mb-4 h-10 w-10 text-gray-300" />
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="border-y border-zinc-800 bg-zinc-900/30 py-16">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-500">
            Integrates with your favorite tools
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {integrations.map((integration) => (
              <div
                key={integration.slug}
                className="flex items-center gap-2 text-gray-400"
              >
                <div className="h-8 w-8 rounded bg-zinc-800" />
                <span className="text-sm font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by engineering teams
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              See what teams are saying about making the switch.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.author}
                className="border-zinc-800 bg-zinc-900/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 text-gray-300">
                    &ldquo;{testimonial.quote}&rdquo;
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-700" />
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
                Join thousands of teams already using iconScrum to ship better
                work, faster.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-zinc-700"
                  >
                    Sign in to existing
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Free for up to 10 users
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                src="/logo.png"
                alt="iconScrum"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <p className="mt-4 text-sm text-gray-500">
                Project management for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#features" className="hover:text-gray-300">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-gray-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-300">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} iconScrum. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/pawan-suthar1537"
                className="text-gray-500 hover:text-gray-300"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/pawansuthar1537/"
                className="text-gray-500 hover:text-gray-300"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-500 hover:text-gray-300"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
