"use client";

import { useEffect, useState, useCallback } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ReraData {
  registrationNumber: string;
  registrationDate: string;
  validUntil: string;
  verificationUrl: string;
  project: { name: string; promoter: string } | null;
}

interface ProjectData {
  name: string;
  tagline: string | null;
  promoter: string;
  status: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [rera, setRera] = useState<ReraData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setRera(data.rera);
        setProject(data.project);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function updateField(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      for (const key of ["phone", "whatsapp", "email", "address", "map_url"]) {
        payload[key] = settings[key] ?? "";
      }

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: payload }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Save failed");
        return;
      }

      toast.success("Settings saved successfully");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage site contact information and view project details.
          </p>
        </div>
        <Button size="sm" onClick={handleSave} disabled={saving}>
          <Save className="mr-2 size-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Info</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={settings.phone ?? ""}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+91 12345 67890"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={settings.whatsapp ?? ""}
                onChange={(e) => updateField("whatsapp", e.target.value)}
                placeholder="+91 12345 67890"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={settings.email ?? ""}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="info@acropolisthemall.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Address & Location */}
      <Card>
        <CardHeader>
          <CardTitle>Address & Location</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={settings.address ?? ""}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Full address"
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="map_url">Google Maps Embed URL</Label>
            <Input
              id="map_url"
              value={settings.map_url ?? ""}
              onChange={(e) => updateField("map_url", e.target.value)}
              placeholder="https://www.google.com/maps/embed?..."
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Project Overview */}
      {project && (
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Name</dt>
                <dd className="text-sm">{project.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Promoter</dt>
                <dd className="text-sm">{project.promoter}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Tagline</dt>
                <dd className="text-sm">{project.tagline || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Status</dt>
                <dd className="text-sm capitalize">{project.status}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}

      {/* RERA Registration */}
      {rera && (
        <Card>
          <CardHeader>
            <CardTitle>RERA Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Registration Number
                </dt>
                <dd className="text-sm">{rera.registrationNumber}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Promoter</dt>
                <dd className="text-sm">{rera.project?.name ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">
                  Registration Date
                </dt>
                <dd className="text-sm">
                  {new Date(rera.registrationDate).toLocaleDateString("en-IN")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted-foreground">Valid Until</dt>
                <dd className="text-sm">
                  {new Date(rera.validUntil).toLocaleDateString("en-IN")}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium text-muted-foreground">
                  Verification URL
                </dt>
                <dd className="text-sm">
                  <a
                    href={rera.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    {rera.verificationUrl}
                  </a>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
