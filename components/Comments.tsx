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
        // Ensure the comment has proper user data from auth context
        const newCommentData = {
          ...data.comment,
          user: data.comment.user || {
            id: user?.id || "",
            name: user?.name || "Anonymous",
            image: user?.image,
          },
        };
        setComments([newCommentData, ...comments]);
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
      className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-clash font-bold text-foreground">
          Comments
          <span className="text-lg text-muted-foreground font-normal ml-2">
            ({comments.length})
          </span>
        </h2>
      </div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <Avatar className="w-11 h-11 border-2 border-primary/20">
                <AvatarImage src={user?.image} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[120px] resize-none border-border/50 bg-background focus:border-primary/50 focus:ring-2 focus:ring-primary/10 rounded-xl transition-all text-base"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {newComment.length > 0 && `${newComment.length} characters`}
                  </p>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    className="rounded-full px-8 py-2.5 h-auto font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Comment"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-8 rounded-2xl text-center border border-border/40">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Join the Conversation
          </h3>
          <p className="text-muted-foreground mb-5 text-sm">
            Please sign in to share your thoughts and engage with the community.
          </p>
          <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/20">
            <Link href="/login">Sign In to Comment</Link>
          </Button>
        </div>
      )}

      {/* Comments List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px bg-border flex-1" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                </span>
                <div className="h-px bg-border flex-1" />
              </div>
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Avatar className="w-11 h-11 border-2 border-border/50 ring-2 ring-background">
                    <AvatarImage
                      src={comment.user.image}
                      alt={comment.user.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-base">
                      {comment.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-card border border-border/50 p-5 rounded-2xl group-hover:border-border group-hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-bold text-foreground text-base break-words">
                          {comment.user?.name || "Anonymous"}
                        </h4>
                        <span className="text-xs text-muted-foreground/80 font-medium">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground/90 leading-relaxed text-[15px] break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed border-border/50">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">
                No comments yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
