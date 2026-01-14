import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";

// Product pages
import Pricing from "./pages/Pricing";
import Perks from "./pages/Perks";

// AI Flows
import ProfileFlow from "./pages/flows/ProfileFlow";
import StartupFlow from "./pages/flows/StartupFlow";
import EventFlow from "./pages/flows/EventFlow";
import JobFlow from "./pages/flows/JobFlow";

// Fundraising pages
import Fundraising from "./pages/fundraising/Fundraising";
import PitchDeck from "./pages/fundraising/PitchDeck";
import InvestorCRM from "./pages/fundraising/InvestorCRM";
import Accelerators from "./pages/fundraising/Accelerators";
import Sponsors from "./pages/fundraising/Sponsors";

// Company pages
import About from "./pages/company/About";
import Blog from "./pages/company/Blog";
import Contact from "./pages/company/Contact";
import Privacy from "./pages/company/Privacy";
import Terms from "./pages/company/Terms";

// Dashboard imports
import { AppProvider } from "./contexts/AppContext";
import { AppShell } from "./components/dashboard/AppShell";
import Dashboard from "./pages/app/Dashboard";
import Tasks from "./pages/app/Tasks";
import Projects from "./pages/app/Projects";
import ProjectDetail from "./pages/app/ProjectDetail";
import Contacts from "./pages/app/Contacts";
import Deals from "./pages/app/Deals";
import Profile from "./pages/app/Profile";
import CompanyProfile from "./pages/app/CompanyProfile";
import Settings from "./pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Marketing Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/perks" element={<Perks />} />

            {/* AI Flows */}
            <Route path="/flows/profile" element={<ProfileFlow />} />
            <Route path="/flows/startup" element={<StartupFlow />} />
            <Route path="/flows/event" element={<EventFlow />} />
            <Route path="/flows/job" element={<JobFlow />} />

            {/* Fundraising */}
            <Route path="/fundraising" element={<Fundraising />} />
            <Route path="/fundraising/pitch-deck" element={<PitchDeck />} />
            <Route path="/fundraising/investor-crm" element={<InvestorCRM />} />
            <Route path="/fundraising/accelerators" element={<Accelerators />} />
            <Route path="/fundraising/sponsors" element={<Sponsors />} />

            {/* Company */}
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Dashboard Routes */}
            <Route path="/app" element={<AppShell />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="deals" element={<Deals />} />
              <Route path="profile" element={<Profile />} />
              <Route path="company" element={<CompanyProfile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
