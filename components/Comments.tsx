"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
    id: string;
    author: string;
    avatar?: string;
    date: string;
    text: string;
}

const initialComments: Comment[] = [
    {
        id: '1',
        author: 'Sarah Jenkins',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: '2 days ago',
        text: 'Absolutely loved my experience here! The service was top-notch and the atmosphere was incredible. Definitely coming back soon.'
    },
    {
        id: '2',
        author: 'Marcus Chen',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        date: '1 week ago',
        text: 'Great place, slightly busy during peak hours but definitely worth the wait. The staff is very professional.'
    }
];

export default function Comments() {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                author: 'You',
                date: 'Just now',
                text: newComment,
            };

            setComments([comment, ...comments]);
            setNewComment('');
            setIsSubmitting(false);
        }, 800);
    };

    return (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 border-b border-border/40 pb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-clash font-semibold text-foreground">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">U</AvatarFallback>
                    </Avatar>
                        <div className="flex-1 space-y-3">
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
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span className="font-semibold">Posting...</span>
                                    </span>
                                ) : (
                                    <>
                                        <span className="font-semibold">Post Comment</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6 pt-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar} alt={comment.author} className="object-cover" />
                            <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                                {comment.author.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 bg-muted/30 p-4 rounded-2xl group-hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                <h4 className="font-semibold text-foreground">{comment.author}</h4>
                                <span className="text-xs text-muted-foreground font-medium">{comment.date}</span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
