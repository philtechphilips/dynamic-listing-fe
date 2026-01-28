"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Trash2,
    Edit3,
    ExternalLink,
    Search,
    MoreVertical
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const initialComments = [
    {
        id: '1',
        listing: 'The Golden Fork',
        text: 'Absolutely loved my experience here! The service was top-notch and the atmosphere was incredible. Definitely coming back soon.',
        date: 'Jan 21, 2026',
        slug: 'the-golden-fork',
        avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100'
    },
    {
        id: '2',
        listing: 'Luxury Beachfront Villa',
        text: 'Great place, slightly busy during peak hours but definitely worth the wait. The staff is very professional.',
        date: 'Jan 15, 2026',
        slug: 'luxury-beachfront-villa',
        avatar: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100'
    },
    {
        id: '3',
        listing: 'Zen Spa & Wellness',
        text: 'Reasonable prices for such a central location. Highly recommend the massage therapy.',
        date: 'Dec 28, 2025',
        slug: 'zen-spa',
        avatar: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=100'
    },
    {
        id: '4',
        listing: 'Cozy Downtown Studio',
        text: 'Perfect location, but the wifi was a bit slow during my stay.',
        date: 'Nov 12, 2025',
        slug: 'cozy-downtown-studio',
        avatar: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100'
    }
];

interface CommentCardProps {
    comment: typeof initialComments[0];
    onDelete: (id: string) => void;
}

function CommentCard({ comment, onDelete }: CommentCardProps) {
    return (
        <Card className="group hover:shadow-md transition-all duration-200 border-0">
            <CardContent className="p-6">
                <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="hidden sm:block w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                        <img
                            src={comment.avatar}
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
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Posted on {comment.date}
                                </p>
                            </div>

                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => console.log('Edit', comment.id)}
                                    title="Edit Comment"
                                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </Button>
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
                                        <DropdownMenuItem onClick={() => console.log('Edit', comment.id)}>
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Edit
                                        </DropdownMenuItem>
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
    const [comments, setComments] = useState(initialComments);
    const [search, setSearch] = useState('');

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    const filteredComments = comments.filter(c =>
        c.listing.toLowerCase().includes(search.toLowerCase()) ||
        c.text.toLowerCase().includes(search.toLowerCase())
    );

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
                            onDelete={handleDelete}
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
        </div>
    );
}
