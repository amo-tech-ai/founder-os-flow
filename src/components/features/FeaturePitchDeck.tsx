import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { FileText, RefreshCw, Layers, CheckCircle2 } from "lucide-react";

const FeaturePitchDeck = () => {
  const howItWorks = [
    { icon: FileText, text: "Strategy automatically generates your deck outline" },
    { icon: RefreshCw, text: "Keeps narrative consistent across updates" },
    { icon: Layers, text: "Adapts to stage (pre-seed, seed, Series A)" },
  ];

  const benefits = [
    "Clear, focused storytelling",
    "Less time updating slides",
    "Investor-ready at all times",
  ];

  const slides = [
    { title: "Problem", subtitle: "Market pain point" },
    { title: "Solution", subtitle: "Your product" },
    { title: "Traction", subtitle: "Key metrics" },
    { title: "Market", subtitle: "TAM/SAM/SOM" },
    { title: "Team", subtitle: "Why you" },
    { title: "Ask", subtitle: "Funding round" },
  ];

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Deck Preview */}
          <MotionWrapper className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-light/30 to-gold-light/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated border border-border/50 overflow-hidden p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-foreground">Investor Deck</h3>
                    <p className="text-xs text-muted-foreground">Seed Stage • Last updated 2h ago</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-sage-light/50 text-foreground">Auto-synced</span>
                </div>
                
                {/* Slide thumbnails */}
                <div className="grid grid-cols-3 gap-3">
                  {slides.map((slide, index) => (
                    <div 
                      key={index} 
                      className="aspect-[4/3] rounded-lg bg-cream/50 border border-border/30 p-3 hover:border-gold/30 transition-colors cursor-pointer"
                    >
                      <div className="h-full flex flex-col justify-between">
                        <div className="w-6 h-1 bg-gold-light/50 rounded" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{slide.title}</p>
                          <p className="text-[10px] text-muted-foreground">{slide.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status */}
                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                    <span className="text-xs text-muted-foreground">Narrative aligned with strategy</span>
                  </div>
                  <button className="text-xs text-gold hover:text-gold/80 font-medium">Export PDF</button>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Right: Explanation */}
          <MotionWrapper delay={0.2} className="order-1 lg:order-2">
            <span className="inline-block px-3 py-1 rounded-full bg-sage-light/50 text-xs font-medium text-foreground mb-4">
              Feature 04
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Pitch Decks Built from Your Strategy
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

export default FeaturePitchDeck;
