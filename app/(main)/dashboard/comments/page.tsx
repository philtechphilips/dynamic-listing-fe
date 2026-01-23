"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    MessageSquare,
    Trash2,
    Edit3,
    ExternalLink,
    Search,
    MoreVertical,
    Filter
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-clash font-bold text-gray-900">My Comments</h1>
                    <p className="text-gray-500 mt-1">Manage and edit your feedback on various listings.</p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search comments..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                        />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredComments.length > 0 ? (
                    filteredComments.map((comment) => (
                        <div key={comment.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6 relative group hover:border-primary/20 transition-all">
                            <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                                <img src={comment.avatar} alt={comment.listing} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg">{comment.listing}</h3>
                                            <Link href={`/listing/${comment.slug}`} target="_blank">
                                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-primary transition-colors" />
                                            </Link>
                                        </div>
                                        <p className="text-xs text-gray-400 font-medium">Posted on {comment.date}</p>
                                    </div>

                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => console.log('Edit', comment.id)}
                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Comment"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Comment"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="sm:hidden">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 hover:bg-gray-100 rounded-md">
                                                    <MoreVertical className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => console.log('Edit')}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(comment.id)} className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary/10 rounded-full" />
                                    <p className="text-gray-600 italic leading-relaxed text-sm md:text-base">
                                        "{comment.text}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No comments found</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">Try searching for something else or explore listings to share your thoughts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
