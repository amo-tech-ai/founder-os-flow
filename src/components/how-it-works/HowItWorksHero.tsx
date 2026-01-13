import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const flowSteps = [
  { label: "Strategy Session", emoji: "💬" },
  { label: "Strategy Engine", emoji: "⚡", highlight: true },
  { label: "Daily Dashboard", emoji: "📊" },
  { label: "Execution", emoji: "🚀" },
  { label: "Fundraising Progress", emoji: "📈" },
];

const HowItWorksHero = () => {
  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, margin: "-50px" });

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-wide">
        {/* Header */}
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/50 text-sm font-medium text-foreground mb-6">
            The Complete System
          </span>
          <h1 className="heading-display text-foreground mb-6">
            How StartupAI works
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            From one strategy session to daily execution and fundraising momentum — 
            all in one guided system.
          </p>
        </MotionWrapper>

        {/* Primary Flow Diagram */}
        <div ref={diagramRef} className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {flowSteps.map((step, index) => (
              <div key={index} className="flex items-center w-full md:w-auto">
                {/* Step Node */}
                <motion.div
                  className={`relative flex-shrink-0 ${
                    step.highlight ? "z-10" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div
                    className={`relative w-28 h-28 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      step.highlight
                        ? "bg-card shadow-elevated border-2 border-gold/30"
                        : "bg-card shadow-card"
                    }`}
                  >
                    {step.highlight && (
                      <div className="absolute inset-0 rounded-2xl bg-gold/5 animate-pulse" />
                    )}
                    <span className="text-2xl md:text-3xl mb-2">{step.emoji}</span>
                    <span className="text-xs md:text-sm font-medium text-foreground text-center px-2 leading-tight">
                      {step.label}
                    </span>
                  </div>
                </motion.div>

                {/* Connector Line */}
                {index < flowSteps.length - 1 && (
                  <div className="hidden md:flex items-center flex-1 px-2">
                    <motion.div
                      className="h-0.5 bg-gradient-to-r from-border to-gold/30 w-full relative"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      style={{ transformOrigin: "left" }}
                    >
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-gold/40"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      />
                    </motion.div>
                  </div>
                )}

                {/* Mobile Connector */}
                {index < flowSteps.length - 1 && (
                  <motion.div
                    className="md:hidden h-8 w-0.5 bg-gradient-to-b from-border to-gold/30 my-2"
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
