import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@assets/generated_images/abstract_3d_neural_network_hero_image.png";
import { SyllabusModal } from "@/components/SyllabusModal";
import { LeadSignupModal } from "@/components/LeadSignupModal";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold mb-6 border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Production-Ready AI Training
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-[1.1] mb-6 text-foreground">
              Master Production <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                AI Systems
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Transform from beginner to Enterprise AI Engineer. Build real-world applications using OpenAI, Claude, and RAG architectures in 4 weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <LeadSignupModal
                source="hero_cta"
                trigger={
                  <Button size="lg" className="text-lg h-14 px-8 shadow-xl shadow-primary/25 rounded-xl" data-testid="button-start-learning">
                    Start Learning Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                }
              />
              <SyllabusModal
                trigger={
                  <Button variant="outline" size="lg" className="text-lg h-14 px-8 rounded-xl border-2" data-testid="button-view-curriculum">
                    View Curriculum
                  </Button>
                }
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>Production-Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                <span>Live Labs</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl opacity-30" />
            <img
              src={heroImage}
              alt="Neural Network Visualization"
              className="relative w-full h-auto rounded-3xl shadow-2xl shadow-primary/10 border border-white/50 backdrop-blur-sm"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
