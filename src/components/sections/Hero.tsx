import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold-light/30 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-sage-light/40 blur-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                AI-Powered Founder OS
              </span>
            </motion.div>

            <motion.h1
              className="heading-display text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              From strategy to daily execution,{" "}
              <span className="text-gradient-gold">in one guided flow.</span>
            </motion.h1>

            <motion.p
              className="body-large max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              StartupAI turns one short strategy session into an AI operating system 
              that tells you what to do today, keeps fundraising organized, and 
              explains why every action matters.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="gap-2 text-base px-8 py-6 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-soft">
                Start the Strategy Session
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="gap-2 text-base text-muted-foreground hover:text-foreground"
              >
                <Play className="w-5 h-5" />
                See a 2-minute demo
              </Button>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Free for early founders. No credit card.
            </motion.p>
          </div>

          {/* Right Column - Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="card-elevated space-y-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                    <span className="text-lg font-serif font-semibold text-foreground">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">StartupAI Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Monday, January 13</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-sage-light text-secondary-foreground">
                  Active
                </span>
              </div>

              {/* Top Priorities */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Today's Priorities</h4>
                <div className="space-y-3">
                  {[
                    { text: "Follow up with Sequoia partner", icon: Users },
                    { text: "Finalize Q1 product roadmap", icon: TrendingUp },
                    { text: "Review burn rate projections", icon: CheckCircle2 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center shadow-soft">
                        <item.icon className="w-4 h-4 text-gold" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Insight Panel */}
              <motion.div
                className="p-4 rounded-xl bg-gold-light/30 border border-gold/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">✨</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">AI Insight</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your runway of 14 months, prioritizing the Sequoia follow-up 
                      aligns with your fundraising timeline for Series A.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 p-3 rounded-xl bg-card shadow-card"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <span className="text-2xl">🎯</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-card shadow-card"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <span className="text-sm font-medium text-muted-foreground">14mo runway</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
