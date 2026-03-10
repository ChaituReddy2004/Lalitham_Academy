import { dashboardStats, popularCourses, monthlyEnrollments } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, MessageSquare, MessageCircle } from "lucide-react";
import { EnrollmentChart } from "@/components/enrollment-chart";

const planBadgeColors: Record<string, string> = {
  Basic: "bg-blue-100 text-blue-700 border-blue-200",
  Advanced: "bg-purple-100 text-purple-700 border-purple-200",
  "One-to-One": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function DashboardPage() {
  const stats = [
    {
      label: "Total Courses",
      value: dashboardStats.totalCourses,
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600",
      change: "+2 this month",
    },
    {
      label: "Total Enrollments",
      value: dashboardStats.totalEnrollments,
      icon: Users,
      color: "bg-green-100 text-green-600",
      change: "+18 this month",
    },
    {
      label: "Demo Requests",
      value: dashboardStats.demoRequests,
      icon: MessageSquare,
      color: "bg-amber-100 text-amber-600",
      change: "+3 this week",
    },
    {
      label: "WhatsApp Inquiries",
      value: dashboardStats.whatsappInquiries,
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-600",
      change: "+12 this month",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening at Lalitham Academy.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`rounded-xl p-2.5 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and popular courses */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Enrollment chart — takes 2/3 width on large screens */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Monthly Enrollments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EnrollmentChart data={monthlyEnrollments} />
            </CardContent>
          </Card>
        </div>

        {/* Popular courses — takes 1/3 width */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Top Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {popularCourses.map((course, index) => (
                  <li key={course.id} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                      <span className="truncate text-sm font-medium text-foreground">
                        {course.name}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${
                            planBadgeColors[course.plan] ?? ""
                          }`}
                        >
                          {course.plan}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {course.enrollments}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
