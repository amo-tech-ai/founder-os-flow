import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarDays, Users, Lightbulb, FileText } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const features = [
  {
    icon: CalendarDays,
    title: "Daily Priorities",
    description: "Know exactly what to work on each day",
  },
  {
    icon: Users,
    title: "Investor Pipeline",
    description: "Track every conversation and follow-up",
  },
  {
    icon: Lightbulb,
    title: "Decision Coaching",
    description: "AI-powered guidance with clear reasoning",
  },
  {
    icon: FileText,
    title: "Investor-Ready Outputs",
    description: "Decks and plans that align with your story",
  },
];

const Solution = () => {
  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <MotionWrapper>
              <h2 className="heading-section text-foreground">
                StartupAI is your operating system for{" "}
                <span className="text-gradient-gold">building and raising.</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="body-large">
                One strategy session creates a single source of truth that powers 
                every decision, every priority, and every investor interaction.
              </p>
            </MotionWrapper>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.1}>
              {features.map((feature, index) => (
                <StaggerItem key={index}>
                  <div className="card-soft group hover:shadow-card transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gold-light/50 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                        <feature.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column - System Diagram */}
          <MotionWrapper delay={0.2} className="flex justify-center">
            <div ref={diagramRef} className="relative w-full max-w-md aspect-square">
              {/* Center Node */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-32 h-32 rounded-full bg-card shadow-elevated flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl mb-1 block">🎯</span>
                    <span className="text-sm font-medium text-foreground">Startup<br/>Strategy</span>
                  </div>
                </div>
              </motion.div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {[
                  { x1: 200, y1: 200, x2: 200, y2: 60 },
                  { x1: 200, y1: 200, x2: 340, y2: 200 },
                  { x1: 200, y1: 200, x2: 200, y2: 340 },
                  { x1: 200, y1: 200, x2: 60, y2: 200 },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Outer Nodes */}
              {[
                { label: "Daily Priorities", emoji: "📋", position: "top-0 left-1/2 -translate-x-1/2" },
                { label: "Investor Pipeline", emoji: "💼", position: "top-1/2 right-0 -translate-y-1/2" },
                { label: "Decisions", emoji: "💡", position: "bottom-0 left-1/2 -translate-x-1/2" },
                { label: "Outputs", emoji: "📄", position: "top-1/2 left-0 -translate-y-1/2" },
              ].map((node, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${node.position}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-card shadow-card flex flex-col items-center justify-center hover:shadow-elevated transition-shadow">
                    <span className="text-xl mb-1">{node.emoji}</span>
                    <span className="text-xs font-medium text-muted-foreground text-center px-1">{node.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default Solution;
