import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold font-heading">G</span>
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-foreground">
              GenAIGuru
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#curriculum" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Curriculum
          </a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#career" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Career
          </a>
          <Button className="font-semibold px-6 shadow-lg shadow-primary/20">
            Start Learning
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-border p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5">
          <a href="#curriculum" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Curriculum
          </a>
          <a href="#projects" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Projects
          </a>
          <a href="#career" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Career
          </a>
          <Button className="w-full justify-center">Start Learning</Button>
        </div>
      )}
    </nav>
  );
}
