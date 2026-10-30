import Link from "next/link";
import { Shield, ArrowLeft, Lock, Eye, FileText, Database, UserCheck, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Privacy Policy — iconScrum",
  description: "Learn how iconScrum collects, uses, and safeguards your organization and sprint data.",
};

export default function PrivacyPage() {
  const lastUpdated = "October 30, 2026";

  const sections = [
    {
      icon: Eye,
      title: "1. Information We Collect",
      content: (
        <>
          <p className="text-zinc-300 leading-relaxed mb-3">
            At iconScrum, we respect your data privacy and are committed to protecting it. We collect information you provide directly to us when creating an account, establishing an organization, and managing sprint workflows:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li><strong>Account Details:</strong> Name, email address, profile avatar via Clerk authentication.</li>
            <li><strong>Project & Sprint Data:</strong> Project keys, sprint cycles, issue titles, descriptions, status transitions, and story points.</li>
            <li><strong>Usage Diagnostics:</strong> Log data, browser type, interaction timestamps, and device diagnostics to optimize performance.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Database,
      title: "2. How We Use Your Information",
      content: (
        <>
          <p className="text-zinc-300 leading-relaxed mb-3">
            We use the collected information solely to operate, improve, and deliver iconScrum services:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>To provide agile sprint boards, backlog management, and real-time team collaboration.</li>
            <li>To authenticate users and enforce organization-level role permissions.</li>
            <li>To calculate sprint velocity, burndown charts, and progress diagnostics.</li>
            <li>To prevent fraud, security incidents, and unauthorized workspace access.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Lock,
      title: "3. Data Security & Encryption",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          We implement industry-standard encryption protocols (TLS/SSL in transit and AES-256 at rest) across our database infrastructure. Authentication is securely handled with enterprise-grade tokenization via Clerk, ensuring passwords and sensitive credentials are never stored in plaintext on our servers.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "4. Third-Party Integrations & Sub-processors",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          We only share information with verified infrastructure providers strictly necessary to deliver our application: Clerk (identity management and authentication), Supabase/PostgreSQL (secure relational database storage), and Vercel (edge hosting and application delivery). We never sell your personal data or project contents to advertising networks.
        </p>
      ),
    },
    {
      icon: FileText,
      title: "5. Your Rights & Data Portability",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          You hold full ownership of your project data. You have the right to inspect, update, export, or permanently delete your account and associated organization data at any time. To request data extraction or account deletion, reach out through our contact page or email us directly.
        </p>
      ),
    },
    {
      icon: Bell,
      title: "6. Updates to This Policy",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          We may update this Privacy Policy periodically to reflect new features or regulatory requirements. Material modifications will be indicated by revising the &quot;Last updated&quot; date at the top of this page.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 px-3 py-1 text-xs">
            <Shield className="w-3.5 h-3.5 mr-1.5" /> Legal & Privacy
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last updated: <span className="text-zinc-200">{lastUpdated}</span>
          </p>
          <p className="text-base text-zinc-300 max-w-2xl leading-relaxed">
            Your privacy and project confidentiality are foundational to iconScrum. This policy details our transparent data handling principles.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm p-6 sm:p-8 transition-colors hover:border-zinc-700/80"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm sm:text-base leading-relaxed pl-1 sm:pl-11">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Callout */}
        <div className="mt-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Have questions regarding your data privacy?
            </h3>
            <p className="text-sm text-zinc-400">
              Our engineering team is happy to assist with any security or privacy compliance queries.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center mt-4 sm:mt-0 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors whitespace-nowrap shadow-md shadow-blue-500/20"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
