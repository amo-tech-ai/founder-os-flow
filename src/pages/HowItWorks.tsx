import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import HowItWorksHero from "@/components/how-it-works/HowItWorksHero";
import StrategySession from "@/components/how-it-works/StrategySession";
import StrategyEngine from "@/components/how-it-works/StrategyEngine";
import DailyDashboard from "@/components/how-it-works/DailyDashboard";
import AICoach from "@/components/how-it-works/AICoach";
import FeaturesOverview from "@/components/how-it-works/FeaturesOverview";
import FlowSummary from "@/components/how-it-works/FlowSummary";
import HowItWorksCTA from "@/components/how-it-works/HowItWorksCTA";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HowItWorksHero />
        <StrategySession />
        <StrategyEngine />
        <DailyDashboard />
        <AICoach />
        <FeaturesOverview />
        <FlowSummary />
        <HowItWorksCTA />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
