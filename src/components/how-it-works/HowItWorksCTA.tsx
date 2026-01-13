import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

const HowItWorksCTA = () => {
  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow">
        <MotionWrapper className="text-center">
          <div className="card-elevated py-16 md:py-20 px-8 md:px-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-light/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-sage-light/40 blur-3xl" />
            </div>

            <div className="relative z-10 space-y-8">
              <span className="inline-block text-4xl md:text-5xl">🚀</span>
              
              <h2 className="heading-section text-foreground">
                Ready to see it work?
              </h2>

              <p className="body-large max-w-lg mx-auto">
                Start with a 20-minute strategy session. Your AI operating system 
                will be ready before your next coffee.
              </p>

              <div className="flex flex-col items-center gap-4">
                <Button 
                  size="lg" 
                  className="gap-2 text-lg px-10 py-7 rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] shadow-card"
                >
                  Start the Strategy Session
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Free for early founders. Setup in ~20 minutes.
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default HowItWorksCTA;
