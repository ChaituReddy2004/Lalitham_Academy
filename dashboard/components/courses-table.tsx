"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Course, PlanType } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CoursesTableProps {
  courses: Course[];
}

type FilterPlan = "All" | PlanType;
type SortDir = "asc" | "desc";

const planStyles: Record<string, string> = {
  Basic:
    "border border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Advanced:
    "border border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
  "One-to-One":
    "border border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
};

const statusStyles: Record<string, string> = {
  Active:
    "border border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  Inactive:
    "border border-gray-200 bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

const filterTabs: FilterPlan[] = ["All", "Basic", "Advanced", "One-to-One"];

export function CoursesTable({ courses }: CoursesTableProps) {
  const [selectedPlan, setSelectedPlan] = useState<FilterPlan>("All");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered =
    selectedPlan === "All"
      ? courses
      : courses.filter((c) => c.plan === selectedPlan);

  const sorted = [...filtered].sort((a, b) =>
    sortDir === "desc"
      ? b.enrollments - a.enrollments
      : a.enrollments - b.enrollments
  );

  const toggleSort = () =>
    setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedPlan(tab)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              selectedPlan === tab
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {tab}
            {tab !== "All" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({courses.filter((c) => c.plan === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSort}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                >
                  Enrollments
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.name}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      planStyles[course.plan]
                    )}
                  >
                    {course.plan}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {course.priceLabel}
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{course.enrollments}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      statusStyles[course.status]
                    )}
                  >
                    {course.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No courses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
