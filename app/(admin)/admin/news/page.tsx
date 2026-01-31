"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
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
import { Search, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Image as ImageIcon, Newspaper } from "lucide-react";
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

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
    featuredImage?: string;
    categoryId?: string;
    category?: {
        id: string;
        name: string;
    };
    status: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    createdAt: string;
}

const QUILL_MODULES = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
    ],
};

const QUILL_FORMATS = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
];

interface Category {
    id: string;
    name: string;
}

const NewsPage = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        status: "Published",
        categoryId: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        seoTitle: "",
        seoDescription: "",
        seoKeywords: "",
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
            setCategories(data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }, []);

    const fetchNews = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_URL}/news`);
            if (!response.ok) throw new Error("Failed to fetch news");
            const data = await response.json();
            setNews(data.news || []);
        } catch (error) {
            console.error("Error fetching news:", error);
            toast({
                title: "Error",
                description: "Failed to load news articles",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchNews();
        fetchCategories();
    }, [fetchNews, fetchCategories]);

    const handleOpenModal = (item: NewsItem | null = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || "",
                slug: item.slug || "",
                status: item.status || "Published",
                categoryId: item.categoryId || "",
                excerpt: item.excerpt || "",
                content: item.content || "",
                featuredImage: item.featuredImage || "",
                seoTitle: item.seoTitle || "",
                seoDescription: item.seoDescription || "",
                seoKeywords: item.seoKeywords || "",
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                slug: "",
                status: "Published",
                categoryId: "",
                excerpt: "",
                content: "",
                featuredImage: "",
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
            });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title) {
            toast({
                title: "Validation Error",
                description: "Title is required",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSend = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formDataToSend.append(key, value.toString());
                }
            });

            if (imageFile) {
                formDataToSend.append("featuredImage", imageFile);
            }

            const url = editingItem
                ? `${API_URL}/admin/news/${editingItem.id}`
                : `${API_URL}/admin/news`;

            const method = editingItem ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(true),
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save news article");
            }

            toast({
                title: "Success",
                description: `News article ${editingItem ? "updated" : "created"} successfully`,
            });

            setIsModalOpen(false);
            fetchNews();
        } catch (error) {
            console.error("Error saving news:", error);
            const errorMessage = error instanceof Error ? error.message : "Failed to save news article";
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
        if (!confirm("Are you sure you want to delete this article?")) return;

        try {
            const response = await fetch(`${API_URL}/admin/news/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) throw new Error("Failed to delete news article");

            toast({
                title: "Success",
                description: "News article deleted successfully",
            });

            fetchNews();
        } catch (error) {
            console.error("Error deleting news:", error);
            toast({
                title: "Error",
                description: "Failed to delete news article",
                variant: "destructive",
            });
        }
    };

    const handleStatusToggle = async (item: NewsItem) => {
        const newStatus = item.status === "Published" ? "Draft" : "Published";
        try {
            const response = await fetch(`${API_URL}/admin/news/${item.id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            toast({
                title: "Success",
                description: `Article ${newStatus === "Published" ? "published" : "set to draft"}`,
            });

            fetchNews();
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
                    <h1 className="text-3xl font-bold tracking-tight">News Articles</h1>
                    <p className="text-muted-foreground">
                        Manage news, updates, and featured stories.
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> New Article
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-8 text-black dark:text-white" />
                </div>
            </div>

            <div className="rounded-md border bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Loading articles...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : news.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No articles found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            news.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 dark:bg-stone-800 flex items-center justify-center border border-stone-200 dark:border-stone-700">
                                            {item.featuredImage ? (
                                                <img
                                                    src={item.featuredImage}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Newspaper className="w-5 h-5 text-stone-400" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col text-black dark:text-white">
                                            <span>{item.title}</span>
                                            <span className="text-xs text-muted-foreground font-normal">/{item.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-black dark:text-white">
                                        {item.category?.name || "Uncategorized"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === "Published" ? "default" : "outline"}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-black dark:text-white text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleStatusToggle(item)}
                                                title={item.status === "Published" ? "Unpublish" : "Publish"}
                                            >
                                                {item.status === "Published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenModal(item)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(item.id)}
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
                        <DialogTitle className="text-black dark:text-white">{editingItem ? "Edit Article" : "New Article"}</DialogTitle>
                        <DialogDescription className="text-stone-500 dark:text-stone-400">
                            Create compelling news stories for your audience.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 min-h-0 px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Content</h3>
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-black dark:text-white">Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => updateTitle(e.target.value)}
                                        placeholder="Article Headline"
                                        className="text-black dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slug" className="text-black dark:text-white">Slug (Auto-generated)</Label>
                                    <Input id="slug" value={formData.slug} readOnly className="bg-stone-100 dark:bg-stone-800 text-stone-500 font-mono text-xs" />
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
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-black dark:text-white">Category</Label>
                                    <select
                                        id="category"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring text-black dark:text-white"
                                        value={formData.categoryId}
                                        onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="excerpt" className="text-black dark:text-white">Short Excerpt (Grid View)</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        placeholder="Brief summary of the article..."
                                        className="text-black dark:text-white min-h-[100px]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Media</h3>
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
                                            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                                                <img
                                                    src={URL.createObjectURL(imageFile)}
                                                    alt="New Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : formData.featuredImage ? (
                                            <div className="relative w-full h-40 rounded-lg overflow-hidden border">
                                                <img
                                                    src={formData.featuredImage}
                                                    alt="Existing Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary">Story Content</h3>
                                <div className="grid gap-2 min-h-[300px] mb-12">
                                    <div className="bg-white dark:bg-stone-800 text-black dark:text-white rounded-md overflow-hidden border">
                                        <ReactQuill
                                            theme="snow"
                                            value={formData.content}
                                            onChange={(val) => setFormData({ ...formData, content: val })}
                                            modules={QUILL_MODULES}
                                            formats={QUILL_FORMATS}
                                            className="h-[250px]"
                                        />
                                    </div>
                                </div>

                                <h3 className="font-semibold text-xs uppercase tracking-widest text-primary pt-6 border-t border-stone-100 dark:border-stone-800">SEO Meta Tags</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="seoTitle" className="text-black dark:text-white">SEO Title</Label>
                                        <Input id="seoTitle" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} placeholder="Meta title..." className="text-black dark:text-white" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="seoKeywords" className="text-black dark:text-white">SEO Keywords</Label>
                                        <Input id="seoKeywords" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="news, updates, story" className="text-black dark:text-white" />
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
                            ) : "Save Article"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewsPage;
