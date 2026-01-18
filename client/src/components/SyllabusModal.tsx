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
import jsPDF from "jspdf";

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
    title: "AI Agents: Autonomous Systems",
    icon: <Cpu className="w-5 h-5" />,
    description: "Create sophisticated AI agents that can use tools, make decisions, and complete complex multi-step tasks autonomously.",
    topics: [
      "Agent Fundamentals: Agents vs Chatbots, The Agent Loop (Observe → Think → Act)",
      "Function Calling with OpenAI & Claude, Building Multi-Tool Agents",
      "Agent Memory Systems: Short-term, Working & Long-term Memory",
      "ReAct Pattern (Reasoning + Acting), Task Decomposition & Planning",
      "Agentic RAG: Combining Agents with Retrieval",
      "Agent Frameworks: LangChain, CrewAI, AutoGPT",
      "Multi-Agent Coordination & Enterprise Deployment Patterns"
    ],
    labs: [
      "Lab 6: Agent Fundamentals & Tool Calling - Build agents with 6+ design patterns",
      "Lab 7: Memory & Planning - Implement conversation history & ReAct workflows",
      "Lab 8: Advanced Agent Systems - Production research agent with error handling"
    ]
  },
  {
    week: "Week 4",
    title: "Guardrails: Production Safety & Compliance",
    icon: <ShieldCheck className="w-5 h-5" />,
    description: "Implement safety, governance, and compliance measures to make your AI systems production-ready and enterprise-grade.",
    topics: [
      "Input & Output Filtering: Content validation and sanitization",
      "Prompt Injection Prevention: Defense against malicious inputs",
      "PII Protection: Personally Identifiable Information detection & handling",
      "Bias Detection & Mitigation: Ensuring fair AI outputs",
      "Rate Limiting & Access Control: Protecting system resources",
      "Regulatory Compliance: GDPR, SOC2, and industry standards",
      "Production Deployment: Monitoring, logging & incident response"
    ],
    labs: [
      "Implement comprehensive input/output guardrails framework",
      "Build 'SafeAI' - Production compliance layer with PII protection",
      "Final Capstone: Deploy enterprise-ready multi-agent system"
    ]
  }
];

const handleDownloadPDF = () => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Design constants
  const colors = {
    primary: [37, 99, 235] as [number, number, number], // Blue-600
    text: [15, 23, 42] as [number, number, number], // Slate-900
    muted: [100, 116, 139] as [number, number, number], // Slate-500
    border: [226, 232, 240] as [number, number, number], // Slate-200
    cardBg: [255, 255, 255] as [number, number, number],
    labBg: [240, 253, 244] as [number, number, number], // Green-50
    labBorder: [187, 247, 208] as [number, number, number], // Green-200
    labText: [22, 101, 52] as [number, number, number], // Green-800
  };

  // Helper to check page break
  let yPosition = 20;
  const checkPageBreak = (heightNeeded: number) => {
    if (yPosition + heightNeeded > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Helper to sanitize text for PDF (replaces unsupported chars)
  const sanitizeText = (text: string) => {
    return text
      .replace(/→/g, "->")
      .replace(/•/g, "-")
      .replace(/[–—]/g, "-")
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[^\x20-\x7E]/g, ""); // Strip any other non-ASCII chars
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...colors.primary);
  doc.text("Advanced GenAI Training", margin, yPosition);
  yPosition += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...colors.text);
  doc.text("Production-Ready AI Systems - Detailed Course Syllabus", margin, yPosition);
  yPosition += 15;

  doc.setDrawColor(...colors.border);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Iterate through each week
  syllabusData.forEach((module) => {
    // Estimate card height roughly (can be dynamic, but explicit spacing helps)
    // We'll rely on checkPageBreak inside the loop for content

    checkPageBreak(60); // Minimum space to start a card

    // Card Container (Visual only, we draw content on top)
    // Week Column (Left)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.muted);
    doc.text(module.week.toUpperCase(), margin, yPosition + 4);

    // Content Column (Right) - offset by 25mm
    const leftOffset = margin + 25;
    const rightContentWidth = pageWidth - leftOffset - margin;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(...colors.primary);

    // Sanitize title just in case
    const cleanTitle = sanitizeText(module.title.split(":")[1]?.trim() || module.title);
    const titleLines = doc.splitTextToSize(cleanTitle, rightContentWidth);
    doc.text(titleLines, leftOffset, yPosition + 5);
    yPosition += (titleLines.length * 7) + 2;

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...colors.muted);
    const descLines = doc.splitTextToSize(sanitizeText(module.description), rightContentWidth);
    doc.text(descLines, leftOffset, yPosition);
    yPosition += (descLines.length * 5) + 8;

    // Key Concepts
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.text("KEY CONCEPTS", leftOffset, yPosition);
    yPosition += 6;

    // Concepts List
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.muted);
    module.topics.forEach((topic) => {
      checkPageBreak(10);
      // Sanitize topic text to fix font/width issues with special chars
      const safeTopic = sanitizeText(topic);
      const topicLines = doc.splitTextToSize(safeTopic, rightContentWidth - 5);

      // Draw bullet
      doc.setFillColor(...colors.primary);
      doc.circle(leftOffset + 1, yPosition - 1, 1, 'F');

      doc.text(topicLines, leftOffset + 5, yPosition);
      yPosition += topicLines.length * 5;
    });
    yPosition += 5;

    // Hands-on Labs
    checkPageBreak(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.text("HANDS-ON LABS", leftOffset, yPosition);
    yPosition += 6;

    // Labs List (Pills)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    module.labs.forEach((lab) => {
      checkPageBreak(12);

      const safeLab = sanitizeText(lab);
      const labLines = doc.splitTextToSize(safeLab, rightContentWidth - 15); // More padding for pills
      const pillHeight = (labLines.length * 4.5) + 6; // slightly taller for breathing room

      // Draw Pill Background
      doc.setFillColor(...colors.labBg);
      doc.setDrawColor(...colors.labBorder);
      doc.roundedRect(leftOffset, yPosition - 4, rightContentWidth, pillHeight, 2, 2, 'FD');

      // Draw Checkmark
      doc.setFillColor(...colors.labText);
      doc.circle(leftOffset + 5, yPosition, 1.5, 'F');

      // Lab Text
      doc.setTextColor(...colors.labText);
      doc.text(labLines, leftOffset + 10, yPosition + 1);

      yPosition += pillHeight + 2;
    });

    // Spacer between weeks
    yPosition += 10;

    // Separator line
    doc.setDrawColor(...colors.border);
    doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
    yPosition += 5;
  });

  // Save the PDF
  doc.save("Advanced-GenAI-Training-Syllabus.pdf");
};

export function SyllabusModal({ trigger }: { trigger?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">View Detailed Syllabus</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              4-Week Intensive
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold font-heading">
            Detailed Course Syllabus
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            A week-by-week breakdown of the production-ready skills you will master.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 w-full min-h-0">
          <div className="space-y-8 p-4 sm:p-6">
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

        <div className="p-4 sm:p-6 border-t border-border bg-secondary/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-sm text-muted-foreground hidden sm:block">
            Ready to start building?
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleDownloadPDF}>Download PDF</Button>
            <Button className="flex-1 sm:flex-none">Enroll in Course</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
