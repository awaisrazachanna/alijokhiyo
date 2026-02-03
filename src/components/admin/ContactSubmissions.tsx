import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Calendar, Eye, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch submissions",
        variant: "destructive",
      });
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleView = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);

    if (!submission.is_read) {
      await supabase
        .from("contact_submissions")
        .update({ is_read: true })
        .eq("id", submission.id);

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submission.id ? { ...s, is_read: true } : s
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Message deleted successfully",
      });
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
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
        Contact <span className="text-primary">Messages</span>
      </h2>

      <div className="mt-8 space-y-4">
        <AnimatePresence>
          {submissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`border bg-card p-4 transition-colors ${
                submission.is_read ? "border-border" : "border-primary"
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-lg text-foreground">
                      {submission.name}
                    </h3>
                    {!submission.is_read && (
                      <span className="rounded bg-primary px-2 py-0.5 font-body text-xs text-primary-foreground">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 font-body text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {submission.email}
                    </span>
                    {submission.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {submission.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(submission.created_at), "PPp")}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 font-body text-sm text-muted-foreground">
                    {submission.message}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(submission)}
                    className="flex items-center gap-2 border border-primary px-3 py-2 font-body text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="flex items-center gap-2 border border-destructive px-3 py-2 font-body text-sm text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {submissions.length === 0 && (
        <div className="mt-8 border border-dashed border-border p-12 text-center">
          <p className="font-body text-muted-foreground">
            No messages yet. When someone contacts you, it will appear here.
          </p>
        </div>
      )}

      {/* View Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">
              Message from {selectedSubmission?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedSubmission && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-body text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="text-foreground underline hover:text-primary"
                  >
                    {selectedSubmission.email}
                  </a>
                </div>
                {selectedSubmission.phone && (
                  <div className="flex items-center gap-2 font-body text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="text-foreground hover:text-primary"
                    >
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(selectedSubmission.created_at), "PPpp")}
                </div>
              </div>

              {selectedSubmission.event_type && (
                <div>
                  <p className="font-body text-sm text-muted-foreground">
                    Event Type
                  </p>
                  <p className="font-body text-foreground capitalize">
                    {selectedSubmission.event_type}
                  </p>
                </div>
              )}

              <div>
                <p className="font-body text-sm text-muted-foreground">
                  Message
                </p>
                <p className="mt-1 whitespace-pre-wrap font-body text-foreground">
                  {selectedSubmission.message}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="flex-1 border border-primary bg-primary px-4 py-2 text-center font-body text-sm text-primary-foreground transition-colors hover:bg-primary/80"
                >
                  Reply via Email
                </a>
                {selectedSubmission.phone && (
                  <a
                    href={`tel:${selectedSubmission.phone}`}
                    className="flex-1 border border-border px-4 py-2 text-center font-body text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactSubmissions;
