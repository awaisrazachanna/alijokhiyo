import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import SuccessDialog from "./SuccessDialog";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const phoneNumber = "+31 621388753";
  const emailAddress = "alijokhio755@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        event_type: formData.eventType || null,
        message: formData.message,
      });

      if (error) throw error;

      setShowSuccess(true);
      setFormData({ name: "", email: "", phone: "", eventType: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-background py-24 lg:py-32">
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
            Get In Touch
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            Let's Create <span className="text-gradient-gold">Together</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-muted-foreground">
            Ready to capture your special moments? Get in touch and let's discuss 
            how we can create something beautiful together.
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-medium text-foreground">
                Contact Information
              </h3>
              <p className="mt-4 font-body text-muted-foreground">
                Based in Leeuwarden, I'm available for projects throughout the 
                Netherlands and beyond. Let's connect!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-primary/30 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Location</p>
                  <p className="font-body text-foreground">Leeuwarden, Netherlands</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-primary/30 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="font-body text-foreground transition-colors hover:text-primary"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-primary/30 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    className="font-body text-foreground transition-colors hover:text-primary"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <p className="font-body text-sm text-muted-foreground">Follow Me</p>
              <div className="mt-4 flex gap-4">
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-body text-sm text-muted-foreground"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-border bg-card px-4 py-3 font-body text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-body text-sm text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-border bg-card px-4 py-3 font-body text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-body text-sm text-muted-foreground"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full border border-border bg-card px-4 py-3 font-body text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                    placeholder="+31 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label
                    htmlFor="eventType"
                    className="block font-body text-sm text-muted-foreground"
                  >
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="mt-2 w-full border border-border bg-card px-4 py-3 font-body text-foreground transition-colors focus:border-primary focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-sm text-muted-foreground"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-2 w-full resize-none border border-border bg-card px-4 py-3 font-body text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none"
                  placeholder="Tell me about your event..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full border border-primary bg-primary px-8 py-4 font-body text-sm uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        phoneNumber={phoneNumber}
      />
    </section>
  );
};

export default Contact;
