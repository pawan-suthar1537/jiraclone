"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle2, Github, Linkedin, ExternalLink, Clock, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate swift dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you! Your message has been received.");
    }, 800);
  };

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

        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 px-3.5 py-1 text-xs">
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Support & Inquiries
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Have a question, feedback, or need help setting up iconScrum for your engineering team? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Info Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md p-6 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" /> Direct Contact
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Reach out directly for feature suggestions, bug reports, or enterprise collaboration.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="p-2 rounded-lg bg-zinc-800 text-blue-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm break-all">
                    pawansuthar15372097023627153@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <div className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Average response: &lt; 24 hours</span>
                </div>
              </div>
            </div>

            {/* Social / Portfolio Links */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                Connect Directly
              </h3>
              <div className="space-y-2">
                <Link
                  href="https://portfolio-nine-inky-66.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-400" /> Pawan Suthar Portfolio
                  </span>
                  <span className="text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">Visit &rarr;</span>
                </Link>
                <Link
                  href="https://github.com/pawan-suthar1537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub Profile
                  </span>
                  <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">View &rarr;</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pawansuthar1537/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 hover:border-blue-500/40 text-zinc-300 hover:text-white transition-all text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
                  </span>
                  <span className="text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">Connect &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Quick FAQ Link */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Looking for quick answers?</h4>
                <Link href="/#faq" className="text-xs text-blue-400 hover:underline">
                  Browse frequently asked questions &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md p-6 sm:p-8">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for contacting iconScrum. We have logged your message and will review it shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-4 border-zinc-700"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-white mb-2">Send us a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-300">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Sarah Connor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-300">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-300">Subject</label>
                    <Input
                      type="text"
                      placeholder="Feedback, Feature Request, or Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-300">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <Textarea
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-zinc-950/80 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-8 shadow-md shadow-blue-500/20"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
