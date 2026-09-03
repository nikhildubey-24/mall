"use client";

import { Fragment, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Pencil,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  interestedIn: string;
  contactMethod: string;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "follow_up", label: "Follow-up" },
  { value: "interested", label: "Interested" },
  { value: "closed", label: "Closed" },
] as const;

const STATUS_BADGE: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-amber-100 text-amber-700 border-amber-200",
  follow_up: "bg-purple-100 text-purple-700 border-purple-200",
  interested: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
};

const INTEREST_OPTIONS = [
  "Commercial Shop",
  "Office Space",
  "Food Court / Restaurant",
  "Retail Kiosk",
  "Other",
] as const;

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function EnquiryTable({
  initialData,
  initialTotal,
}: {
  initialData: Enquiry[];
  initialTotal: number;
}) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialData);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [interestFilter, setInterestFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editEnquiry, setEditEnquiry] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [deleteEnquiry, setDeleteEnquiry] = useState<Enquiry | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doFetch = useCallback(async (s: string, st: string, int: string, p: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (st && st !== "all") params.set("status", st);
    params.set("page", String(p));
    params.set("pageSize", "20");

    try {
      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        let filtered = data.enquiries as Enquiry[];
        if (int && int !== "all") {
          filtered = filtered.filter((e: Enquiry) => e.interestedIn === int);
        }
        setEnquiries(filtered);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      void doFetch(value, statusFilter, interestFilter, 1);
    }, 400);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
    void doFetch(search, value, interestFilter, 1);
  };

  const handleInterestFilterChange = (value: string) => {
    setInterestFilter(value);
    setPage(1);
    void doFetch(search, statusFilter, value, 1);
  };

  const handleInlineStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        toast.success("Status updated");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleSaveNotes = async () => {
    if (!editEnquiry) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${editEnquiry.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: editNotes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === editEnquiry.id ? { ...e, adminNotes: updated.adminNotes } : e))
        );
        setEditEnquiry(null);
        toast.success("Notes saved");
      } else {
        toast.error("Failed to save notes");
      }
    } catch {
      toast.error("Failed to save notes");
    }
  };

  const handleDelete = async () => {
    if (!deleteEnquiry) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${deleteEnquiry.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== deleteEnquiry.id));
        setTotal((prev) => prev - 1);
        setDeleteEnquiry(null);
        toast.success("Enquiry deleted");
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
          {search && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={interestFilter} onValueChange={handleInterestFilterChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Interest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Interests</SelectItem>
            {INTEREST_OPTIONS.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead>Interested In</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                  <Loader2 className="mx-auto mb-2 size-5 animate-spin" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : enquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                  No enquiries found.
                </TableCell>
              </TableRow>
            ) : (
              enquiries.map((enquiry) => (
                <Fragment key={enquiry.id}>
                  <TableRow
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === enquiry.id ? null : enquiry.id)
                    }
                  >
                    <TableCell>
                      <ChevronDown
                        className={cn(
                          "size-4 text-muted-foreground transition-transform",
                          expandedId === enquiry.id && "rotate-180"
                        )}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>{enquiry.phone}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {enquiry.email || <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>{enquiry.interestedIn}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Select
                        value={enquiry.status}
                        onValueChange={(val) => handleInlineStatusChange(enquiry.id, val)}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-7 w-[130px] text-xs border-none bg-transparent",
                            STATUS_BADGE[enquiry.status]
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(enquiry.createdAt)}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => {
                            setEditEnquiry(enquiry);
                            setEditNotes(enquiry.adminNotes || "");
                          }}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7 text-destructive hover:text-destructive"
                          onClick={() => setDeleteEnquiry(enquiry)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === enquiry.id && (
                    <TableRow key={`${enquiry.id}-expanded`}>
                      <TableCell colSpan={8} className="bg-muted/30 px-12 py-4">
                        <div className="grid gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <span className="font-medium text-muted-foreground">Contact Method:</span>{" "}
                            {enquiry.contactMethod}
                          </div>
                          <div>
                            <span className="font-medium text-muted-foreground">Email:</span>{" "}
                            {enquiry.email || "—"}
                          </div>
                          <div className="sm:col-span-2">
                            <span className="font-medium text-muted-foreground">Message:</span>{" "}
                            {enquiry.message || "—"}
                          </div>
                          {enquiry.adminNotes && (
                            <div className="sm:col-span-2">
                              <span className="font-medium text-muted-foreground">Admin Notes:</span>{" "}
                              {enquiry.adminNotes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {enquiries.length === 0 ? 0 : (page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, total)} of {total}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => {
              const prev = page - 1;
              setPage(prev);
              void doFetch(search, statusFilter, interestFilter, prev);
            }}
          >
            <ChevronLeft className="size-4" /> Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => {
              const next = page + 1;
              setPage(next);
              void doFetch(search, statusFilter, interestFilter, next);
            }}
          >
            Next <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Edit Notes Dialog */}
      <Dialog open={!!editEnquiry} onOpenChange={(open) => !open && setEditEnquiry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Notes</DialogTitle>
            <DialogDescription>
              Add or edit notes for {editEnquiry?.name}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            rows={5}
            placeholder="Add internal notes about this enquiry..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEnquiry(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteEnquiry} onOpenChange={(open) => !open && setDeleteEnquiry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Enquiry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the enquiry from <strong>{deleteEnquiry?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteEnquiry(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
