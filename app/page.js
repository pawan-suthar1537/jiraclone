"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  Workflow,
  Users,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Flame,
  TrendingUp,
  Layers,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Companycarousel from "@/components/Companycarousel";
import InteractiveKanban from "@/components/landing/InteractiveKanban";
import faqs from "@/data/faqs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: "Sprint & Backlog Management",
    description:
      "Plan time-boxed sprints with capacity metrics, custom story points, and sprint goals. Move backlog items into active sprints with zero friction.",
    icon: Workflow,
    accent: "from-blue-500/20 via-blue-500/5 to-transparent",
    borderGlow: "group-hover:border-blue-500/50",
    iconColor: "text-blue-400",
    badge: "Agile Core",
  },
  {
    title: "Precision Issue Tracking",
    description:
      "Log bugs, stories, and tasks with rich markdown descriptions. Set granular priorities (Urgent, High, Medium, Low) and assign team members instantly.",
    icon: Target,
    accent: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50",
    iconColor: "text-indigo-400",
    badge: "Detailed Triage",
  },
  {
    title: "Dynamic Custom Workflows",
    description:
      "Adapt your board to how your engineers ship. Clean transitions between To Do, In Progress, In Review, and Done ensure full team alignment.",
    icon: Zap,
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    borderGlow: "group-hover:border-amber-500/50",
    iconColor: "text-amber-400",
    badge: "Workflow Automation",
  },
  {
    title: "Real-Time Collaboration",
    description:
      "Comment on issues, mention teammates, and review status updates live. Keep conversations tethered directly to the code and tickets they affect.",
    icon: Users,
    accent: "from-purple-500/20 via-purple-500/5 to-transparent",
    borderGlow: "group-hover:border-purple-500/50",
    iconColor: "text-purple-400",
    badge: "Team Sync",
  },
  {
    title: "Sprint Analytics & Velocity",
    description:
      "Monitor burndown charts, track historical velocity, and identify delivery bottlenecks before they derail your upcoming software releases.",
    icon: BarChart3,
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
    badge: "Actionable Data",
  },
  {
    title: "Enterprise Organization Security",
    description:
      "Seamless multi-tenant organization switching with role-based access control. Protect proprietary project data with robust Clerk token authentication.",
    icon: ShieldCheck,
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
    borderGlow: "group-hover:border-rose-500/50",
    iconColor: "text-rose-400",
    badge: "Multi-Tenant",
  },
];

const stats = [
  { value: "10k+", label: "Active Engineers", change: "+42% this year" },
  { value: "500+", label: "Teams Onboarded", change: "Fast-moving startups" },
  { value: "99.9%", label: "Uptime Availability", change: "Enterprise SLA" },
  { value: "3.4x", label: "Faster Sprint Delivery", change: "Zero bloat" },
];

const workflowSteps = [
  {
    step: "01",
    title: "Create Organization & Workspace",
    description:
      "Establish your company workspace, configure project keys, and invite developers and designers in seconds.",
    accent: "text-blue-400",
  },
  {
    step: "02",
    title: "Prioritize Backlog & Story Points",
    description:
      "Create user stories, assign Fibonacci story points, and rank tasks based on technical dependencies and urgency.",
    accent: "text-indigo-400",
  },
  {
    step: "03",
    title: "Execute Sprints on Kanban",
    description:
      "Start time-boxed sprint cycles. Drag tasks seamlessly across columns with real-time feedback and state synchronization.",
    accent: "text-purple-400",
  },
  {
    step: "04",
    title: "Review Velocity & Ship Milestones",
    description:
      "Close sprints, examine burndown trajectories, and celebrate shipped milestones with measurable productivity gains.",
    accent: "text-emerald-400",
  },
];

const testimonials = [
  {
    quote:
      "iconScrum finally gives our engineering team the speed of Linear combined with the sprint power of Jira. No bloated configuration menus—just pure velocity.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "Vercel Ecosystem",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote:
      "We migrated our entire 40-person product team in one afternoon. The sprint management and clean drag-and-drop board feel unbelievably responsive.",
    author: "Marcus Rodriguez",
    role: "VP of Engineering",
    company: "CloudScale Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
  },
  {
    quote:
      "The clarity iconScrum brings to sprint planning is phenomenal. Everyone on the team knows exactly what to pull next without endless status meetings.",
    author: "Emily Park",
    role: "Head of Product",
    company: "Hyperion Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
  },
];

export default function Home() {
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroActionsRef = useRef(null);
  const heroTrustRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero entrance animation timeline
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .fromTo(
        heroBadgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 }
      )
      .fromTo(
        heroTitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.4"
      )
      .fromTo(
        heroDescRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        heroActionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        heroTrustRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.3"
      );

    // Stats counter / reveal on scroll
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll(".stat-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Features cards stagger reveal on scroll
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.querySelectorAll(".feature-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Workflow steps reveal on scroll
    if (workflowRef.current) {
      gsap.fromTo(
        workflowRef.current.querySelectorAll(".workflow-card"),
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: workflowRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // FAQ section fade in
    if (faqRef.current) {
      gsap.fromTo(
        faqRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // CTA section scale and glow
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      {/* Background radial atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[140px]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-16 lg:pt-20 pb-12 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center">
          {/* Animated Announcement Pill */}
          <div ref={heroBadgeRef} className="inline-flex items-center justify-center mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-xs sm:text-sm text-blue-300 shadow-sm shadow-blue-500/20 max-w-full">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
              <span className="font-semibold text-white">iconScrum 2.0</span>
              <span className="text-blue-400/80 hidden xs:inline">&bull;</span>
              <span className="truncate">Next-Gen Agile Platform</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 shrink-0" />
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1
            ref={heroTitleRef}
            className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-5 sm:mb-6"
          >
            Ship faster with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              clarity
            </span>
            ,<br className="hidden sm:inline" /> build without the chaos.
          </h1>

          {/* Subtitle Description */}
          <p
            ref={heroDescRef}
            className="text-sm sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-1 sm:px-0"
          >
            The agile sprint management and issue tracking workspace engineered
            for high-velocity engineering teams. Plan sprints, triage issues,
            and deliver quality software without spreadsheet fatigue.
          </p>

          {/* Call to Action Buttons */}
          <div
            ref={heroActionsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-md sm:max-w-none mx-auto"
          >
            <Link href="/onboarding" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#preview" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-7 border-zinc-700/80 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium text-sm sm:text-base backdrop-blur-sm"
              >
                <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                <span>Explore Live Demo</span>
              </Button>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div
            ref={heroTrustRef}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-400"
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              Free for growing teams
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              Instant 60s setup
            </span>
          </div>

          {/* 2. SHOWCASE: INTERACTIVE 3D KANBAN BOARD */}
          <div id="preview" className="mt-8 sm:mt-14">
            <InteractiveKanban />
          </div>
        </div>
      </section>

      {/* 3. METRICS / STATS SECTION */}
      <section
        ref={statsRef}
        className="border-y border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md py-10 sm:py-14"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item text-center space-y-1">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent font-mono">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-blue-400 font-medium">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUSTED BY TOP TECH COMPANIES */}
      <section className="py-12 sm:py-16 lg:py-20 border-b border-zinc-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-zinc-400 font-semibold mb-6 sm:mb-8 px-2">
            Empowering modern engineering teams at forward-thinking companies
          </p>
          <Companycarousel />
        </div>
      </section>

      {/* 5. CORE FEATURES BENTO GRID */}
      <section id="features" ref={featuresRef} className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <Badge
              variant="outline"
              className="border-blue-500/30 bg-blue-500/10 text-blue-400 px-3 py-1 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Engineered for Speed
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Everything your team needs to ship on schedule
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed px-1">
              Ditch slow loading times and endless configuration submenus. iconScrum
              focuses entirely on what keeps your sprint velocity peaking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className={`feature-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-5 sm:p-7 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-black/50 ${feature.borderGlow}`}
                >
                  {/* Subtle hover gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div
                          className={`p-2.5 sm:p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-zinc-800/70 text-zinc-400 border border-zinc-700/60">
                          {feature.badge}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="pt-4 sm:pt-5 mt-4 border-t border-zinc-800/60 flex items-center text-xs text-zinc-400 group-hover:text-white transition-colors">
                      <span>Learn sprint workflow</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. AGILE WORKFLOW STEP-BY-STEP */}
      <section
        id="workflow"
        ref={workflowRef}
        className="py-16 sm:py-24 lg:py-32 border-t border-zinc-800/80 bg-zinc-950/70 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <Badge
              variant="outline"
              className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400 px-3 py-1 text-xs"
            >
              <Workflow className="w-3.5 h-3.5 mr-1.5" /> Seamless Lifecycle
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              From Backlog to Production in 4 Simple Steps
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed px-1">
              Eliminate friction at every stage of your delivery cycle with clean,
              purpose-built sprint mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="workflow-card relative rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-5 sm:p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span
                      className={`text-2xl sm:text-3xl font-extrabold font-mono ${step.accent}`}
                    >
                      {step.step}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-zinc-800/60 flex items-center gap-1.5 text-xs text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated Sync</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Trusted by engineering leaders
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              Discover why high-performing software teams switched to iconScrum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <Card
                key={idx}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-md p-5 sm:p-7 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base text-zinc-300 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-zinc-700 shrink-0"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white">
                      {t.author}
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-400">
                      {t.role} &bull; {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ SECTION */}
      <section
        id="faq"
        ref={faqRef}
        className="py-16 sm:py-24 lg:py-32 border-t border-zinc-800/80 bg-zinc-950/60"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-10 sm:mb-14 space-y-3 sm:space-y-4">
            <Badge
              variant="outline"
              className="border-purple-500/30 bg-purple-500/10 text-purple-400 px-3 py-1 text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Answers on Demand
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-xl mx-auto px-2">
              Everything you need to know about setting up iconScrum, managing
              sprints, and onboarding your developers.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/50 px-4 sm:px-6 py-0.5 sm:py-1 data-[state=open]:border-zinc-700 transition-colors"
              >
                <AccordionTrigger className="text-left text-xs sm:text-base font-semibold text-zinc-200 hover:text-white hover:no-underline py-3.5 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-zinc-400 leading-relaxed pb-3.5 sm:pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 sm:mt-10 text-center">
            <p className="text-xs sm:text-sm text-zinc-400">
              Have another question not answered above?{" "}
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
              >
                Contact our support team &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 9. HIGH-CONVERSION FINAL CALL TO ACTION */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div
            ref={ctaRef}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-zinc-900/90 to-purple-950/40 p-6 sm:p-12 lg:p-16 text-center shadow-2xl shadow-blue-950/40"
          >
            {/* Radial glow background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_65%)] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <Badge
                variant="outline"
                className="border-blue-400/30 bg-blue-500/10 text-blue-300 px-3 py-1 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> High-Velocity Agile
              </Badge>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Ready to take your sprint delivery to the next level?
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-zinc-300 leading-relaxed px-1">
                Join thousands of software engineers already using iconScrum to
                ship better software without the chaos. Set up your workspace in
                60 seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 max-w-md sm:max-w-none mx-auto">
                <Link href="/onboarding" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-500/30"
                  >
                    <span>Start Using iconScrum Free</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-11 sm:h-12 px-5 sm:px-7 border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium text-sm sm:text-base"
                  >
                    <span>Sign In to Existing Project</span>
                  </Button>
                </Link>
              </div>

              <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Free for up to 10 users
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
