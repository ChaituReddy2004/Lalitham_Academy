import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Mail, MessageCircle, Sun, Moon, Monitor } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your academy profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                LA
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">
                Lalitham Academy Admin
              </p>
              <p className="text-sm text-muted-foreground">Administrator</p>
              <Button variant="outline" size="sm" className="mt-2">
                Change Avatar
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                defaultValue="Lalitham Academy Admin"
                placeholder="Enter full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue="admin@lalithamacademy.com"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+91 98765 43210"
                placeholder="Enter phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="academy-name">Academy Name</Label>
              <Input
                id="academy-name"
                defaultValue="Lalitham Academy"
                placeholder="Academy name"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose how you receive notifications for new inquiries.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              icon: Mail,
              label: "Email Notifications",
              description: "Receive new inquiry alerts via email",
              enabled: true,
            },
            {
              icon: MessageCircle,
              label: "WhatsApp Notifications",
              description: "Get instant alerts on WhatsApp for new inquiries",
              enabled: true,
            },
            {
              icon: Bell,
              label: "Browser Notifications",
              description: "Show desktop push notifications",
              enabled: false,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Visual toggle — static */}
                <div
                  className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                    item.enabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      item.enabled ? "left-5" : "left-0.5"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Sun, label: "Light", value: "light" },
                { icon: Moon, label: "Dark", value: "dark" },
                { icon: Monitor, label: "System", value: "system" },
              ].map((theme) => {
                const Icon = theme.icon;
                const isActive = theme.value === "light";
                return (
                  <button
                    key={theme.value}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-background text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
