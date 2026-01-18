import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Terminal, Code2, Bot, Workflow, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

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
  },
  {
    title: "WorkflowHub",
    type: "Multi-Agent Orchestration",
    desc: "Enterprise-grade platform for coordinating multiple AI agents with task distribution and consensus mechanisms.",
    icon: <Workflow className="w-6 h-6 text-purple-600" />,
    tech: ["LangChain", "Multi-Agent", "Task Distribution"],
    gradient: "from-purple-50 to-violet-50"
  },
  {
    title: "SafeAI",
    type: "Production AI with Guardrails",
    desc: "Secure AI deployment with content filtering, PII detection, bias monitoring, and compliance controls.",
    icon: <Shield className="w-6 h-6 text-rose-600" />,
    tech: ["Content Filtering", "PII Detection", "Rate Limiting"],
    gradient: "from-rose-50 to-pink-50"
  }
];

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(projects.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Touch/Swipe support
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const getVisibleProjects = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    return projects.slice(start, end);
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
            Build a <span className="text-primary">Portfolio</span> That Hires You
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Forget "Hello World." You'll graduate with 5 production-grade applications to show employers.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`
              }}
              initial={false}
            >
              <AnimatePresence mode="wait">
                {getVisibleProjects().map((proj, i) => (
                  <motion.div
                    key={`${currentIndex}-${i}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
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
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-white border-2 border-primary shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-white border-2 border-primary shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                aria-label="Next projects"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex
                  ? 'w-12 h-3 bg-primary'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
