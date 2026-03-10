"use client";

import { useState } from "react";
import { Search, Eye } from "lucide-react";
import { Inquiry } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface InquiryTableProps {
  inquiries: Inquiry[];
}

type StatusFilter = "All" | Inquiry["status"];

const statusFilters: StatusFilter[] = ["All", "New", "Contacted", "Enrolled", "Closed"];

const statusStyles: Record<string, string> = {
  New: "border border-blue-200 bg-blue-50 text-blue-700",
  Contacted: "border border-amber-200 bg-amber-50 text-amber-700",
  Enrolled: "border border-green-200 bg-green-50 text-green-700",
  Closed: "border border-gray-200 bg-gray-50 text-gray-600",
};

export function InquiryTable({ inquiries }: InquiryTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchesStatus =
      statusFilter === "All" || inq.status === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.courseInterested.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search + filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-1.5">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {status}
              {status !== "All" && (
                <span className="ml-1 opacity-70">
                  ({inquiries.filter((i) => i.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Course Interested</TableHead>
              <TableHead className="hidden md:table-cell">Child Grade</TableHead>
              <TableHead className="hidden lg:table-cell">Submitted At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((inq) => (
              <TableRow key={inq.id}>
                <TableCell className="font-medium">{inq.name}</TableCell>
                <TableCell className="text-muted-foreground">{inq.phone}</TableCell>
                <TableCell>{inq.courseInterested}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                  {inq.childGrade}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                  {formatDate(inq.submittedAt)}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      statusStyles[inq.status]
                    )}
                  >
                    {inq.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInquiry(inq)}
                    className="h-8 gap-1.5 text-xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-8"
                >
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail dialog */}
      <Dialog
        open={!!selectedInquiry}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              Full information for this inquiry submission.
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Name
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedInquiry.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedInquiry.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Course Interested
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedInquiry.courseInterested}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Child Grade
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {selectedInquiry.childGrade}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Submitted At
                  </p>
                  <p className="mt-1 text-sm">
                    {formatDate(selectedInquiry.submittedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Status
                  </p>
                  <div className="mt-1">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        statusStyles[selectedInquiry.status]
                      )}
                    >
                      {selectedInquiry.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Message
                </p>
                <p className="mt-1 text-sm text-foreground leading-relaxed rounded-lg bg-muted/50 p-3">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
