import { inquiries } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InquiryTable } from "@/components/inquiry-table";
import { Users, UserCheck, UserPlus } from "lucide-react";

export default function InquiriesPage() {
  const total = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;
  const enrolledCount = inquiries.filter((i) => i.status === "Enrolled").length;

  const stats = [
    {
      label: "Total Inquiries",
      value: total,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "New",
      value: newCount,
      icon: UserPlus,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Contacted",
      value: contactedCount,
      icon: UserCheck,
      color: "bg-amber-100 text-amber-600",
    },
    {
      label: "Enrolled",
      value: enrolledCount,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Inquiries
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage and track all incoming inquiries from parents and students.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            All Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InquiryTable inquiries={inquiries} />
        </CardContent>
      </Card>
    </div>
  );
}
