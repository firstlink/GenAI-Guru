import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { CurriculumTimeline } from "@/components/CurriculumTimeline";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { CareerStats } from "@/components/CareerStats";
import { ContactSection } from "@/components/ContactSection";
import { LeadSignupModal } from "@/components/LeadSignupModal";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navigation />

      <main>
        <Hero />
        <CareerStats />
        <CurriculumTimeline />
        <ProjectShowcase />
        <ContactSection />

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 sm:px-6 text-center">
          <div className="container mx-auto max-w-4xl bg-secondary/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6 relative z-10">
              Ready to Join the <span className="text-primary">AI Revolution?</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              Don't get left behind. Master the tools defining the next decade of technology in just 4 weeks.
            </p>
            <LeadSignupModal
              source="cta_section"
              trigger={
                <Button size="lg" className="text-lg h-14 px-10 shadow-xl shadow-primary/25 rounded-xl relative z-10" data-testid="button-enroll-now">
                  Enroll Now - Start Today
                </Button>
              }
            />
            <p className="mt-4 text-sm text-muted-foreground relative z-10">
              Lifetime access • 14-day money-back guarantee
            </p>
          </div>
        </section>
      </main>

      <footer className="py-8 sm:py-12 bg-white border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold font-heading">G</span>
            </div>
            <span className="font-bold font-heading text-lg">GenAIGuru</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 GenAIGuru Training. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
