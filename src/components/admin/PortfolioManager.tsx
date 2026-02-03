import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Upload, Youtube, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  youtube_url: string | null;
  is_video: boolean;
  display_order: number;
  is_active: boolean;
}

const PortfolioManager = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    youtube_url: "",
    is_video: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items",
        variant: "destructive",
      });
    } else {
      setItems(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const openEditDialog = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      youtube_url: item.youtube_url || "",
      is_video: item.is_video,
    });
    setImagePreview(item.image_url);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "",
      youtube_url: "",
      is_video: false,
    });
    setImageFile(null);
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = editingItem?.image_url || null;

      // Upload image if new file selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("portfolio")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      const itemData = {
        title: formData.title,
        category: formData.category,
        image_url: imageUrl,
        youtube_url: formData.youtube_url || null,
        is_video: formData.is_video,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("portfolio_items")
          .update(itemData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Portfolio item updated successfully",
        });
      } else {
        const { error } = await supabase.from("portfolio_items").insert({
          ...itemData,
          display_order: items.length,
        });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Portfolio item added successfully",
        });
      }

      setIsDialogOpen(false);
      fetchItems();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase
      .from("portfolio_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Portfolio item deleted successfully",
      });
      fetchItems();
    }
  };

  const categories = [
    "Wedding Film",
    "Wedding Photography",
    "Event Coverage",
    "Videography",
    "Portrait",
    "Corporate",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-medium text-foreground">
          Portfolio <span className="text-primary">Manager</span>
        </h2>
        <button
          onClick={openNewDialog}
          className="flex items-center gap-2 border border-primary bg-primary px-4 py-2 font-body text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative aspect-video overflow-hidden border border-border bg-card"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : item.youtube_url ? (
                <div className="flex h-full w-full items-center justify-center bg-charcoal-light">
                  <Youtube className="h-12 w-12 text-red-500" />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-charcoal-light text-muted-foreground">
                  No Image
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-charcoal/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditDialog(item)}
                    className="rounded bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-destructive p-2 text-destructive-foreground transition-colors hover:bg-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-primary">
                    {item.category}
                  </p>
                  <p className="font-display text-lg text-foreground">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="mt-8 border border-dashed border-border p-12 text-center">
          <p className="font-body text-muted-foreground">
            No portfolio items yet. Add your first one!
          </p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">
              {editingItem ? "Edit" : "Add"} Portfolio Item
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                Image
              </label>
              <div className="mt-1">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-40 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute right-2 top-2 rounded bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-border p-8 transition-colors hover:border-primary">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="mt-2 font-body text-sm text-muted-foreground">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block font-body text-sm text-muted-foreground">
                YouTube URL (for videos)
              </label>
              <input
                type="url"
                value={formData.youtube_url}
                onChange={(e) =>
                  setFormData({ ...formData, youtube_url: e.target.value })
                }
                placeholder="https://youtube.com/watch?v=..."
                className="mt-1 w-full border border-border bg-background px-4 py-2 font-body text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_video"
                checked={formData.is_video}
                onChange={(e) =>
                  setFormData({ ...formData, is_video: e.target.checked })
                }
                className="h-4 w-4 accent-primary"
              />
              <label
                htmlFor="is_video"
                className="font-body text-sm text-muted-foreground"
              >
                This is a video
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 border border-border px-4 py-2 font-body text-sm text-muted-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 border border-primary bg-primary px-4 py-2 font-body text-sm text-primary-foreground transition-colors hover:bg-primary/80 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : editingItem ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioManager;
