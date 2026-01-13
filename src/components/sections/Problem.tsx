import { Brain, Shuffle, Clock } from "lucide-react";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/ui/motion-wrapper";

const problems = [
  {
    icon: Brain,
    title: "Decision fatigue",
    description: "Hours lost deciding what matters most.",
  },
  {
    icon: Shuffle,
    title: "Fundraising drift",
    description: "Decks, notes, and follow-ups scattered across tools.",
  },
  {
    icon: Clock,
    title: "Runway pressure",
    description: "Priorities disconnected from burn and timeline.",
  },
];

const Problem = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <MotionWrapper className="text-center mb-16 md:mb-20">
          <h2 className="heading-section text-foreground max-w-4xl mx-auto">
            Founders don't fail from lack of effort.{" "}
            <span className="text-muted-foreground">They fail from scattered execution.</span>
          </h2>
        </MotionWrapper>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <StaggerItem key={index}>
              <div className="card-elevated h-full relative group hover:shadow-elevated transition-shadow duration-300">
                {/* Abstract background illustration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
                    <circle cx="80" cy="20" r="40" fill="currentColor" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-gold-light/50 transition-colors duration-300">
                    <problem.icon className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                  </div>

                  <h3 className="heading-card text-foreground">{problem.title}</h3>

                  <p className="body-base">{problem.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Problem;
