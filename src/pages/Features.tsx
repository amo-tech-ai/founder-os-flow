import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import FeaturesHero from "@/components/features/FeaturesHero";
import FeatureCRM from "@/components/features/FeatureCRM";
import FeatureProjectManagement from "@/components/features/FeatureProjectManagement";
import FeatureInvestorSearch from "@/components/features/FeatureInvestorSearch";
import FeaturePitchDeck from "@/components/features/FeaturePitchDeck";
import FeatureEvents from "@/components/features/FeatureEvents";
import FeatureHiring from "@/components/features/FeatureHiring";
import FeatureCommunication from "@/components/features/FeatureCommunication";
import FeaturesBenefits from "@/components/features/FeaturesBenefits";
import FeaturesCTA from "@/components/features/FeaturesCTA";

const Features = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main>
        <FeaturesHero />
        <FeatureCRM />
        <FeatureProjectManagement />
        <FeatureInvestorSearch />
        <FeaturePitchDeck />
        <FeatureEvents />
        <FeatureHiring />
        <FeatureCommunication />
        <FeaturesBenefits />
        <FeaturesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
