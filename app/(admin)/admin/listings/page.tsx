"use client";

import { useState } from "react";
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
import { Search, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
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

// Predefined categories based on the website content
const CATEGORIES = [
    "Real Estate",
    "Restaurant",
    "Fine Dining",
    "Fusion",
    "Seafood",
    "Vegan",
    "Barbecue",
    "Animation",
    "Crime Drama",
    "Romance",
    "Historical Drama",
    "Electrical Services",
    "Hotels",
    "Gyms & Fitness",
    "Salons & Spas",
    "Plumbing Services",
    "Adventure",
    "Auto Services"
];

const initialListings = [
    {
        id: "1",
        title: "Cozy Garden Villa",
        slug: "cozy-garden-villa",
        category: "Real Estate",
        location: "Makati",
        price_range: "$$$",
        status: "Published",
        featured_image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        address: "123 Green Ave, Makati",
        rating: 4.5,
        review_count: 12,
    },
    {
        id: "2",
        title: "The Golden Fork",
        slug: "the-golden-fork",
        category: "Restaurant",
        location: "Taguig",
        price_range: "$$$$",
        status: "Draft",
        featured_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        address: "BGC High Street, Taguig",
        rating: 4.8,
        review_count: 85,
    },
];

const ListingsPage = () => {
    const [items, setItems] = useState(initialListings);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: CATEGORIES[0],
        location: "",
        address: "",
        price_range: "$$",
        status: "Draft",
        excerpt: "",
        content: "",
        featured_image: "",
        phone: "",
        email: "",
        website: "",
        opening_hours: "",
        google_map_url: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        rating: 0,
        review_count: 0
    });

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || "",
                slug: item.slug || "",
                category: item.category || CATEGORIES[0],
                location: item.location || "",
                address: item.address || "",
                price_range: item.price_range || "$$",
                status: item.status || "Draft",
                excerpt: item.excerpt || "",
                content: item.content || "",
                featured_image: item.featured_image || "",
                phone: item.phone || "",
                email: item.email || "",
                website: item.website || "",
                opening_hours: item.opening_hours || "",
                google_map_url: item.google_map_url || "",
                seo_title: item.seo_title || "",
                seo_description: item.seo_description || "",
                seo_keywords: item.seo_keywords || "",
                rating: item.rating || 0,
                review_count: item.review_count || 0
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                slug: "",
                category: CATEGORIES[0],
                location: "",
                address: "",
                price_range: "$$",
                status: "Draft",
                excerpt: "",
                content: "",
                featured_image: "",
                phone: "",
                email: "",
                website: "",
                opening_hours: "",
                google_map_url: "",
                seo_title: "",
                seo_description: "",
                seo_keywords: "",
                rating: 0,
                review_count: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (editingItem) {
            setItems(items.map(i => i.id === editingItem.id ? { ...i, ...formData } : i));
        } else {
            const newItem = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData
            };
            setItems([...items, newItem]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this listing?")) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const handleStatusToggle = (id: string) => {
        setItems(items.map(i => {
            if (i.id === id) {
                return { ...i, status: i.status === "Published" ? "Draft" : "Published" };
            }
            return i;
        }));
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
                        {items.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col text-black dark:text-white">
                                        <span>{listing.title}</span>
                                        <span className="text-xs text-muted-foreground font-normal">/{listing.slug}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-black dark:text-white">{listing.category}</TableCell>
                                <TableCell className="text-black dark:text-white">{listing.location}</TableCell>
                                <TableCell className="text-black dark:text-white">{listing.price_range}</TableCell>
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
                                            onClick={() => handleStatusToggle(listing.id)}
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
                        ))}
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
                                    <Label htmlFor="title" className="text-black dark:text-white">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => updateTitle(e.target.value)}
                                        placeholder="e.g. The Grand Hotel"
                                        className="text-black dark:text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slug" className="text-black dark:text-white">Slug (Auto-generated)</Label>
                                    <Input id="slug" value={formData.slug} readOnly className="bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono text-xs" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-black dark:text-white">Category</Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="location" className="text-black dark:text-white">General Location (Area/City)</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. Makati"
                                        className="text-black dark:text-white"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-black dark:text-white">Full Address</Label>
                                    <Input
                                        id="address"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="123 Street Name, City, Country"
                                        className="text-black dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price_range" className="text-black dark:text-white">Price Range</Label>
                                        <select
                                            id="price_range"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                            value={formData.price_range}
                                            onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
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
                                    <Label htmlFor="featured_image" className="text-black dark:text-white">Featured Image URL</Label>
                                    <Input
                                        id="featured_image"
                                        value={formData.featured_image}
                                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                        placeholder="https://..."
                                        className="text-black dark:text-white"
                                    />
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
                                    <Label htmlFor="opening_hours" className="text-black dark:text-white">Opening Hours</Label>
                                    <Input id="opening_hours" value={formData.opening_hours} onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })} placeholder="Mon-Fri: 9am-6pm" className="text-black dark:text-white" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="google_map_url" className="text-black dark:text-white">Google Map Embed URL</Label>
                                    <Input id="google_map_url" value={formData.google_map_url} onChange={(e) => setFormData({ ...formData, google_map_url: e.target.value })} placeholder="https://www.google.com/maps/embed?..." className="text-black dark:text-white" />
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
                                        <Label htmlFor="seo_title" className="text-black dark:text-white">SEO Title</Label>
                                        <Input id="seo_title" value={formData.seo_title} onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })} placeholder="Meta title..." className="text-black dark:text-white" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="seo_keywords" className="text-black dark:text-white">SEO Keywords</Label>
                                        <Input id="seo_keywords" value={formData.seo_keywords} onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })} placeholder="keywords, separated, by, commas" className="text-black dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="seo_description" className="text-black dark:text-white">SEO Meta Description</Label>
                                    <Input id="seo_description" value={formData.seo_description} onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })} placeholder="Meta description..." className="text-black dark:text-white" />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter className="p-6 pt-4 border-t dark:border-stone-800 bg-white dark:bg-stone-900">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-black dark:text-white">Cancel</Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Save listing</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListingsPage;
