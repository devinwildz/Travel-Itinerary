"use client";

import { Card } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective date: March 16, 2026
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur p-6 md:p-8 space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This Privacy Policy explains how we collect, use, and protect
              information when you use the AI Travel Itinerary Generator. By
              using the service, you agree to the practices described below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Information We Collect</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Account details such as email and authentication data.</li>
              <li>Trip preferences you submit (destination, duration, budget).</li>
              <li>Usage data, including pages viewed and interactions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">How We Use Information</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Provide and personalize itinerary results.</li>
              <li>Improve product performance and reliability.</li>
              <li>Communicate essential service updates.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Sharing</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We do not sell your personal information. We may share data with
              service providers (such as analytics or infrastructure partners)
              only as needed to operate the service and under appropriate
              safeguards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Retention</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We retain information only as long as needed for the purposes
              described in this policy, unless a longer retention period is
              required by law.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Choices</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You can request access, correction, or deletion of your data by
              contacting support. You may also opt out of non-essential
              communications at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use reasonable administrative, technical, and physical
              safeguards to protect your information. No method of transmission
              is fully secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For privacy questions, contact support at
              infotripinit@gmail.com
            </p>
          </section>
        </Card>
      </div>
    </main>
  );
}
