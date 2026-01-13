import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const connectedNodes = [
  { label: "Daily Priorities", emoji: "📋", angle: -45, distance: 160 },
  { label: "Investor Pipeline", emoji: "💼", angle: 45, distance: 160 },
  { label: "Decisions", emoji: "💡", angle: 135, distance: 160 },
  { label: "Outputs", emoji: "📄", angle: -135, distance: 160 },
];

const StrategyEngine = () => {
  const diagramRef = useRef(null);
  const isInView = useInView(diagramRef, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <span className="inline-block px-3 py-1 rounded-full bg-sage-light text-sm font-mono text-secondary-foreground mb-4">
            Step 02
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Your strategy becomes a{" "}
            <span className="text-gradient-gold">living system</span>
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Every feature pulls from the same strategy — so nothing drifts or contradicts.
          </p>
        </MotionWrapper>

        {/* Core Diagram */}
        <div ref={diagramRef} className="relative flex justify-center mb-16">
          <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px]">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 480">
              {connectedNodes.map((node, i) => {
                const centerX = 240;
                const centerY = 240;
                const radians = (node.angle * Math.PI) / 180;
                const endX = centerX + Math.cos(radians) * (node.distance + 20);
                const endY = centerY + Math.sin(radians) * (node.distance + 20);
                
                return (
                  <motion.line
                    key={i}
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                  />
                );
              })}
            </svg>

            {/* Center Node - Strategy */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 w-36 h-36 md:w-44 md:h-44 rounded-full bg-gold/20 blur-xl animate-pulse" />
                
                {/* Main Node */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-card shadow-elevated border-2 border-gold/30 flex flex-col items-center justify-center">
                  <span className="text-3xl md:text-4xl mb-2">🎯</span>
                  <span className="text-sm md:text-base font-serif font-medium text-foreground text-center">
                    Startup<br />Strategy
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Connected Nodes */}
            {connectedNodes.map((node, i) => {
              const radians = (node.angle * Math.PI) / 180;
              const x = 50 + (Math.cos(radians) * node.distance / 480) * 100;
              const y = 50 + (Math.sin(radians) * node.distance / 480) * 100;
              
              return (
                <motion.div
                  key={i}
                  className="absolute z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-card shadow-card flex flex-col items-center justify-center hover:shadow-elevated transition-shadow cursor-pointer group">
                    <span className="text-xl md:text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {node.emoji}
                    </span>
                    <span className="text-xs md:text-sm font-medium text-foreground text-center px-2">
                      {node.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <MotionWrapper className="text-center max-w-xl mx-auto">
          <p className="text-lg text-muted-foreground">
            This is the core difference: <span className="text-foreground font-medium">one truth, zero drift</span>. 
            Your priorities, pipeline, and outputs all stay aligned automatically.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default StrategyEngine;
