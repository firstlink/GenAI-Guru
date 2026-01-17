import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadFormData {
  email: string;
  fullName: string;
  phone?: string;
  currentRole?: string;
  source?: string;
}

export function LeadSignupModal({ trigger, source = "hero_cta" }: { trigger?: React.ReactNode; source?: string }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    email: "",
    fullName: "",
    phone: "",
    currentRole: "",
    source,
  });
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const submitLead = useMutation({
    mutationFn: async (data: LeadFormData) => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit");
      }
      
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon!",
      });
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setFormData({ email: "", fullName: "", phone: "", currentRole: "", source });
      }, 3000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Join Waitlist</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">You're on the list!</h3>
            <p className="text-muted-foreground">
              We'll send you course details and exclusive early-bird pricing soon.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading">Join GenAIGuru</DialogTitle>
              <DialogDescription>
                Get early access, exclusive pricing, and course updates delivered to your inbox.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  data-testid="input-fullname"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  data-testid="input-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  data-testid="input-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentRole">Current Role (Optional)</Label>
                <Input
                  id="currentRole"
                  data-testid="input-role"
                  placeholder="e.g., Software Engineer, Student"
                  value={formData.currentRole}
                  onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg"
                disabled={submitLead.isPending}
                data-testid="button-submit"
              >
                {submitLead.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get Early Access"
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
