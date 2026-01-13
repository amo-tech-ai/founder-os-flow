import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";
import { MessageSquare, FileText, Users } from "lucide-react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Centralized Updates",
    description: "All team communication in one place, linked to projects and goals.",
  },
  {
    icon: FileText,
    title: "Context-Aware Summaries",
    description: "AI-generated briefs that keep everyone aligned without reading everything.",
  },
  {
    icon: Users,
    title: "Shared Priorities",
    description: "Teams and advisors see the same priorities, reducing confusion.",
  },
];

const benefits = [
  "Fewer status meetings",
  "Everyone aligned",
  "One source of truth",
];

const FeatureCommunication = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-gold-light/50 text-xs font-medium text-foreground mb-4">
            Cross-Platform
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Clear Communication, Everywhere
          </h2>
          <p className="body-large max-w-2xl mx-auto">
            Keep your entire team aligned with context-aware updates and shared priorities.
          </p>
        </MotionWrapper>

        {/* Capability cards - horizontal strip */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-12">
          {capabilities.map((capability, index) => (
            <StaggerItem key={index}>
              <div className="card-elevated h-full p-6 group hover:shadow-elevated transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-light/60 to-sage-light/60 flex items-center justify-center mb-4 group-hover:from-gold/40 group-hover:to-sage/40 transition-all duration-300">
                  <capability.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Benefits strip */}
        <MotionWrapper delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-border/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default FeatureCommunication;
