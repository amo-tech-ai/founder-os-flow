import { MotionWrapper } from "@/components/ui/motion-wrapper";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="container-wide">
        <MotionWrapper>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                <span className="text-lg font-serif font-semibold text-background">S</span>
              </div>
              <span className="font-serif text-xl font-medium text-foreground">StartupAI</span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8">
              {["About", "Features", "Pricing", "Blog"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © 2026 StartupAI. All rights reserved.
            </p>
          </div>
        </MotionWrapper>
      </div>
    </footer>
  );
};

export default Footer;
