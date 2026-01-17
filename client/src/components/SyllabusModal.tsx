import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Code2, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const syllabusData = [
  {
    week: "Week 1",
    title: "Foundation: LLMs & Prompt Engineering",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Master the core mechanics of Large Language Models and how to control them effectively.",
    topics: [
      "LLM Architecture: Tokens, Context Windows, Temperature",
      "API Mastery: OpenAI, Claude, and Gemini Integration",
      "Prompt Engineering: Chain-of-Thought, Few-Shot, ReAct",
      "Streaming Responses & UX Optimization"
    ],
    labs: [
      "Build 'SupportGenie v0.1' - Basic Chatbot",
      "Implement Streaming & Error Handling",
      "Create a reusable Prompt Library"
    ]
  },
  {
    week: "Week 2",
    title: "RAG Systems & Vector Databases",
    icon: <Code2 className="w-5 h-5" />,
    description: "Ground your AI in reality by building Retrieval-Augmented Generation systems.",
    topics: [
      "Document Processing: PDF/Text Chunking Strategies",
      "Vector Embeddings: From Text to Numbers",
      "Vector Stores: Implementing ChromaDB",
      "Semantic Search Algorithms & Re-ranking"
    ],
    labs: [
      "Lab 3: Multi-format Document Processor",
      "Lab 4: Building a Semantic Search Engine",
      "Lab 5: Complete RAG Pipeline for 'DocuMind'"
    ]
  },
  {
    week: "Week 3",
    title: "Autonomous Agents & Tools",
    icon: <Cpu className="w-5 h-5" />,
    description: "Build AI that can take action, use tools, and make decisions autonomously.",
    topics: [
      "The Agent Loop: Observe → Think → Act",
      "Tool Calling (Function Calling) APIs",
      "Memory Systems: Short-term vs Long-term",
      "Multi-Agent Orchestration Patterns"
    ],
    labs: [
      "Lab 6: Building a Weather & Stock Agent",
      "Lab 7: Implementing Persistent Memory",
      "Lab 8: 'ResearchAgent' with Web Search Capabilities"
    ]
  },
  {
    week: "Week 4",
    title: "Production, Safety & Guardrails",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "Prepare your systems for the real world with enterprise-grade safety and monitoring.",
    topics: [
      "Input/Output Guardrails & PII Protection",
      "Prompt Injection Defense Strategies",
      "Evaluation Metrics (RAGAS, Trulens)",
      "Cost Optimization & Rate Limiting"
    ],
    labs: [
      "Implement NeMo Guardrails",
      "Build 'SafeAI' Compliance Layer",
      "Final Capstone Deployment"
    ]
  }
];

export function SyllabusModal({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">View Detailed Syllabus</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              4-Week Intensive
            </Badge>
            <Badge variant="outline" className="bg-background">
              85+ Hours of Content
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold font-heading">
            Detailed Course Syllabus
          </DialogTitle>
          <DialogDescription>
            A week-by-week breakdown of the production-ready skills you will master.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            {syllabusData.map((module, i) => (
              <div key={i} className="relative pl-8 md:pl-0">
                {/* Timeline line for mobile */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />
                
                <div className="grid md:grid-cols-[200px_1fr] gap-6">
                  {/* Left Column: Week Info */}
                  <div className="md:text-right relative">
                    <div className="sticky top-0">
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                        {module.week}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-primary flex items-center md:justify-end gap-2">
                        {/* Icon only visible on desktop/tablet to align nicely */}
                        <span className="hidden md:inline-flex">{module.icon}</span>
                        {module.title.split(":")[0]}
                      </h3>
                      {/* Mobile icon dot */}
                      <div className="absolute left-[-32px] top-1 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center md:hidden">
                        {module.icon}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                     <h4 className="font-bold text-foreground mb-3 text-lg md:hidden">
                        {module.title.split(":")[1] || module.title}
                     </h4>
                     <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                       {module.description}
                     </p>

                     <div className="grid sm:grid-cols-2 gap-6">
                       <div>
                         <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                           <BookOpen className="w-3 h-3" />
                           Key Concepts
                         </h5>
                         <ul className="space-y-2">
                           {module.topics.map((topic, j) => (
                             <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                               <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                               {topic}
                             </li>
                           ))}
                         </ul>
                       </div>

                       <div>
                         <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                           <Code2 className="w-3 h-3" />
                           Hands-on Labs
                         </h5>
                         <ul className="space-y-2">
                           {module.labs.map((lab, j) => (
                             <li key={j} className="text-sm font-medium text-foreground bg-secondary/50 px-2 py-1.5 rounded border border-border/50 flex items-start gap-2">
                               <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                               {lab}
                             </li>
                           ))}
                         </ul>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t border-border bg-secondary/20 flex justify-between items-center">
          <div className="text-sm text-muted-foreground hidden sm:block">
            Ready to start building?
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
             <Button variant="outline" className="flex-1 sm:flex-none">Download PDF</Button>
             <Button className="flex-1 sm:flex-none">Enroll in Course</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
