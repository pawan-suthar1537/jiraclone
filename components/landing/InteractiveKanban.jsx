"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Flame,
  TrendingUp,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  Layers,
  ChevronDown
} from "lucide-react";
import gsap from "gsap";

const initialTasks = [
  {
    id: "SCRUM-102",
    title: "Implement OAuth2 PKCE token refresh cycle",
    status: "todo",
    priority: "High",
    points: 5,
    tag: "Backend",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    assignee: "Sarah K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-105",
    title: "Mobile responsive touch gesture support",
    status: "todo",
    priority: "Medium",
    points: 3,
    tag: "Mobile",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    assignee: "David R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-98",
    title: "Interactive GSAP 3D Kanban Board UI",
    status: "in_progress",
    priority: "Urgent",
    points: 8,
    tag: "Frontend",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    assignee: "Pawan S.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-99",
    title: "Real-time sprint velocity burndown charts",
    status: "in_progress",
    priority: "High",
    points: 5,
    tag: "Analytics",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    assignee: "Alex M.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-94",
    title: "Clerk multi-tenant role webhooks sync",
    status: "in_review",
    priority: "High",
    points: 5,
    tag: "Security",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    assignee: "Elena V.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-91",
    title: "Next.js 15 App router streaming setup",
    status: "done",
    priority: "Urgent",
    points: 8,
    tag: "Core",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    assignee: "Marcus T.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
  },
  {
    id: "SCRUM-89",
    title: "Dark mode design token system with Tailwind",
    status: "done",
    priority: "Medium",
    points: 3,
    tag: "UI/UX",
    tagColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    assignee: "Sarah K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
  },
];

const columns = [
  { id: "todo", label: "To Do", count: 2, dotColor: "bg-zinc-400" },
  { id: "in_progress", label: "In Progress", count: 2, dotColor: "bg-amber-400", activeGlow: true },
  { id: "in_review", label: "In Review", count: 1, dotColor: "bg-purple-400" },
  { id: "done", label: "Done", count: 2, dotColor: "bg-emerald-400" },
];

export default function InteractiveKanban() {
  const [filter, setFilter] = useState("all");
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);

  // 3D Parallax tilt on mouse move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(cardContainerRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power1.out",
        transformPerspective: 1200,
        transformOrigin: "center center",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardContainerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Continuous subtle floating for micro-badges
    if (badge1Ref.current && badge2Ref.current) {
      gsap.to(badge1Ref.current, {
        y: -8,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(badge2Ref.current, {
        y: 8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const filteredTasks = initialTasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "in_progress") return task.status === "in_progress";
    if (filter === "urgent") return task.priority === "Urgent";
    if (filter === "frontend") return task.tag === "Frontend" || task.tag === "UI/UX";
    return true;
  });

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-6 sm:py-10 select-none">
      {/* Background glow behind board */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-3xl -z-10 rounded-3xl opacity-75" />

      {/* Floating 3D Badge 1: Top Left */}
      <div
        ref={badge1Ref}
        className="absolute -top-3 left-4 sm:-top-5 sm:left-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-blue-500/40 backdrop-blur-xl shadow-xl shadow-blue-950/40"
      >
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
            <span>Sprint Velocity</span>
            <span className="text-emerald-400 font-mono text-[11px]">+34%</span>
          </div>
          <div className="text-[11px] text-zinc-400">19 / 24 story pts delivered</div>
        </div>
      </div>

      {/* Floating 3D Badge 2: Bottom Right */}
      <div
        ref={badge2Ref}
        className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-8 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 backdrop-blur-xl shadow-xl shadow-emerald-950/40"
      >
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-semibold text-white flex items-center gap-1.5">
            <span>Sprint 14 Target</span>
            <span className="text-emerald-400 font-mono text-[11px]">94%</span>
          </div>
          <div className="text-[11px] text-zinc-400">3 days remaining &bull; On Track</div>
        </div>
      </div>

      {/* Main 3D Card Window Container */}
      <div
        ref={cardContainerRef}
        className="relative rounded-2xl sm:rounded-3xl border border-zinc-700/80 bg-zinc-950/90 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-2xl transition-shadow hover:shadow-blue-500/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Window Chrome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60">
          {/* Left: Window dots + project title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-zinc-800">
              <div className="p-1 rounded bg-blue-500/10 text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Andromeda Core
              </span>
              <span className="text-xs text-zinc-500 font-mono">v2.4.0</span>
            </div>
          </div>

          {/* Center: Sprint Timer & Progress */}
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-300 font-medium">Sprint 14</span>
            <span className="text-zinc-500">&bull;</span>
            <span className="text-emerald-400 font-mono">84% completed</span>
          </div>

          {/* Right: Interactive Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: "all", label: "All" },
              { id: "in_progress", label: "In Progress" },
              { id: "urgent", label: "Urgent" },
              { id: "frontend", label: "Frontend" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filter === tab.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kanban Board Columns View */}
        <div className="p-4 sm:p-6 bg-zinc-950/70 overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[680px] lg:min-w-0">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.id);
              return (
                <div
                  key={col.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 flex flex-col gap-3 min-h-[340px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                        {col.label}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Task Cards in this Column */}
                  <div className="space-y-2.5 flex-1">
                    {colTasks.length === 0 ? (
                      <div className="h-28 flex items-center justify-center rounded-lg border border-dashed border-zinc-800/60 text-xs text-zinc-600">
                        No issues matching
                      </div>
                    ) : (
                      colTasks.map((task) => {
                        const isHovered = activeCard === task.id;
                        return (
                          <div
                            key={task.id}
                            onMouseEnter={() => setActiveCard(task.id)}
                            onMouseLeave={() => setActiveCard(null)}
                            className={`group relative rounded-xl border p-3 transition-all duration-200 cursor-pointer ${
                              isHovered
                                ? "border-blue-500/70 bg-zinc-800/90 translate-y-[-2px] shadow-lg shadow-blue-500/10"
                                : "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700"
                            }`}
                          >
                            {/* Card Top: ID & Tag */}
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-mono text-zinc-400 group-hover:text-blue-400 transition-colors">
                                {task.id}
                              </span>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${task.tagColor}`}
                              >
                                {task.tag}
                              </span>
                            </div>

                            {/* Card Title */}
                            <p className="text-xs font-medium text-zinc-200 leading-snug mb-3">
                              {task.title}
                            </p>

                            {/* Card Footer: Priority & Assignee Avatar */}
                            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    task.priority === "Urgent"
                                      ? "bg-rose-400"
                                      : task.priority === "High"
                                      ? "bg-amber-400"
                                      : "bg-blue-400"
                                  }`}
                                />
                                <span className="text-zinc-400">{task.priority}</span>
                                <span className="text-zinc-600">&bull;</span>
                                <span className="font-mono text-zinc-400">{task.points} pts</span>
                              </div>

                              <img
                                src={task.avatar}
                                alt={task.assignee}
                                className="w-5 h-5 rounded-full ring-1 ring-zinc-700 object-cover"
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
