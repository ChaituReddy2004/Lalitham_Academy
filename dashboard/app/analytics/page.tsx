"use client";

import { monthlyEnrollments, courses } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Revenue calculation per month
// Basic: count × 499, Advanced: count × avg(1300), One-to-One: count × avg(2800)
const revenueData = monthlyEnrollments.map((m) => ({
  month: m.month,
  revenue: m.basic * 499 + m.advanced * 1300 + m.oneToOne * 2800,
  basic: m.basic * 499,
  advanced: m.advanced * 1300,
  oneToOne: m.oneToOne * 2800,
}));

// Plan distribution (latest month totals)
const latest = monthlyEnrollments[monthlyEnrollments.length - 1];
const pieData = [
  { name: "Basic", value: latest.basic, color: "#7C3AED" },
  { name: "Advanced", value: latest.advanced, color: "#9333EA" },
  { name: "One-to-One", value: latest.oneToOne, color: "#22C55E" },
];

// Top courses sorted by enrollments
const topCourses = [...courses]
  .sort((a, b) => b.enrollments - a.enrollments)
  .slice(0, 10);

const maxEnrollment = Math.max(...topCourses.map((c) => c.enrollments));

const planColors: Record<string, string> = {
  Basic: "bg-blue-500",
  Advanced: "bg-purple-500",
  "One-to-One": "bg-amber-500",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Analytics
        </h2>
        <p className="mt-1 text-muted-foreground">
          Insights into enrollment trends, revenue, and course performance.
        </p>
      </div>

      {/* Revenue trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Revenue Trend (Jun – Nov 2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={revenueData}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revBasic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revAdvanced" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revOneToOne" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, undefined]}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Area
                type="monotone"
                dataKey="basic"
                name="Basic"
                stroke="#7C3AED"
                fill="url(#revBasic)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="advanced"
                name="Advanced"
                stroke="#9333EA"
                fill="url(#revAdvanced)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="oneToOne"
                name="One-to-One"
                stroke="#22C55E"
                fill="url(#revOneToOne)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie + top courses */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Plan distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Enrollment Distribution (Nov 2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center gap-4">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top courses by enrollment */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Top 10 Courses by Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCourses.map((course, index) => {
                const pct = Math.round((course.enrollments / maxEnrollment) * 100);
                return (
                  <div key={course.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-foreground truncate">
                        <span className="text-xs text-muted-foreground w-4 shrink-0">
                          {index + 1}.
                        </span>
                        {course.name}
                      </span>
                      <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                        {course.enrollments}
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${planColors[course.plan]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
