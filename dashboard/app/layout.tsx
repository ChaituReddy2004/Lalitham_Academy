import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { DashboardShell } from "@/components/dashboard-shell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lalitham Academy Dashboard",
  description: "Admin dashboard for Lalitham Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
