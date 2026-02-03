import { motion } from "framer-motion";
import { Play } from "lucide-react";
import weddingImage1 from "@/assets/portfolio-wedding-1.jpg";
import eventImage from "@/assets/portfolio-event-1.jpg";
import coupleImage from "@/assets/portfolio-couple-1.jpg";
import videoImage from "@/assets/portfolio-video-1.jpg";

const portfolioItems = [
  {
    image: weddingImage1,
    title: "The Ceremony",
    category: "Wedding Film",
    isVideo: true,
  },
  {
    image: coupleImage,
    title: "Golden Hour",
    category: "Wedding Photography",
    isVideo: false,
  },
  {
    image: eventImage,
    title: "Corporate Gala",
    category: "Event Coverage",
    isVideo: false,
  },
  {
    image: videoImage,
    title: "Behind The Scenes",
    category: "Videography",
    isVideo: true,
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="bg-charcoal-light py-24 lg:py-32">
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
            Featured Work
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            My <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Portfolio Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="portfolio-card group relative aspect-[4/3] cursor-pointer overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                {item.isVideo && (
                  <motion.div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/20 text-primary opacity-0 transition-all duration-500 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="ml-1 h-6 w-6" fill="currentColor" />
                  </motion.div>
                )}
                <h3 className="font-display text-2xl font-medium text-foreground opacity-0 transition-all duration-500 group-hover:opacity-100 md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm uppercase tracking-widest text-primary opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {item.category}
                </p>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-primary/50" />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-primary bg-transparent px-8 py-4 font-body text-sm uppercase tracking-widest text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Request Full Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
