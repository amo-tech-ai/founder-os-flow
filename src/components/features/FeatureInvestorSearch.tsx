import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Search, Filter, Network, CheckCircle2, ArrowRight } from "lucide-react";

const FeatureInvestorSearch = () => {
  const howItWorks = [
    { icon: Search, text: "Identify investors aligned to your stage and sector" },
    { icon: Filter, text: "See check size, focus, and recent deals" },
    { icon: Network, text: "Track warm intro paths from your network" },
  ];

  const benefits = [
    "Better-fit investors",
    "Higher response rates",
    "Faster fundraising cycles",
  ];

  const mockInvestors = [
    { name: "First Round Capital", focus: "Pre-seed, Seed", check: "$500K-$3M", match: "95%" },
    { name: "Founder Collective", focus: "Seed", check: "$250K-$2M", match: "92%" },
    { name: "Initialized Capital", focus: "Pre-seed, Seed", check: "$500K-$2M", match: "88%" },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Explanation */}
          <MotionWrapper>
            <span className="inline-block px-3 py-1 rounded-full bg-gold-light/50 text-xs font-medium text-foreground mb-4">
              Feature 03
            </span>
            <h2 className="heading-section text-foreground mb-6">
              Investor Search & Targeting
            </h2>
            
            <div className="space-y-4 mb-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-cream/50 border border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-gold-light/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="body-base pt-2">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-sage-light/30 border border-sage/20">
              <h4 className="font-semibold text-foreground mb-3">Benefits</h4>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>

          {/* Right: Investor Search Visual */}
          <MotionWrapper delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-light/30 to-sage-light/30 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-border/50 bg-cream/30">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Seed stage • B2B SaaS • $1-2M raise</span>
                  </div>
                </div>
                
                {/* Table */}
                <div className="p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-muted-foreground border-b border-border/30">
                        <th className="text-left py-2 px-2">Investor</th>
                        <th className="text-left py-2 px-2">Focus</th>
                        <th className="text-left py-2 px-2">Check Size</th>
                        <th className="text-right py-2 px-2">Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInvestors.map((investor, index) => (
                        <tr key={index} className="border-b border-border/20 last:border-0 hover:bg-cream/30 transition-colors">
                          <td className="py-3 px-2">
                            <p className="font-medium text-foreground text-sm">{investor.name}</p>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-xs text-muted-foreground">{investor.focus}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="text-xs text-muted-foreground">{investor.check}</span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gold-light/50 text-foreground">{investor.match}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Flow diagram */}
                <div className="px-6 py-4 border-t border-border/50 bg-cream/20">
                  <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                    <span className="px-3 py-1.5 rounded-full bg-white border border-border/50">Your Startup</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-3 py-1.5 rounded-full bg-white border border-border/50">Matching Criteria</span>
                    <ArrowRight className="w-4 h-4" />
                    <span className="px-3 py-1.5 rounded-full bg-gold-light/50 border border-gold/30 font-medium">Target List</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default FeatureInvestorSearch;
