"use client";

import { Card } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Effective date: March 16, 2026
          </p>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur p-6 md:p-8 space-y-6">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              By accessing or using the AI Travel Itinerary Generator, you
              agree to these Terms of Service. If you do not agree, do not use
              the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Use of the Service</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
              <li>Use the service for lawful purposes only.</li>
              <li>Do not attempt to disrupt or reverse engineer the platform.</li>
              <li>Provide accurate information when submitting forms.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Itinerary Disclaimer</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Itineraries are generated using AI and may contain estimates or
              assumptions. You are responsible for verifying details such as
              prices, availability, and travel requirements before booking.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Accounts</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Intellectual Property</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All content, branding, and software remain the property of the
              service provider and may not be copied or reused without
              permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Termination</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may suspend or terminate access if you violate these terms or
              misuse the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Changes to These Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may update these terms from time to time. Continued use after
              changes indicates acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For questions about these terms, contact support at
              infotripinit@gmail.com
            </p>
          </section>
        </Card>
      </div>
    </main>
  );
}
