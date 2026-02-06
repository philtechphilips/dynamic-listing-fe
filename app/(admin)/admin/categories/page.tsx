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
import { Search, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiFetch, getAuthHeaders, API_URL } from "@/lib/api";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: "", description: "", sortOrder: 0 });
    const [searchQuery, setSearchQuery] = useState("");
    const { toast } = useToast();

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await apiFetch(`/categories`);
            if (!response.ok) throw new Error("Failed to fetch categories");
            const data = await response.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast({
                title: "Error",
                description: "Failed to load categories",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleOpenModal = (category: Category | null = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                description: category.description || "",
                sortOrder: category.sortOrder ?? 0,
            });
        } else {
            setEditingCategory(null);
            const nextOrder = categories.length > 0
                ? Math.max(...categories.map((c) => c.sortOrder ?? 0)) + 1
                : 0;
            setFormData({ name: "", description: "", sortOrder: nextOrder });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name.trim()) {
            toast({
                title: "Validation Error",
                description: "Category name is required",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const url = editingCategory
                ? `/admin/categories/${editingCategory.id}`
                : `/admin/categories`;

            const method = editingCategory ? "PUT" : "POST";

            const payload = {
                name: formData.name,
                description: formData.description,
                sortOrder: Number(formData.sortOrder) || 0,
            };
            const response = await apiFetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to save category");
            }

            toast({
                title: "Success",
                description: editingCategory
                    ? "Category updated successfully"
                    : "Category created successfully",
            });

            setIsModalOpen(false);
            fetchCategories();
        } catch (error: any) {
            console.error("Error saving category:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save category",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (category: Category) => {
        if (!confirm(`Are you sure you want to delete the category "${category.name}"? This may affect listings in this category.`)) {
            return;
        }

        try {
            const response = await apiFetch(`/admin/categories/${category.id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete category");
            }

            toast({
                title: "Success",
                description: "Category deleted successfully",
            });

            fetchCategories();
        } catch (error: any) {
            console.error("Error deleting category:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to delete category",
                variant: "destructive",
            });
        }
    };

    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-6 flex flex-col">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">
                        Manage product/service categories for your listings.
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-24">Order</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="max-w-[300px]">Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Loading categories...</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    {searchQuery ? "No categories found matching your search" : "No categories yet. Create your first one!"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCategories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-mono text-muted-foreground">
                                        {category.sortOrder ?? 0}
                                    </TableCell>
                                    <TableCell className="font-medium">{category.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono text-[10px]">
                                            {category.slug}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate text-muted-foreground">
                                        {category.description || "No description"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenModal(category)}
                                                title="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(category)}
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
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? "Update the details for this category."
                                : "Create a new category for the listings."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Electronics, Real Estate"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="sortOrder">Sort Order / Priority</Label>
                            <Input
                                id="sortOrder"
                                type="number"
                                min={0}
                                value={formData.sortOrder}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        sortOrder: parseInt(e.target.value, 10) || 0,
                                    })
                                }
                                placeholder="0"
                                disabled={isSubmitting}
                            />
                            <p className="text-xs text-muted-foreground">
                                Lower numbers appear first on the homepage and in the navigation menu.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Briefly describe what this category includes..."
                                disabled={isSubmitting}
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {editingCategory ? "Saving..." : "Creating..."}
                                </>
                            ) : editingCategory ? (
                                "Save Changes"
                            ) : (
                                "Create Category"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoriesPage;
