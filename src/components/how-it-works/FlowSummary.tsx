import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const flowSteps = [
  { text: "Answer once", subtext: "20-min strategy session" },
  { text: "System runs daily", subtext: "Automatic prioritization" },
  { text: "Execute with confidence", subtext: "Clear actions, always" },
];

const FlowSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-12 md:mb-16">
          <h2 className="heading-section text-foreground">
            The complete flow
          </h2>
        </MotionWrapper>

        {/* Flow Diagram */}
        <div ref={ref} className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            {flowSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                {/* Step */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                >
                  <div className="w-48 md:w-56 p-6 rounded-2xl bg-card shadow-card text-center hover:shadow-elevated transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-serif font-semibold text-foreground">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                      {step.text}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.subtext}</p>
                  </div>
                </motion.div>

                {/* Arrow */}
                {index < flowSteps.length - 1 && (
                  <>
                    <motion.div
                      className="hidden md:flex items-center flex-1 px-4"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    >
                      <div className="w-full h-0.5 bg-gradient-to-r from-gold/40 to-gold/20 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-gold/40" />
                      </div>
                    </motion.div>
                    <motion.div
                      className="md:hidden flex items-center justify-center h-8"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    >
                      <div className="w-0.5 h-full bg-gradient-to-b from-gold/40 to-gold/20 relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rotate-[135deg] border-t-2 border-r-2 border-gold/40" />
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Supporting Line */}
        <MotionWrapper className="text-center">
          <p className="text-xl md:text-2xl font-serif text-foreground max-w-3xl mx-auto leading-relaxed">
            StartupAI removes the overhead of running a startup —{" "}
            <span className="text-gradient-gold">so you can focus on building it.</span>
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default FlowSummary;
