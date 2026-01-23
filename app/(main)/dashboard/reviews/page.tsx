"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Star,
    Trash2,
    Edit3,
    ExternalLink,
    Search,
    MessageSquare
} from 'lucide-react';

const initialReviews = [
    {
        id: '1',
        listing: 'The Golden Fork',
        rating: 5,
        text: 'Best fine dining experience in the city. The truffle pasta is a absolute must-try! The wine selection is also quite impressive.',
        date: 'Jan 21, 2026',
        slug: 'the-golden-fork',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'
    },
    {
        id: '2',
        listing: 'Zen Spa & Wellness',
        rating: 4,
        text: 'Very relaxing atmosphere. The staff were professional. I would have given 5 stars but my session started 10 minutes late.',
        date: 'Dec 28, 2025',
        slug: 'zen-spa',
        image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?w=400'
    },
    {
        id: '3',
        listing: 'Cozy Downtown Studio',
        rating: 3,
        text: 'Good location, but the neighbors were quite noisy during my stay. The apartment itself was clean and well-equipped.',
        date: 'Nov 12, 2025',
        slug: 'cozy-downtown-studio',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    }
];

export default function MyReviewsPage() {
    const [reviews, setReviews] = useState(initialReviews);
    const [search, setSearch] = useState('');

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            setReviews(reviews.filter(r => r.id !== id));
        }
    };

    const filteredReviews = reviews.filter(r =>
        r.listing.toLowerCase().includes(search.toLowerCase()) ||
        r.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-clash font-bold text-gray-900">My Reviews</h1>
                    <p className="text-gray-500 mt-1">Reflect on your ratings and detailed reviews of local businesses.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
                            {/* Review Card Header with Image */}
                            <div className="h-32 relative">
                                <img src={review.image} alt={review.listing} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div>
                                        <h3 className="text-white font-bold text-lg leading-tight">{review.listing}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/40 fill-white/20'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <Link href={`/listing/${review.slug}`} target="_blank" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex-1">
                                    <p className="text-gray-600 text-sm italic leading-relaxed">"{review.text}"</p>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                                    <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                            onClick={() => console.log('Edit')}
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={() => handleDelete(review.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No reviews yet</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mt-2">Go out and explore! Your ratings help others discover the best places.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
