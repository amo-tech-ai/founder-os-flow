import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Layers, Target, Users, FileText, Calendar, Briefcase } from "lucide-react";

const FeaturesHero = () => {
  return (
    <section className="section-padding pt-32 md:pt-40 bg-cream">
      <div className="container-wide">
        <MotionWrapper className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/50 text-sm font-medium text-foreground mb-6">
            Platform Features
          </span>
          <h1 className="heading-hero text-foreground mb-6">
            Everything you need to run and raise your startup — in one system
          </h1>
          <p className="body-large max-w-2xl mx-auto">
            StartupAI connects strategy, execution, fundraising, and communication so nothing slips through the cracks.
          </p>
        </MotionWrapper>

        {/* System illustration */}
        <MotionWrapper delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-gold-light/20 to-transparent rounded-3xl blur-3xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-soft">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { icon: Users, label: "Investor CRM" },
                  { icon: Target, label: "Task Management" },
                  { icon: Layers, label: "Investor Search" },
                  { icon: FileText, label: "Pitch Decks" },
                  { icon: Calendar, label: "Events & Meetings" },
                  { icon: Briefcase, label: "Hiring" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-cream/50 hover:bg-cream transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-light/60 to-sage-light/60 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
                  </div>
                ))}
              </div>
              
              {/* Central connection visual */}
              <div className="mt-8 pt-8 border-t border-border/50 text-center">
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  All connected to your startup strategy
                </span>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default FeaturesHero;
