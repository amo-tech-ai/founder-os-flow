import { Brain, Users, TrendingDown, Map, Rocket, Megaphone } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const features = [
  {
    icon: Brain,
    title: "Intelligent Prioritization",
    description: "AI surfaces what matters most based on your goals and constraints.",
    outcome: "Less decision fatigue",
  },
  {
    icon: Users,
    title: "Investor Pipeline",
    description: "Track every conversation, meeting, and follow-up in one view.",
    outcome: "No dropped leads",
  },
  {
    icon: TrendingDown,
    title: "Runway Intelligence",
    description: "Every decision informed by your burn rate and timeline.",
    outcome: "Smarter resource allocation",
  },
  {
    icon: Map,
    title: "Roadmap Alignment",
    description: "Product priorities connected to your strategic narrative.",
    outcome: "Coherent execution",
  },
  {
    icon: Rocket,
    title: "Fundraising Readiness",
    description: "Generate decks and updates aligned with your story.",
    outcome: "Always investor-ready",
  },
  {
    icon: Megaphone,
    title: "GTM Coaching",
    description: "Tactical guidance on positioning, messaging, and growth.",
    outcome: "Faster market traction",
  },
];

const FeaturesOverview = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/50 text-sm font-medium text-foreground mb-6">
            System Capabilities
          </span>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            Everything you need to build and raise
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="card-elevated h-full group hover:shadow-elevated transition-all duration-300 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-light/60 to-sage-light/60 flex items-center justify-center group-hover:from-gold/40 group-hover:to-sage/40 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="heading-card text-foreground">{feature.title}</h3>
                  <p className="body-base">{feature.description}</p>
                </div>
                
                {/* Outcome Tag */}
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {feature.outcome}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturesOverview;
