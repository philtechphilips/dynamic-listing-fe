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
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    RefreshCw,
} from "lucide-react";
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

const initialNewsItems = [
    {
        id: "1",
        title: "10 Tips for First-Time Home Buyers",
        author: "Admin",
        date: "Jan 15, 2026",
        status: "Published",
        excerpt: "Essential advice for navigating the housing market...",
        content: "Full article content goes here with more details about the housing market.",
    },
    {
        id: "2",
        title: "Best Seafood Spots in the City",
        author: "Chef John",
        date: "Jan 20, 2026",
        status: "Draft",
        excerpt: "Discover the hidden gems of the local seafood scene...",
        content: "Detailed reviews of top-rated seafood restaurants.",
    },
    {
        id: "3",
        title: "Market Trends for Q1 2026",
        author: "Analyst Sara",
        date: "Jan 22, 2026",
        status: "Review",
        excerpt: "What to expect from the economy in the coming months...",
        content: "A deep dive into economic indicators and forecasts.",
    },
];

const NewsPage = () => {
    const [items, setItems] = useState(initialNewsItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        status: "Draft",
        excerpt: "",
        content: "",
        featured_image: ""
    });

    const handleOpenModal = (item: any = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                author: item.author,
                status: item.status,
                excerpt: item.excerpt || "",
                content: item.content || "",
                featured_image: item.featured_image || ""
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: "",
                author: "",
                status: "Draft",
                excerpt: "",
                content: "",
                featured_image: ""
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
                ...formData,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
            setItems([...items, newItem]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this news article?")) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const handleStatusChange = (id: string) => {
        setItems(items.map(i => {
            if (i.id === id) {
                const statuses = ["Draft", "Review", "Published"];
                const currentIndex = statuses.indexOf(i.status);
                const nextIndex = (currentIndex + 1) % statuses.length;
                return { ...i, status: statuses[nextIndex] };
            }
            return i;
        }));
    };

    return (
        <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">News</h1>
                    <p className="text-muted-foreground">
                        Manage your latest news articles and announcements.
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> New Article
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search news..." className="pl-8 text-black dark:text-white" />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((news) => (
                            <TableRow key={news.id}>
                                <TableCell className="font-medium text-black dark:text-white">{news.title}</TableCell>
                                <TableCell className="text-black dark:text-white">{news.author}</TableCell>
                                <TableCell className="text-black dark:text-white">{news.date}</TableCell>
                                <TableCell>
                                    <Badge variant={news.status === "Published" ? "default" : news.status === "Review" ? "secondary" : "outline"}>
                                        {news.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleStatusChange(news.id)}
                                            title="Change Status"
                                        >
                                            <RefreshCw className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleOpenModal(news)}
                                            title="Edit"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(news.id)}
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

            {/* CREATE/EDIT MODAL */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 bg-white dark:bg-stone-900 overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-black dark:text-white">{editingItem ? "Edit News" : "Create News"}</DialogTitle>
                        <DialogDescription className="text-stone-500">
                            {editingItem ? "Update the details of your news article below." : "Fill in the details to create a new news article."}
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="flex-1 min-h-0 px-6">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title" className="text-black dark:text-white">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Article title"
                                    className="text-black dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="author" className="text-black dark:text-white">Author</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Author name"
                                        className="text-black dark:text-white"
                                    />
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
                                        <option value="Review">Review</option>
                                        <option value="Published">Published</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="featured_image" className="text-black dark:text-white">Featured Image URL</Label>
                                <Input
                                    id="featured_image"
                                    value={formData.featured_image}
                                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="text-black dark:text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="excerpt" className="text-black dark:text-white">Excerpt (Short Summary)</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Enter a brief summary of the article..."
                                    className="text-black dark:text-white"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content" className="text-black dark:text-white">Main Content</Label>
                                <Textarea
                                    id="content"
                                    className="min-h-[200px] text-black dark:text-white"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write the full article content here..."
                                />
                            </div>
                        </div>
                    </ScrollArea>
                    <DialogFooter className="p-6 pt-4 border-t bg-white dark:bg-stone-900">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-black dark:text-white">Cancel</Button>
                        <Button onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewsPage;
