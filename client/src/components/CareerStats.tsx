import { motion } from "framer-motion";

const stats = [
  { value: "$180k", label: "Avg AI Engineer Salary" },
  { value: "76%", label: "Companies Hiring AI Talent" },
  { value: "3.5M", label: "Unfilled AI Jobs Globally" },
  { value: "40%", label: "Salary Premium for AI Skills" }
];

export function CareerStats() {
  return (
    <section id="career" className="py-20 bg-primary text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-4xl md:text-6xl font-bold font-heading mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
