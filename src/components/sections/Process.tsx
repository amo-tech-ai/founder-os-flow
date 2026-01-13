import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, LayoutDashboard, Sparkles, Rocket } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Strategy Session",
    description: "20-minute guided input that captures your vision, goals, runway, and constraints.",
    detail: "Answer key questions about your startup, and our AI synthesizes everything into a clear strategic foundation.",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Daily Dashboard",
    description: "Top priorities, risks, and next actions — updated every day.",
    detail: "Wake up knowing exactly what moves the needle. No more decision paralysis.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "AI Coach",
    description: "Context-aware answers with clear reasoning behind every recommendation.",
    detail: "Ask anything about your startup. Get answers grounded in your strategy and data.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Fundraising Momentum",
    description: "Track investors, manage follow-ups, and maintain a consistent narrative.",
    detail: "Everything stays connected — your story, your pipeline, your progress.",
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section-padding bg-cream" ref={containerRef}>
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/50 text-sm font-medium text-foreground mb-6">
            How It Works
          </span>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            From first input to daily momentum
          </h2>
        </MotionWrapper>

        {/* Process Flow */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <MotionWrapper
                key={index}
                delay={index * 0.1}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Step Number Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-card shadow-card flex items-center justify-center border-4 border-background"
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <step.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <div className="card-elevated group hover:shadow-elevated transition-all duration-300">
                    <span className="text-sm font-mono text-gold mb-2 block">{step.number}</span>
                    <h3 className="heading-card text-foreground mb-3">{step.title}</h3>
                    <p className="body-base mb-4">{step.description}</p>
                    <p className="text-sm text-muted-foreground/70 italic">{step.detail}</p>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
