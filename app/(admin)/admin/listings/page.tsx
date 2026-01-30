"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8007/api/v1";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface Listing {
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    category?: Category;
    location: string;
    address: string;
    priceRange: string;
    status: string;
    excerpt?: string;
    content?: string;
    featuredImage?: string;
    phone?: string;
    email?: string;
    website?: string;
    openingHours?: string;
    googleMapUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    rating: number;
    reviewCount: number;
}

const ListingsPage = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Listing | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        categoryId: "",
        location: "",
        address: "",
        priceRange: "$$",
        status: "Draft",
        excerpt: "",
        content: "",
        featuredImage: "",
        phone: "",
        email: "",
        website: "",
        openingHours: "",
        googleMapUrl: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
        rating: 0,
        reviewCount: 0
    });

    const { toast } = useToast();

    const getAuthHeaders = (isFormData = false) => {
        const token = localStorage.getItem("token");
        const headers: any = {
            Authorization: `Bearer ${token}`,
        };
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }
        return headers;
    };

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data = await response.json();
            const fetchedCategories = data.categories || [];
            setCategories(fetchedCategories);

            // Set default category for new listings if not already set
            if (fetchedCategories.length > 0 && !formData.categoryId && !editingItem) {
                setFormData(prev => ({ ...prev, categoryId: fetchedCategories[0].id }));
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, [editingItem, formData.categoryId]);

    const fetchListings = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/listings`);
            if (!response.ok) throw new Error("Failed to fetch listings");
            const data = await response.json();
            setListings(data.listings || []);
        } catch (error) {
            console.error("Error fetching listings:", error);
            toast({
                title: "Error",
                description: "Failed to load listings",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchCategories();
        fetchListings();
    }, [fetchCategories, fetchListings]);

    const handleOpenModal = (item: Listing | null = null) => {
        // Fetch categories again to ensure they are up to date
        fetchCategories();

        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || "",
                slug: item.slug || "",
                categoryId: item.categoryId || (categories.length > 0 ? categories[0].id : ""),
                location: item.location || "",
                address: item.address || "",
                priceRange: item.priceRange || "$$",
                status: item.status || "Draft",
                excerpt: item.excerpt || "",
                content: item.content || "",
                featuredImage: item.featuredImage || "",
                phone: item.phone || "",
                email: item.email || "",
                website: item.website || "",
                openingHours: item.openingHours || "",
                googleMapUrl: item.googleMapUrl || "",
                seoTitle: item.seoTitle || "",
                seoDescription: item.seoDescription || "",
                seoKeywords: item.seoKeywords || "",
                rating: item.rating || 0,
                reviewCount: item.reviewCount || 0
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                slug: "",
                categoryId: categories.length > 0 ? categories[0].id : "",
                location: "",
                address: "",
                priceRange: "$$",
                status: "Draft",
                excerpt: "",
                content: "",
                featuredImage: "",
                phone: "",
                email: "",
                website: "",
                openingHours: "",
                googleMapUrl: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
                rating: 0,
                reviewCount: 0
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title || !formData.categoryId || !formData.location || !formData.address) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields (Title, Category, Location, Address)",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();

            // Append all fields from formData state
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataToSend.append(key, value.toString());
                }
            });

            // If there's a new file selected, append it
            if (imageFile) {
                formDataToSend.append("featuredImage", imageFile);
            }

            const url = editingItem
                ? `${API_URL}/admin/listings/${editingItem.id}`
                : `${API_URL}/admin/listings`;

            const method = editingItem ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(true),
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save listing");
            }

            toast({
                title: "Success",
                description: `Listing ${editingItem ? "updated" : "created"} successfully`,
            });

            setIsModalOpen(false);
            fetchListings();
        } catch (error) {
            console.error("Error saving listing:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to save listing";
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this listing?")) return;

        try {
            const response = await fetch(`${API_URL}/admin/listings/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error("Failed to delete listing");

            toast({
                title: "Success",
                description: "Listing deleted successfully",
            });

            fetchListings();
        } catch (error) {
            console.error("Error deleting listing:", error);
            toast({
                title: "Error",
                description: "Failed to delete listing",
                variant: "destructive",
            });
        }
    };

    const handleStatusToggle = async (listing: Listing) => {
        const newStatus = listing.status === "Published" ? "Draft" : "Published";
        try {
            const response = await fetch(`${API_URL}/admin/listings/${listing.id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            toast({
                title: "Success",
                description: `Listing ${newStatus === "Published" ? "published" : "set to draft"}`,
            });

            fetchListings();
        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                title: "Error",
                description: "Failed to update status",
                variant: "destructive",
            });
        }
    };

    const updateTitle = (val: string) => {
        const slug = val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        setFormData({ ...formData, title: val, slug });
    };

    return (
        <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
                    <p className="text-muted-foreground">
                        Manage your local business, property, and entertainment listings.
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> New Listing
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search listings..." className="pl-8 text-black dark:text-white" />
                </div>
            </div>

            <div className="rounded-md border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Loading listings...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : listings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No listings found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            listings.map((listing) => (
                                <TableRow key={listing.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col text-black dark:text-white">
                                            <span>{listing.title}</span>
                                            <span className="text-xs text-muted-foreground font-normal">/{listing.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-black dark:text-white">{listing.category?.name || "Uncategorized"}</TableCell>
                                    <TableCell className="text-black dark:text-white">{listing.location}</TableCell>
                                    <TableCell className="text-black dark:text-white">{listing.priceRange}</TableCell>
                                    <TableCell>
                                        <Badge variant={listing.status === "Published" ? "default" : "outline"}>
                                            {listing.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleStatusToggle(listing)}
                                                title={listing.status === "Published" ? "Unpublish" : "Publish"}
                                            >
                                                {listing.status === "Published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenModal(listing)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(listing.id)}
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-black dark:text-white">{editingItem ? "Edit Listing" : "New Listing"}</DialogTitle>
                        <DialogDescription className="text-stone-500 dark:text-stone-400">
                            Complete all fields for the best user experience on the website.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 min-h-0 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                            {/* PRIMARY INFO */}
                            <div className="space-y-4 border-b pb-6 md:border-b-0 md:pb-0">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Primary Information</h3>
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-black dark:text-white">Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => updateTitle(e.target.value)}
                                        placeholder="e.g. The Grand Hotel"
                                        className="text-black dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slug" className="text-black dark:text-white">Slug (Auto-generated)</Label>
                                    <Input id="slug" value={formData.slug} readOnly className="bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono text-xs" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-black dark:text-white">Category *</Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location" className="text-black dark:text-white">General Location (Area/City) *</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. Makati"
                                        className="text-black dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-black dark:text-white">Full Address *</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="123 Street Name, City, Country"
                                        className="text-black dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="priceRange" className="text-black dark:text-white">Price Range</Label>
                                        <select
                                            id="priceRange"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                            value={formData.priceRange}
                                            onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                        >
                                            <option value="$">Low ($)</option>
                                            <option value="$$">Medium ($$)</option>
                                            <option value="$$$">High ($$$)</option>
                                            <option value="$$$$">Luxury ($$$$)</option>
                                        </select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status" className="text-black dark:text-white">Status</Label>
                                        <select
                                            id="status"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="Draft">Draft</option>
                                            <option value="Published">Published</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* CONTACT & MEDIA */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Contact & Media</h3>
                                <div className="grid gap-2">
                                    <Label htmlFor="featuredImage" className="text-black dark:text-white">Featured Image</Label>
                                    <div className="space-y-2">
                                        <Input
                                            id="featuredImageFile"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                            className="text-black dark:text-white"
                                        />
                                        {imageFile ? (
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                                                <img
                                                    src={URL.createObjectURL(imageFile)}
                                                    alt="New Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : formData.featuredImage ? (
                                            <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                                                <img
                                                    src={formData.featuredImage}
                                                    alt="Existing Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone" className="text-black dark:text-white">Phone</Label>
                                        <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+63..." className="text-black dark:text-white" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
                                        <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="info@..." className="text-black dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website" className="text-black dark:text-white">Website</Label>
                                    <Input id="website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://..." className="text-black dark:text-white" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="openingHours" className="text-black dark:text-white">Opening Hours</Label>
                                    <Input id="openingHours" value={formData.openingHours} onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })} placeholder="Mon-Fri: 9am-6pm" className="text-black dark:text-white" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="googleMapUrl" className="text-black dark:text-white">Google Map Embed URL</Label>
                                    <Input id="googleMapUrl" value={formData.googleMapUrl} onChange={(e) => setFormData({ ...formData, googleMapUrl: e.target.value })} placeholder="https://www.google.com/maps/embed?..." className="text-black dark:text-white" />
                                </div>
                            </div>

                            {/* DESCRIPTION & SEO */}
                            <div className="md:col-span-2 space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Description & SEO</h3>
                                <div className="grid gap-2">
                                    <Label htmlFor="excerpt" className="text-black dark:text-white">Short Excerpt (Grid View)</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Brief description for the card view..."
                                        className="text-black dark:text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content" className="text-black dark:text-white">Full Content (Detail Page)</Label>
                                    <Textarea
                                        id="content"
                                        className="min-h-[150px] text-black dark:text-white"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="Write a detailed description of the listing..."
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t dark:border-stone-800 pt-4 mt-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="seoTitle" className="text-black dark:text-white">SEO Title</Label>
                                        <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} placeholder="Meta title..." className="text-black dark:text-white" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="seoKeywords" className="text-black dark:text-white">SEO Keywords</Label>
                                        <Input id="seoKeywords" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="keywords, separated, by, commas" className="text-black dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="seoDescription" className="text-black dark:text-white">SEO Meta Description</Label>
                                    <Input id="seoDescription" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} placeholder="Meta description..." className="text-black dark:text-white" />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter className="p-6 pt-4 border-t dark:border-stone-800 bg-white dark:bg-stone-900">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-black dark:text-white" disabled={isSubmitting}>Cancel</Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : "Save listing"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListingsPage;
