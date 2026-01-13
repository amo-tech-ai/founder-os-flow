import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturesCTA = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <MotionWrapper>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream via-gold-light/20 to-sage-light/20 p-12 md:p-16 lg:p-20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-light/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-sage-light/30 rounded-full blur-3xl" />
            
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="heading-section text-foreground mb-4">
                Ready to see how it works?
              </h2>
              <p className="body-large mb-8">
                Turn strategy into execution — without spreadsheets or tool chaos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="btn-primary group">
                  Start the Strategy Session
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-muted-foreground">
                Free for early founders. Setup in ~20 minutes.
              </p>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default FeaturesCTA;
