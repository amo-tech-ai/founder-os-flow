import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface PlaceholderPageProps {
  title: string;
  description: string;
  category?: string;
}

const PlaceholderPage = ({ title, description, category }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container-wide py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-lg font-serif font-semibold text-background">S</span>
            </div>
            <span className="font-serif text-xl font-medium text-foreground">StartupAI</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container-wide py-24 md:py-32">
        <MotionWrapper>
          <div className="max-w-2xl mx-auto text-center">
            {category && (
              <span className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted rounded-full">
                {category}
              </span>
            )}
            
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">
              {title}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground mb-12">
              <Clock className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </MotionWrapper>
      </main>
    </div>
  );
};

export default PlaceholderPage;
