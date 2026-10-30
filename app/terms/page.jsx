import Link from "next/link";
import { Scale, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Terms of Service — iconScrum",
  description: "Read the iconScrum terms of service and agreement guidelines for agile project collaboration.",
};

export default function TermsPage() {
  const lastUpdated = "October 30, 2026";

  const terms = [
    {
      icon: CheckCircle2,
      title: "1. Acceptance of Terms",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          By accessing or using iconScrum (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you possess the authority to bind such entity to these terms. If you do not agree with these terms, do not access or use the Service.
        </p>
      ),
    },
    {
      icon: Terminal,
      title: "2. User Accounts & Organization Management",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          To utilize iconScrum, you must sign in via our supported authentication providers. You are responsible for maintaining the confidentiality of your session and all activities carried out under your account or created organizations. You agree to notify us immediately of any unauthorized use or security vulnerability detected.
        </p>
      ),
    },
    {
      icon: ShieldCheck,
      title: "3. Acceptable Use & Conduct",
      content: (
        <>
          <p className="text-zinc-300 leading-relaxed mb-3">
            You agree to use iconScrum solely for lawful software development, task management, and team collaboration. You must not:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Attempt to reverse-engineer, decompile, or compromise the system architecture or APIs.</li>
            <li>Upload malicious code, viruses, or automated scrapers that degrade platform availability.</li>
            <li>Misrepresent organizational ownership or tamper with sprint data of other teams.</li>
            <li>Use the service to distribute unsolicited spam or unlawful content.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Scale,
      title: "4. Intellectual Property & User Content",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          You retain all right, title, and ownership of the sprint backlogs, issue tickets, documentation, and metadata you create or submit to iconScrum. We claim no ownership over your intellectual property. All platform code, trademarks, logos, visual designs, and interface assets remain the exclusive property of iconScrum.
        </p>
      ),
    },
    {
      icon: AlertTriangle,
      title: "5. Service Availability & Disclaimers",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          iconScrum is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied. While we strive for 99.9% uptime, regular maintenance, database backups, and resilient cloud hosting, we cannot guarantee uninterrupted service or zero downtime.
        </p>
      ),
    },
    {
      icon: HelpCircle,
      title: "6. Modifications & Termination",
      content: (
        <p className="text-zinc-300 leading-relaxed">
          We reserve the right to modify or discontinue features, update these terms, or suspend access for accounts that violate acceptable use principles. Continued use of iconScrum following any updates constitutes acceptance of the revised terms.
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
        <div className="mb-10 sm:mb-12 space-y-3 sm:space-y-4">
          <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400 px-3 py-1 text-xs">
            <Scale className="w-3.5 h-3.5 mr-1.5" /> Terms & Conditions
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Last updated: <span className="text-zinc-200">{lastUpdated}</span>
          </p>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
            Please read these terms carefully before utilizing iconScrum for your agile project workflows and software team operations.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-5 sm:space-y-6">
          {terms.map((term, idx) => {
            const Icon = term.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-sm p-5 sm:p-8 transition-colors hover:border-zinc-700/80"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {term.title}
                  </h2>
                </div>
                <div className="text-xs sm:text-base leading-relaxed pl-0 sm:pl-11">
                  {term.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Callout */}
        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Questions regarding our service terms?
            </h3>
            <p className="text-sm text-zinc-400">
              Get in touch with us if you need enterprise agreements or customized operational terms.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center mt-4 sm:mt-0 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-colors whitespace-nowrap shadow-md shadow-purple-500/20"
          >
            Reach Out
          </Link>
        </div>
      </div>
    </div>
  );
}
