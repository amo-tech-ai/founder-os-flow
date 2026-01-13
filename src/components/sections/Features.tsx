import { ArrowRight, Brain, Users, TrendingDown, Map, Rocket, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const features = [
  {
    icon: Brain,
    title: "Intelligent Prioritization",
    description: "AI analyzes your goals and constraints to surface what matters most today.",
  },
  {
    icon: Users,
    title: "Investor Pipeline",
    description: "Track every conversation, meeting, and follow-up in one organized view.",
  },
  {
    icon: TrendingDown,
    title: "Runway Intelligence",
    description: "Decisions informed by your burn rate, timeline, and key milestones.",
  },
  {
    icon: Map,
    title: "Roadmap Alignment",
    description: "Keep product priorities connected to your strategic narrative.",
  },
  {
    icon: Rocket,
    title: "Fundraising Readiness",
    description: "Generate decks, one-pagers, and updates aligned with your story.",
  },
  {
    icon: Megaphone,
    title: "GTM Coaching",
    description: "Get tactical guidance on positioning, messaging, and market approach.",
  },
];

const Features = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage-light text-sm font-medium text-secondary-foreground mb-6">
            Everything You Need
          </span>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            A complete operating system for founders
          </h2>
        </MotionWrapper>

        {/* Features Grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="card-elevated h-full group hover:shadow-elevated transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-light/60 to-sage-light/60 flex items-center justify-center group-hover:from-gold/40 group-hover:to-sage/40 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                  </div>
                  <h3 className="heading-card text-foreground">{feature.title}</h3>
                  <p className="body-base">{feature.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <MotionWrapper className="text-center">
          <Button size="lg" className="gap-2 text-base px-10 py-7 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-card">
            Start the Strategy Session
            <ArrowRight className="w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Setup in ~20 minutes. Free for early founders.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Features;
