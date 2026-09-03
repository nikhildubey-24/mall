"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface GalleryImage {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  createdAt: string;
}

const CATEGORIES = [
  "Project",
  "Floor Plans",
  "Architecture",
  "Commercial Spaces",
  "Location",
  "Portfolio",
];

const EMPTY_FORM = { category: "", title: "", altText: "", imageUrl: "" };

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fetchImages = useCallback(async () => {
    try {
      const query = filter === "All" ? "" : `?category=${encodeURIComponent(filter)}`;
      const res = await fetch(`/api/admin/gallery${query}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data.images);
      }
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function openAdd() {
    setEditing(null);
    setForm({ ...EMPTY_FORM, category: CATEGORIES[0] });
    setDialogOpen(true);
  }

  function openEdit(img: GalleryImage) {
    setEditing(img);
    setForm({
      category: img.category,
      title: img.title,
      altText: img.altText,
      imageUrl: img.imageUrl,
    });
    setDialogOpen(true);
  }

  async function handleFileUpload(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload?folder=gallery", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Upload failed");
        return null;
      }
      const data = await res.json();
      return data.url;
    } catch {
      toast.error("Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      category: form.category,
      title: form.title,
      altText: form.altText,
      imageUrl: form.imageUrl,
    };

    try {
      const url = editing
        ? `/api/admin/gallery/${editing.id}`
        : "/api/admin/gallery";
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

      toast.success(editing ? "Image updated" : "Image added");
      setDialogOpen(false);
      fetchImages();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Image deleted");
        fetchImages();
      } else {
        const data = await res.json();
        toast.error(data.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  }

  async function handleReorder(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    const reordered = [...images];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    const newOrder = reordered.map((img, i) => ({ id: img.id, sortOrder: i }));
    setImages(reordered);

    try {
      const res = await fetch("/api/admin/gallery/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newOrder }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Reorder failed");
        fetchImages();
      } else {
        toast.success("Order updated");
      }
    } catch {
      toast.error("Reorder failed");
      fetchImages();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gallery Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage gallery images, categories, and ordering.
          </p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="mr-2 size-4" />
          Add Image
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-sm text-muted-foreground">No images in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, index) => (
            <Card
              key={img.id}
              draggable
              onDragStart={() => {
                dragIndex.current = index;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverIndex(index);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverIndex(null);
                const from = dragIndex.current;
                dragIndex.current = null;
                if (from !== null) handleReorder(from, index);
              }}
              onDragEnd={() => {
                dragIndex.current = null;
                setDragOverIndex(null);
              }}
              className={`overflow-hidden cursor-grab active:cursor-grabbing ${
                dragOverIndex === index ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="aspect-video bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageUrl}
                  alt={img.altText}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge variant="secondary">{img.category}</Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8"
                    title="Drag to reorder"
                  >
                    <GripVertical className="size-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-8"
                    onClick={() => openEdit(img)}
                    title="Edit"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-8 text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete image?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete &ldquo;{img.title}&rdquo;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleDelete(img.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardContent className="p-4 flex flex-col gap-1">
                <p className="font-medium line-clamp-1">{img.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{img.altText}</p>
                <p className="text-xs text-muted-foreground">Order: {img.sortOrder}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the image details below."
                : "Fill in the details and upload an image for the gallery."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger id="category">
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
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Main Atrium at Dusk"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="altText">Alt Text *</Label>
              <Input
                id="altText"
                value={form.altText}
                onChange={(e) => setForm((f) => ({ ...f, altText: e.target.value }))}
                placeholder="Descriptive text for accessibility"
                required
              />
            </div>
            {!editing && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="image">Image *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = await handleFileUpload(file);
                    if (url) setForm((f) => ({ ...f, imageUrl: url }));
                  }}
                  disabled={uploading}
                />
                {uploading && <p className="text-xs text-muted-foreground">Uploading...</p>}
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
            )}
            {editing && form.imageUrl && (
              <div className="flex flex-col gap-2">
                <Label>Current Image</Label>
                <div className="relative w-32 h-20 rounded overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" disabled={saving || uploading || !form.title || !form.altText || !form.category}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
