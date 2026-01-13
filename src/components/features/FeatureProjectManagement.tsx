import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Target, Zap, Clock, CheckCircle2, Sparkles } from "lucide-react";

const FeatureProjectManagement = () => {
  const howItWorks = [
    "Tasks generated from your strategy",
    "Prioritized by impact, runway, and deadlines",
    "Daily focus on what matters most",
  ];

  const benefits = [
    "Less decision fatigue",
    "Faster execution",
    "No wasted work on low-impact tasks",
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Task Board Visual */}
          <MotionWrapper className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-light/30 to-gold-light/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border/50 bg-cream/30 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Today's Priorities</h3>
                  <span className="text-xs text-muted-foreground">Monday, Jan 13</span>
                </div>
                
                {/* Priority list */}
                <div className="p-6 space-y-4">
                  {[
                    { 
                      priority: 1, 
                      task: "Complete investor deck for Sequoia meeting", 
                      impact: "High impact",
                      reason: "Partner meeting in 3 days, deck needs final review"
                    },
                    { 
                      priority: 2, 
                      task: "Ship MVP feature for demo", 
                      impact: "Critical path",
                      reason: "Blocks 4 other tasks and investor demo"
                    },
                    { 
                      priority: 3, 
                      task: "Follow up with warm intro to A16Z", 
                      impact: "Time-sensitive",
                      reason: "Best response window is within 48 hours"
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-cream/50 border border-border/30 hover:border-gold/30 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gold-light/50 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-semibold text-foreground">{item.priority}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm mb-1">{item.task}</p>
                          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-sage-light/50 text-muted-foreground mb-2">
                            {item.impact}
                          </span>
                          <div className="flex items-start gap-2 mt-2 p-2 rounded-lg bg-white/50">
                            <Sparkles className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-muted-foreground">{item.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Right: Explanation */}
          <MotionWrapper delay={0.2} className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-sage-light/50 text-xs font-medium text-foreground mb-4">
              Feature 02
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Project & Task Management with Intelligence
            </h2>
            
            <div className="space-y-4 mb-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-sage-light/50 flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Target className="w-4 h-4 text-foreground" strokeWidth={1.5} />}
                    {index === 1 && <Zap className="w-4 h-4 text-foreground" strokeWidth={1.5} />}
                    {index === 2 && <Clock className="w-4 h-4 text-foreground" strokeWidth={1.5} />}
                  </div>
                  <p className="body-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gold-light/30 border border-gold/20">
              <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default FeatureProjectManagement;
