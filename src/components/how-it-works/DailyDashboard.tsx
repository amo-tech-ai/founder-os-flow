import { motion } from "framer-motion";
import { Target, Users, AlertTriangle, Sparkles, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const explanationCards = [
  {
    icon: Target,
    title: "Priorities ranked by impact",
    description: "Based on runway, goals, and deadlines.",
  },
  {
    icon: Users,
    title: "Fundraising actions surfaced",
    description: "Never miss a follow-up or warm intro.",
  },
  {
    icon: AlertTriangle,
    title: "Risks flagged early",
    description: "Before they cost weeks of runway.",
  },
];

const DailyDashboard = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Dashboard Mockup */}
          <MotionWrapper className="order-2 lg:order-1">
            <div className="card-elevated">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <span className="text-lg font-serif font-semibold text-foreground">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Daily Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Tuesday, January 14</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-sage-light text-secondary-foreground">
                  3 priorities today
                </span>
              </div>

              {/* Top Priorities */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Today's Priorities
                </h4>
                <div className="space-y-3">
                  {[
                    { text: "Close warm intro to Andreessen", tag: "High Impact", urgent: true },
                    { text: "Ship landing page v2", tag: "Product" },
                    { text: "Review MRR projections", tag: "Finance" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.urgent ? "bg-gold/20" : "bg-card shadow-soft"
                      }`}>
                        <CheckCircle2 className={`w-4 h-4 ${item.urgent ? "text-gold" : "text-muted-foreground"}`} />
                      </div>
                      <span className="flex-1 text-sm font-medium text-foreground">{item.text}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        item.urgent ? "bg-gold/20 text-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {item.tag}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Investor Follow-ups */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Investor Follow-ups
                </h4>
                <div className="flex gap-2">
                  {[
                    { name: "Sequoia", days: "2d overdue" },
                    { name: "a16z", days: "Due today" },
                  ].map((inv, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 p-3 rounded-lg bg-card shadow-soft"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-gold" />
                        <span className="text-xs text-gold">{inv.days}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{inv.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Panel */}
              <motion.div
                className="p-4 rounded-xl bg-gold-light/30 border border-gold/20"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">Why this matters</h4>
                    <p className="text-sm text-muted-foreground">
                      The a16z partner is your warmest lead. With 13 months runway, 
                      closing this intro before your metrics call increases conversion 2.4x.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </MotionWrapper>

          {/* Right Column - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <MotionWrapper>
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-sm font-mono text-foreground mb-4">
                Step 03
              </span>
              <h2 className="heading-section text-foreground mb-4">
                Get clear priorities{" "}
                <span className="text-muted-foreground">every day</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="body-large">
                Wake up knowing exactly what moves the needle. 
                No more decision paralysis or scattered to-do lists.
              </p>
            </MotionWrapper>

            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {explanationCards.map((card, index) => (
                <StaggerItem key={index}>
                  <div className="card-soft group hover:shadow-card transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-light/40 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                        <card.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-medium text-foreground mb-1">
                          {card.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyDashboard;
