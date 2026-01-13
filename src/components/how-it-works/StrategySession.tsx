import { motion } from "framer-motion";
import { Package, DollarSign, TrendingUp, Users, Target, Calendar } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const inputCards = [
  { icon: Package, label: "Product & customer", description: "What you're building and for whom" },
  { icon: DollarSign, label: "Business model & GTM", description: "How you make money and grow" },
  { icon: TrendingUp, label: "Runway & burn rate", description: "Your financial runway and spend" },
  { icon: Calendar, label: "Fundraising timeline", description: "Stage and target raise date" },
  { icon: Users, label: "Team size & capacity", description: "Who's building and bandwidth" },
  { icon: Target, label: "6-month goals", description: "Key milestones you're chasing" },
];

const StrategySession = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <MotionWrapper>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-sm font-mono text-foreground mb-4">
                Step 01
              </span>
              <h2 className="heading-section text-foreground mb-4">
                Capture your strategy
                <span className="text-muted-foreground"> (20 minutes)</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="body-large">
                StartupAI starts by understanding your startup — not guessing. 
                Answer key questions once, and the system does the rest.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="p-5 rounded-xl bg-gold-light/30 border border-gold/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      This is the only setup step.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Everything else is automatic. No spreadsheets, no manual updates.
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column - Wizard UI */}
          <MotionWrapper delay={0.2} className="relative">
            <div className="card-elevated">
              {/* Wizard Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                    <span className="text-sm">📋</span>
                  </div>
                  <span className="font-medium text-foreground">Strategy Session</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((step, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-1 rounded-full ${i === 0 ? "bg-gold" : "bg-muted"}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
              </div>

              {/* Input Cards Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-3" staggerDelay={0.08}>
                {inputCards.map((card, index) => (
                  <StaggerItem key={index}>
                    <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-card shadow-soft flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                        <card.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-sm font-medium text-foreground mb-1">{card.label}</h4>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Continue Button */}
              <motion.div
                className="mt-6 pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">~20 minutes to complete</span>
                  <div className="px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium">
                    Continue →
                  </div>
                </div>
              </motion.div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default StrategySession;
