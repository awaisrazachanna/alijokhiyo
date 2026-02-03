import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Settings {
  owner_name: string;
  email: string;
  phone: string;
  location: string;
  instagram_url: string;
  youtube_url: string;
}

const SiteSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    owner_name: "",
    email: "",
    phone: "",
    location: "",
    instagram_url: "",
    youtube_url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch settings",
          variant: "destructive",
        });
      } else if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item) => {
          settingsMap[item.key] = item.value;
        });
        setSettings({
          owner_name: settingsMap.owner_name || "",
          email: settingsMap.email || "",
          phone: settingsMap.phone || "",
          location: settingsMap.location || "",
          instagram_url: settingsMap.instagram_url || "",
          youtube_url: settingsMap.youtube_url || "",
        });
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updates = Object.entries(settings).map(([key, value]) =>
        supabase
          .from("site_settings")
          .update({ value })
          .eq("key", key)
      );

      await Promise.all(updates);

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-foreground">
        Site <span className="text-primary">Settings</span>
      </h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="mt-8 max-w-2xl space-y-6"
      >
        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-lg text-foreground">
            Personal Information
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Your Name
              </label>
              <input
                type="text"
                value={settings.owner_name}
                onChange={(e) =>
                  setSettings({ ...settings, owner_name: e.target.value })
                }
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) =>
                  setSettings({ ...settings, phone: e.target.value })
                }
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Location
              </label>
              <input
                type="text"
                value={settings.location}
                onChange={(e) =>
                  setSettings({ ...settings, location: e.target.value })
                }
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-lg text-foreground">Social Media</h3>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) =>
                  setSettings({ ...settings, instagram_url: e.target.value })
                }
                placeholder="https://instagram.com/yourusername"
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube_url}
                onChange={(e) =>
                  setSettings({ ...settings, youtube_url: e.target.value })
                }
                placeholder="https://youtube.com/@yourchannel"
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 border border-primary bg-primary px-6 py-3 font-body text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </button>
      </motion.form>
    </div>
  );
};

export default SiteSettings;
