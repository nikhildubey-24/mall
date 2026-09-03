"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PortfolioItem {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string | null;
  imageUrl: string | null;
  websiteUrl: string | null;
  status: string;
  createdAt: string;
}

const CATEGORIES = [
  "Waterpark / Entertainment",
  "Family Salon / Beauty",
  "Food & Beverage",
  "Commercial Complex",
  "Adventure / Recreation",
];

interface FormState {
  name: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  status: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  category: CATEGORIES[0],
  location: "",
  description: "",
  imageUrl: "",
  websiteUrl: "",
  status: "active",
};

export default function PortfolioManagementPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [customCategory, setCustomCategory] = useState("");
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "All") {
        params.set("status", statusFilter.toLowerCase());
      }
      const qs = params.toString();
      const res = await fetch(`/api/admin/portfolio${qs ? `?${qs}` : ""}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
      }
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setCustomCategory("");
    setUseCustomCategory(false);
    setDialogOpen(true);
  }

  function openEdit(item: PortfolioItem) {
    setEditing(item);
    const isCustom = !CATEGORIES.includes(item.category);
    setUseCustomCategory(isCustom);
    setCustomCategory(isCustom ? item.category : "");
    setForm({
      name: item.name,
      category: isCustom ? "" : item.category,
      location: item.location,
      description: item.description ?? "",
      imageUrl: item.imageUrl ?? "",
      websiteUrl: item.websiteUrl ?? "",
      status: item.status,
    });
    setDialogOpen(true);
  }

  const effectiveCategory = useCustomCategory ? customCategory : form.category;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      category: effectiveCategory,
      location: form.location,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      websiteUrl: form.websiteUrl || null,
      status: form.status,
    };

    try {
      const url = editing
        ? `/api/admin/portfolio/${editing.id}`
        : "/api/admin/portfolio";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Save failed");
        return;
      }

      toast.success(editing ? "Item updated" : "Item created");
      setDialogOpen(false);
      fetchItems();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Item deleted");
        fetchItems();
      } else {
        const data = await res.json();
        toast.error(data.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  }

  const filtered = items.filter((item) =>
    search
      ? item.name.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Portfolio Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage portfolio items, categories, and images.
          </p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="mr-2 size-4" />
          Add Item
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-2">
          {["All", "Active", "Inactive"].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No portfolio items found.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {item.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No image
                  </div>
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge
                    variant="default"
                    className={
                      item.status === "active"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-400 text-white"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4 flex flex-col gap-1">
                <p className="font-medium line-clamp-1">{item.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {item.location}
                </p>
                {item.websiteUrl && (
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline truncate"
                  >
                    {item.websiteUrl}
                  </a>
                )}
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(item)}
                  >
                    <Pencil className="mr-1 size-3" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                      >
                        <Trash2 className="mr-1 size-3" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete portfolio item?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete &ldquo;{item.name}&rdquo;
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Portfolio Item" : "Add Portfolio Item"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the item details below."
                : "Fill in the details and optionally provide an image URL."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Wave Pool Complex"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category *</Label>
              {!useCustomCategory ? (
                <div className="flex gap-2">
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, category: v }))
                    }
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUseCustomCategory(true);
                      setCustomCategory(form.category);
                    }}
                  >
                    Custom
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUseCustomCategory(false);
                      setForm((f) => ({
                        ...f,
                        category: CATEGORIES[0],
                      }));
                    }}
                  >
                    Preset
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="e.g. Level 2, East Wing"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Optional description..."
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://example.com/image.jpg"
              />
              {form.imageUrl && (
                <div className="mt-1 relative w-32 h-20 rounded overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                value={form.websiteUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, websiteUrl: e.target.value }))
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  saving ||
                  !form.name.trim() ||
                  !form.location.trim() ||
                  (useCustomCategory
                    ? !customCategory.trim()
                    : !form.category)
                }
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
