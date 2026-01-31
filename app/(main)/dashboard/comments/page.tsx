"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Trash2,
    Edit3,
    ExternalLink,
    Search,
    MoreVertical,
    AlertTriangle
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Comment {
    id: string;
    listing: string;
    text: string;
    date: string;
    slug: string;
    avatar: string;
    userImage?: string;
    type: 'listing' | 'news';
}

interface CommentCardProps {
    comment: Comment;
    onDelete: (id: string) => void;
    currentUserImage?: string;
}

function CommentCard({ comment, onDelete, currentUserImage }: CommentCardProps) {
    const avatarSrc = comment.userImage || currentUserImage;
    return (
        <Card className="group hover:shadow-md transition-all duration-200 border-0">
            <CardContent className="p-6">
                <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <img
                            src={comment.avatar || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100"}
                            alt={comment.listing}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* Header */}
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Avatar className="h-6 w-6 shrink-0">
                                        <AvatarImage src={avatarSrc} alt="You" />
                                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">?</AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold text-foreground text-base truncate">
                                        {comment.listing}
                                    </h3>
                                    <Link
                                        href={`/item/${comment.slug}`}
                                        target="_blank"
                                        className="shrink-0"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors" />
                                    </Link>
                                    {comment.type === 'news' && (
                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5">News</Badge>
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Posted on {format(new Date(comment.date), 'MMM d, yyyy')}
                                </p>
                            </div>

                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(comment.id)}
                                    title="Delete Comment"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Mobile Actions */}
                            <div className="sm:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="border-0">
                                        <DropdownMenuItem
                                            onClick={() => onDelete(comment.id)}
                                            className="text-destructive focus:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Comment Text */}
                        <div className="relative pl-3 border-l-2 border-primary/10">
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                "{comment.text}"
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function MyCommentsPage() {
    const { token, user } = useAuth();
    const { toast } = useToast();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            if (!token) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/comments`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    console.error("Failed to fetch comments");
                }
            } catch (error) {
                console.error("Error loading comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [token]);

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                setComments(comments.filter(c => c.id !== deleteId));
                toast({
                    title: "Comment deleted",
                    description: "Your comment has been successfully removed.",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete comment. Please try again.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive"
            });
        } finally {
            setDeleteId(null);
        }
    };

    const filteredComments = comments.filter(c =>
        c.listing.toLowerCase().includes(search.toLowerCase()) ||
        c.text.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading comments...</div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Comments</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and edit your feedback on various listings
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="text"
                        placeholder="Search comments..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Stats Badge */}
            {filteredComments.length > 0 && (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="border-0">
                        {filteredComments.length} {filteredComments.length === 1 ? 'Comment' : 'Comments'}
                    </Badge>
                    {search && (
                        <span className="text-sm text-muted-foreground">
                            matching "{search}"
                        </span>
                    )}
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-3">
                {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            onDelete={setDeleteId}
                            currentUserImage={user?.image}
                        />
                    ))
                ) : (
                    <Card className="border-0">
                        <CardContent className="text-center py-16">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                {search ? 'No comments found' : 'No comments yet'}
                            </h3>
                            <p className="text-muted-foreground max-w-sm mx-auto">
                                {search
                                    ? 'Try searching for something else or clear your search.'
                                    : 'Start exploring listings and share your thoughts with the community.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete your comment. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
