"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MonthlyData } from "@/lib/data";

interface EnrollmentChartProps {
  data: MonthlyData[];
}

export function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
        />
        <Bar dataKey="basic" name="Basic" fill="#7C3AED" radius={[4, 4, 0, 0]} />
        <Bar dataKey="advanced" name="Advanced" fill="#9333EA" radius={[4, 4, 0, 0]} />
        <Bar dataKey="oneToOne" name="One-to-One" fill="#22C55E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
