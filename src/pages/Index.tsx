import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Process from "@/components/sections/Process";
import Benefits from "@/components/sections/Benefits";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Process />
        <Benefits />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
