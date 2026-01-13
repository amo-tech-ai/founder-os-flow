import { motion } from "framer-motion";
import { Send, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const AICoach = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <MotionWrapper>
              <span className="inline-block px-3 py-1 rounded-full bg-sage-light text-sm font-mono text-secondary-foreground mb-4">
                Step 04
              </span>
              <h2 className="heading-section text-foreground mb-4">
                Make better decisions,{" "}
                <span className="text-gradient-gold">faster</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="body-large">
                Ask any question about your startup. Get answers grounded in 
                your strategy, your numbers, and your context — not generic advice.
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.2}>
              <div className="p-5 rounded-xl bg-gold-light/30 border border-gold/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🎯</span>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Not generic advice.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Every recommendation is based on your actual numbers, runway, and goals.
                    </p>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column - Conversational UI */}
          <MotionWrapper delay={0.2} className="relative">
            <div className="card-elevated">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">AI Strategy Coach</h3>
                  <p className="text-sm text-muted-foreground">Context-aware guidance</p>
                </div>
              </div>

              {/* User Prompt */}
              <motion.div
                className="flex justify-end mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="max-w-[85%] p-4 rounded-2xl rounded-tr-md bg-foreground text-background">
                  <p className="text-sm">
                    Should we take this enterprise deal or ship the API first?
                  </p>
                </div>
              </motion.div>

              {/* AI Response */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="max-w-[95%] p-4 rounded-2xl rounded-tl-md bg-muted/70">
                  {/* Recommendation */}
                  <div className="flex items-start gap-2 mb-3 pb-3 border-b border-border">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gold uppercase tracking-wide">Recommendation</span>
                      <p className="text-sm font-medium text-foreground mt-1">
                        Ship the API first, then close the enterprise deal.
                      </p>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reasoning</span>
                    <ul className="mt-2 space-y-2">
                      {[
                        "API launch adds 2.1x leverage to enterprise negotiations",
                        "Current runway (13mo) supports 6-week delay",
                        "Enterprise client expressed timeline flexibility",
                      ].map((point, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Tradeoffs */}
                  <div className="mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tradeoffs</span>
                    <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span>Slight revenue delay; mitigated by stronger negotiating position</span>
                    </div>
                  </div>

                  {/* Action Plan */}
                  <motion.div
                    className="p-3 rounded-lg bg-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-xs font-medium text-gold uppercase tracking-wide">Action Plan</span>
                    <div className="mt-2 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        Add "Ship API v1" to this week's priorities
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Input */}
              <motion.div
                className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  placeholder="Ask a strategy question..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                  disabled
                />
                <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                  <Send className="w-4 h-4 text-background" />
                </div>
              </motion.div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default AICoach;
