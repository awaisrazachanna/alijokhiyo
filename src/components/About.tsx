import { motion } from "framer-motion";
import { Camera, Film, Sparkles } from "lucide-react";
import photographerImage from "@/assets/photographer-portrait.jpg";

const About = () => {
  const stats = [
    { number: "150+", label: "Weddings Filmed" },
    { number: "8+", label: "Years Experience" },
    { number: "200+", label: "Happy Couples" },
  ];

  return (
    <section id="about" className="bg-charcoal-light py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={photographerImage}
                alt="Muhammad Ali Jokhio - Photographer & Videographer"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 border border-primary/20" />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full border border-primary/30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="font-body text-sm uppercase tracking-[0.3em] text-primary">
              About Me
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
              Telling Your Story
              <br />
              <span className="text-gradient-gold">Through My Lens</span>
            </h2>

            <div className="mt-8 space-y-6 font-body text-muted-foreground">
              <p>
                I'm Muhammad Ali Jokhio, a passionate photographer and videographer 
                based in Leeuwarden, Netherlands. With over 8 years of experience, 
                I specialize in capturing the most precious moments of your life 
                with a cinematic touch.
              </p>
              <p>
                From intimate weddings to grand celebrations, corporate events to 
                personal stories, I bring a unique perspective that transforms 
                moments into timeless memories. My approach combines technical 
                expertise with artistic vision to create visuals that truly resonate.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="font-display text-3xl font-medium text-primary md:text-4xl">
                    {stat.number}
                  </div>
                  <div className="mt-1 font-body text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-12 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-primary" />
                <span className="font-body text-sm text-foreground">4K Cinematic</span>
              </div>
              <div className="flex items-center gap-3">
                <Film className="h-5 w-5 text-primary" />
                <span className="font-body text-sm text-foreground">Professional Edit</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-body text-sm text-foreground">Same Day Edit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
