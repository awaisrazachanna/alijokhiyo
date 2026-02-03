import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image, MessageSquare, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalPortfolio: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [portfolioRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from("portfolio_items").select("id", { count: "exact" }),
        supabase.from("contact_submissions").select("id", { count: "exact" }),
        supabase
          .from("contact_submissions")
          .select("id", { count: "exact" })
          .eq("is_read", false),
      ]);

      setStats({
        totalPortfolio: portfolioRes.count || 0,
        totalMessages: messagesRes.count || 0,
        unreadMessages: unreadRes.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Portfolio Items",
      value: stats.totalPortfolio,
      icon: Image,
      color: "text-primary",
    },
    {
      label: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-blue-400",
    },
    {
      label: "Unread Messages",
      value: stats.unreadMessages,
      icon: Eye,
      color: "text-red-400",
    },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-foreground">
        Dashboard <span className="text-primary">Overview</span>
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-4xl font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-10 w-10 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-display text-xl font-medium text-foreground">
          Quick Actions
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-card p-6">
            <h4 className="font-display text-lg text-foreground">
              Add Portfolio Item
            </h4>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Upload new photos or embed YouTube videos to showcase your work.
            </p>
          </div>
          <div className="border border-border bg-card p-6">
            <h4 className="font-display text-lg text-foreground">
              Update Contact Info
            </h4>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              Update your phone number, email, and social media links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
