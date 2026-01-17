import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import iconLLM from "@assets/generated_images/3d_brain_chip_icon.png";
import iconRAG from "@assets/generated_images/3d_document_search_icon.png";
import iconAgent from "@assets/generated_images/3d_robot_gear_icon.png";
import iconGuard from "@assets/generated_images/3d_shield_icon.png";

const modules = [
  {
    week: "Week 1",
    title: "LLM Fundamentals",
    desc: "Master APIs, tokens, and prompt engineering.",
    icon: iconLLM,
    tags: ["OpenAI", "Claude", "Prompting"],
    project: "SupportGenie Chatbot"
  },
  {
    week: "Week 2",
    title: "RAG Systems",
    desc: "Build AI that knows your documents.",
    icon: iconRAG,
    tags: ["Vector DBs", "Embeddings", "Semantics"],
    project: "DocuMind Q&A"
  },
  {
    week: "Week 3",
    title: "AI Agents",
    desc: "Create autonomous systems that take action.",
    icon: iconAgent,
    tags: ["Tool Calling", "ReAct", "Orchestration"],
    project: "ResearchAgent"
  },
  {
    week: "Week 4",
    title: "Production Guardrails",
    desc: "Deploy safe, compliant enterprise systems.",
    icon: iconGuard,
    tags: ["Safety", "PII", "Eval"],
    project: "SafeAI Deployment"
  }
];

export function CurriculumTimeline() {
  return (
    <section id="curriculum" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1.5 text-sm">
            Complete Curriculum
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            From Zero to <span className="text-primary">AI Engineer</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A progressive 4-week journey mastering the modern AI stack through hands-on building.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/5 via-primary/30 to-primary/5 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {modules.map((mod, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 w-full text-center md:text-left">
                  <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end"}`}>
                    <span className="text-primary font-bold tracking-wider uppercase mb-2 text-sm">{mod.week}</span>
                    <h3 className="text-2xl font-bold font-heading mb-3">{mod.title}</h3>
                    <p className="text-muted-foreground mb-4 max-w-xs mx-auto md:mx-0">{mod.desc}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                      {mod.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-2 py-1 bg-white border border-border rounded-md text-foreground/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      <span>Build: {mod.project}</span>
                    </div>
                  </div>
                </div>

                {/* Icon/Marker Side */}
                <div className="relative z-10 shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-white shadow-xl shadow-primary/10 border border-primary/10 flex items-center justify-center p-4 transform transition-transform hover:scale-110 duration-300">
                    <img src={mod.icon} alt={mod.title} className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Empty Side for balance */}
                <div className="flex-1 w-full hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
