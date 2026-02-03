import { motion } from "framer-motion";
import { Camera, Film, Heart, Users } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Films",
    description:
      "Cinematic wedding films that capture every emotion, from intimate ceremonies to grand celebrations. Full-day coverage with highlight reels.",
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Professional photography for weddings, portraits, and special events. High-resolution images edited to perfection.",
  },
  {
    icon: Film,
    title: "Video Editing",
    description:
      "Expert video editing services with color grading, sound design, and cinematic effects. Transform your footage into art.",
  },
  {
    icon: Users,
    title: "Event Coverage",
    description:
      "Corporate events, conferences, parties, and special occasions. Complete photo and video coverage packages.",
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-body text-sm uppercase tracking-[0.3em] text-primary">
            What I Offer
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            My <span className="text-gradient-gold">Services</span>
          </h2>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden border border-border bg-card p-8 transition-all duration-500 hover:border-primary/50 lg:p-10"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-primary/30 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-gold">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-medium text-foreground md:text-3xl">
                {service.title}
              </h3>
              <p className="mt-4 font-body text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute -bottom-1 -right-1 h-12 w-12 border-b border-r border-primary/20 transition-all duration-300 group-hover:h-16 group-hover:w-16 group-hover:border-primary/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
