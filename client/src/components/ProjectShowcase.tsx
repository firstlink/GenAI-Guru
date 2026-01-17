import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Terminal, Code2, Bot } from "lucide-react";

const projects = [
  {
    title: "SupportGenie",
    type: "Customer Support Bot",
    desc: "A professional chatbot with streaming responses, tone modulation, and escalation logic.",
    icon: <Bot className="w-6 h-6 text-primary" />,
    tech: ["OpenAI API", "Streaming", "Context Window"],
    gradient: "from-blue-50 to-indigo-50"
  },
  {
    title: "DocuMind",
    type: "RAG Knowledge Engine",
    desc: "Ingest PDFs and docs to answer questions with citations, eliminating hallucinations.",
    icon: <Code2 className="w-6 h-6 text-emerald-600" />,
    tech: ["ChromaDB", "Embeddings", "LangChain"],
    gradient: "from-emerald-50 to-teal-50"
  },
  {
    title: "ResearchAgent",
    type: "Autonomous Worker",
    desc: "An agent that can browse the web, read pages, and compile a research report automatically.",
    icon: <Terminal className="w-6 h-6 text-amber-600" />,
    tech: ["Tool Calling", "SerpAPI", "Multi-step Reasoning"],
    gradient: "from-amber-50 to-orange-50"
  }
];

export function ProjectShowcase() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-heading mb-4">
            Build a <span className="text-primary">Portfolio</span> That Hires You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Forget "Hello World." You'll graduate with 5 production-grade applications to show employers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className={`h-32 bg-gradient-to-br ${proj.gradient} p-6 flex flex-col justify-between`}>
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  {proj.icon}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading group-hover:text-primary transition-colors">{proj.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{proj.type}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {proj.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => (
                    <Badge key={t} variant="secondary" className="bg-secondary/50 text-foreground font-medium">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
