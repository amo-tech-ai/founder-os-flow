import { motion } from "framer-motion";
import { Sun, Zap, Target, Calculator, MessageCircle, Layers } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const benefits = [
  {
    icon: Sun,
    title: "Clarity every day",
    description: "Wake up knowing exactly what to work on",
  },
  {
    icon: Zap,
    title: "Faster execution",
    description: "Move from decision to action instantly",
  },
  {
    icon: Target,
    title: "Fundraising control",
    description: "Every investor interaction tracked and optimized",
  },
  {
    icon: Calculator,
    title: "Runway-aware decisions",
    description: "Priorities aligned with your burn rate",
  },
  {
    icon: MessageCircle,
    title: "Consistent narrative",
    description: "Your story stays aligned across all touchpoints",
  },
  {
    icon: Layers,
    title: "Less tool chaos",
    description: "One system replaces scattered workflows",
  },
];

const Benefits = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            What changes when you have a{" "}
            <span className="text-gradient-gold">single source of truth</span>
          </h2>
        </MotionWrapper>

        {/* Benefits Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <div className="card-soft h-full group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-light/40 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                    <benefit.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Before → After Strip */}
        <MotionWrapper className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-card shadow-card">
            <div className="grid md:grid-cols-2">
              {/* Before */}
              <motion.div
                className="p-8 md:p-10 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/20" />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground mb-4">
                    Before
                  </span>
                  <h4 className="font-serif text-xl font-medium text-foreground mb-4">
                    Fragmented tools
                  </h4>
                  <div className="space-y-3">
                    {["Notion for notes", "Sheets for investors", "Slack for updates", "Docs for planning", "Brain for context"].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 0.6, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                className="p-8 md:p-10 relative bg-gradient-to-br from-gold-light/30 to-sage-light/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-xs font-medium text-foreground mb-4">
                  After
                </span>
                <h4 className="font-serif text-xl font-medium text-foreground mb-4">
                  Unified StartupAI
                </h4>
                <div className="space-y-3">
                  {[
                    { text: "One strategy hub", active: true },
                    { text: "Daily priorities", active: true },
                    { text: "Investor pipeline", active: true },
                    { text: "AI-powered insights", active: true },
                    { text: "Everything connected", active: true },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + 0.1 * i }}
                      viewport={{ once: true }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Center Arrow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <motion.div
                className="w-12 h-12 rounded-full bg-card shadow-elevated flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-lg">→</span>
              </motion.div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Benefits;
