import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-charcoal py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <a href="#" className="font-display text-2xl font-medium text-foreground">
            <span className="text-primary">M</span>uhammad <span className="text-primary">A</span>li <span className="text-primary">J</span>okhiyo
          </a>

          {/* Copyright */}
          <div className="flex items-center gap-1 font-body text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Made with</span>
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
            <span>in Leeuwarden, Netherlands</span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6">
            <a
              href="#about"
              className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </a>
            <a
              href="#portfolio"
              className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
