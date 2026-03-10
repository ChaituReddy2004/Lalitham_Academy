import { courses } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursesTable } from "@/components/courses-table";
import { BookOpen } from "lucide-react";

export default function CoursesPage() {
  const basicCount = courses.filter((c) => c.plan === "Basic").length;
  const advancedCount = courses.filter((c) => c.plan === "Advanced").length;
  const oneToOneCount = courses.filter((c) => c.plan === "One-to-One").length;

  const planSummary = [
    {
      label: "Basic Plan",
      count: basicCount,
      description: "₹499/batch",
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Advanced Plan",
      count: advancedCount,
      description: "₹899–₹1,500/month",
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "One-to-One",
      count: oneToOneCount,
      description: "₹2,500–₹3,000/month",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Courses
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage all {courses.length} courses offered at Lalitham Academy.
        </p>
      </div>

      {/* Plan summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {planSummary.map((plan) => (
          <Card key={plan.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`rounded-xl p-2.5 ${plan.color}`}>
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {plan.label}
                </p>
                <p className="text-2xl font-bold">{plan.count}</p>
                <p className="text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Courses table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <CoursesTable courses={courses} />
        </CardContent>
      </Card>
    </div>
  );
}
