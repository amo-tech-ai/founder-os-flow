import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Users, Target, Clock, CheckCircle2, ArrowRight, Briefcase } from "lucide-react";

const FeatureHiring = () => {
  const howItWorks = [
    { icon: Target, text: "Define hiring priorities based on bottlenecks" },
    { icon: Users, text: "Track roles, candidates, and decisions" },
    { icon: Clock, text: "Align hiring with runway and roadmap" },
  ];

  const benefits = [
    "Smarter hiring timing",
    "Less team misalignment",
    "Faster scaling with fewer mistakes",
  ];

  const roles = [
    { title: "Senior Engineer", status: "Interviewing", candidates: 4, priority: "High" },
    { title: "Product Designer", status: "Sourcing", candidates: 2, priority: "Medium" },
    { title: "Sales Lead", status: "Planned", candidates: 0, priority: "Q2" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hiring Visual */}
          <MotionWrapper className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-light/30 to-gold-light/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border/50 bg-cream/30 flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Hiring Pipeline</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-sage-light/50 text-muted-foreground">3 open roles</span>
                </div>
                
                {/* Roles grid */}
                <div className="p-6 space-y-4">
                  {roles.map((role, index) => (
                    <div key={index} className="p-4 rounded-xl bg-cream/50 border border-border/30 hover:border-gold/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gold-light/50 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{role.title}</p>
                            <p className="text-xs text-muted-foreground">{role.candidates} candidates</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          role.priority === "High" 
                            ? "bg-gold-light/50 text-foreground" 
                            : role.priority === "Medium"
                            ? "bg-sage-light/50 text-foreground"
                            : "bg-cream text-muted-foreground"
                        }`}>
                          {role.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          role.status === "Interviewing" ? "bg-gold" : 
                          role.status === "Sourcing" ? "bg-sage" : "bg-border"
                        }`} />
                        <span className="text-xs text-muted-foreground">{role.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Workflow */}
                <div className="px-6 py-4 border-t border-border/50 bg-cream/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded bg-white border border-border/50">Define</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="px-2 py-1 rounded bg-white border border-border/50">Source</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="px-2 py-1 rounded bg-white border border-border/50">Interview</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="px-2 py-1 rounded bg-gold-light/50 border border-gold/30 font-medium">Hire</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Right: Explanation */}
          <MotionWrapper delay={0.2} className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-sage-light/50 text-xs font-medium text-foreground mb-4">
              Feature 06
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Hiring & Team Coordination
            </h2>
            
            <div className="space-y-4 mb-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-sage-light/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="body-base pt-2">{item.text}</p>
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

export default FeatureHiring;
