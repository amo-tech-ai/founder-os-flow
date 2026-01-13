import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";
import { CheckCircle, Compass, TrendingUp, Wallet, Layers, Zap } from "lucide-react";

const benefits = [
  {
    icon: Compass,
    title: "Clear priorities every day",
    description: "Know exactly what to focus on based on your goals and runway.",
  },
  {
    icon: TrendingUp,
    title: "Fundraising stays organized",
    description: "Never miss a follow-up or lose track of investor conversations.",
  },
  {
    icon: CheckCircle,
    title: "Decisions backed by context",
    description: "Every choice informed by your strategy, not guesswork.",
  },
  {
    icon: Layers,
    title: "Fewer tools to manage",
    description: "One system replaces scattered spreadsheets and apps.",
  },
  {
    icon: Zap,
    title: "Faster execution",
    description: "Spend less time planning and more time building.",
  },
  {
    icon: Wallet,
    title: "More confidence as a founder",
    description: "Know you're working on what matters most.",
  },
];

const FeaturesBenefits = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/50 text-sm font-medium text-foreground mb-6">
            Why Founders Choose StartupAI
          </span>
          <h2 className="heading-section text-foreground max-w-3xl mx-auto">
            Everything you need to build with confidence
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-border/30 h-full hover:shadow-elevated transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-light/60 to-sage-light/60 flex items-center justify-center mb-4 group-hover:from-gold/40 group-hover:to-sage/40 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FeaturesBenefits;
