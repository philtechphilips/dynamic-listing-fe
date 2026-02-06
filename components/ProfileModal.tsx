"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload, User, Camera } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, getAuthHeaders } from "@/lib/api";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007";

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user, login, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getInitials = (name: string | undefined) => {
        if (!name) return "U";
        const parts = name.split(" ");
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB");
                return;
            }
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await apiFetch(`/auth/profile-image`, {
                method: "POST",
                headers: getAuthHeaders(true),
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to upload image");
            }

            // Update local user state
            if (data.user && token) {
                login(token, data.user);
            }

            toast.success("Profile image updated successfully");
            onClose();
            // Reset state
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile picture and view your account details.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer" onClick={triggerFileInput}>
                            <Avatar className="h-24 w-24 border-4 border-muted">
                                <AvatarImage src={previewUrl || user?.image || ""} className="object-cover" />
                                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                                    {getInitials(user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        {selectedFile && (
                            <p className="text-xs text-muted-foreground">
                                Selected: {selectedFile.name}
                            </p>
                        )}
                        <Button variant="outline" size="sm" onClick={triggerFileInput}>
                            Change Picture
                        </Button>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={user?.name || ""} disabled readOnly className="bg-muted" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={user?.email || ""} disabled readOnly className="bg-muted" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
