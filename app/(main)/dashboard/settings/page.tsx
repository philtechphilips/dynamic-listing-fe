"use client";

import React from 'react';
import {
    User,
    Mail,
    Lock,
    Shield,
    Camera
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-clash font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account preferences and personal information.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/5" />
                        <CardContent className="px-6 pb-6 text-center">
                            <div className="relative -mt-12 mb-4 flex justify-center">
                                <div className="relative group cursor-pointer">
                                    <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">JD</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                            <p className="text-sm text-gray-500">Member since January 2026</p>

                            <div className="mt-6 pt-6 border-t border-gray-50 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Status</span>
                                    <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold">Active</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">Total Reviews</span>
                                    <span className="font-semibold text-gray-900">12</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-primary bg-primary/5 rounded-xl">
                            <User className="w-4 h-4" /> Personal Info
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors text-left">
                            <Lock className="w-4 h-4" /> Password & Security
                        </button>
                    </div>
                </div>

                {/* Form Area */}
                <div className="lg:col-span-2">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-clash">Personal Information</CardTitle>
                            <CardDescription>Update your profile details and how others see you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" defaultValue="John" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input type="email" defaultValue="john.doe@example.com" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Bio</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about yourself..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                    defaultValue="Passionate food traveler and tech enthusiast. Always looking for the best local spots and hidden gems around the world."
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button className="px-8 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg shadow-primary/20">
                                    Save Changes
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
