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

interface FloorPlan {
  id: string;
  floorName: string;
  title: string;
  description: string | null;
  image: string;
  createdAt: string;
}

const EMPTY_FORM = { floorName: "", title: "", description: "", image: "" };

export default function FloorPlansPage() {
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FloorPlan | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchFloorPlans = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/floor-plans");
      if (res.ok) {
        const data = await res.json();
        setFloorPlans(data.floorPlans);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFloorPlans();
  }, [fetchFloorPlans]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  }

  function openEdit(fp: FloorPlan) {
    setEditing(fp);
    setForm({
      floorName: fp.floorName,
      title: fp.title,
      description: fp.description ?? "",
      image: fp.image,
    });
    setDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload: Record<string, string> = {
      floorName: form.floorName,
      title: form.title,
      description: form.description,
      image: form.image,
    };

    try {
      const url = editing
        ? `/api/admin/floor-plans/${editing.id}`
        : "/api/admin/floor-plans";
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

      toast.success(editing ? "Floor plan updated" : "Floor plan created");
      setDialogOpen(false);
      fetchFloorPlans();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/floor-plans/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Floor plan deleted");
        fetchFloorPlans();
      } else {
        const data = await res.json();
        toast.error(data.error || "Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Floor Plans</h1>
          <p className="text-sm text-muted-foreground">
            Manage floor plan images and details.
          </p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="mr-2 size-4" />
          Add Floor Plan
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : floorPlans.length === 0 ? (
        <p className="text-sm text-muted-foreground">No floor plans yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {floorPlans.map((fp) => (
            <Card key={fp.id} className="overflow-hidden">
              <div className="aspect-video bg-muted relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fp.image}
                  alt={fp.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{fp.floorName}</Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => openEdit(fp)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8 text-destructive">
                          <Trash2 className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete floor plan?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete &ldquo;{fp.title}&rdquo;.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(fp.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="font-medium">{fp.title}</p>
                {fp.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {fp.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Floor Plan" : "Add Floor Plan"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the floor plan details below."
                : "Fill in the details and provide an image URL for the new floor plan."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="floorName">Floor Name *</Label>
              <Input
                id="floorName"
                value={form.floorName}
                onChange={(e) => setForm((f) => ({ ...f, floorName: e.target.value }))}
                placeholder="e.g. Ground Floor"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Retail Spaces Layout"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Optional description"
                rows={3}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://example.com/floor-plan.jpg"
                required
              />
              {form.image && (
                <div className="mt-1 relative w-32 h-20 rounded overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={saving || !form.image}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
