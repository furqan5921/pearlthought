import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Teacher Management System",
  description: "A modern, responsive teacher management interface built with Next.js, TypeScript, and Tailwind CSS",
  keywords: ["teacher", "management", "education", "dashboard", "nextjs", "typescript"],
  authors: [{ name: "Mohammad Furqan" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
