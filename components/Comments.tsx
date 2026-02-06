"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { apiFetch, getAuthHeaders } from "@/lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BackendComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

interface CommentsProps {
  listingId?: string;
  newsId?: string;
}

export default function Comments({ listingId, newsId }: CommentsProps) {
  const { isAuthenticated, user, token } = useAuth();
  const [comments, setComments] = useState<BackendComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    if (!listingId && !newsId) return;
    setIsLoading(true);
    try {
      const query = listingId ? `listingId=${listingId}` : `newsId=${newsId}`;
      const response = await fetch(`${API_URL}/comments?${query}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [listingId, newsId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setIsSubmitting(true);

    try {
      const response = await apiFetch(`/comments`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          content: newComment,
          listingId,
          newsId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      id="comments"
      className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="flex items-center gap-2 border-b border-border/40 pb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-clash font-semibold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.image} alt={user?.name || "User"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] resize-none border-0 bg-muted focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-xl transition-all"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="rounded-full px-6 py-2.5 h-auto flex items-center gap-2.5 group text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-md"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-semibold">Posting...</span>
                      </span>
                    ) : (
                      <span className="font-semibold">Post Comment</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted/30 p-6 rounded-2xl text-center border border-dashed border-border/60">
          <p className="text-muted-foreground mb-4">
            Please sign in to join the conversation.
          </p>
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-6 pt-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 group">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={comment.user.image}
                    alt={comment.user.name}
                  />
                  <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                    {comment.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted/30 p-4 rounded-2xl group-hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">
                      {comment.user.name}
                    </h4>
                    <span className="text-xs text-muted-foreground font-medium">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground italic">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
