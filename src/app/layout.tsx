import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { OfflineProvider } from "@/components/ui/offline-provider";
import { PointerHalo } from "@/components/ui/pointer-halo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1115" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Studio | Creative Developer & UI/UX Designer",
  description: "Portfolio of an independent creative developer and UI/UX designer blending clean architecture, high-performance WebGL, and human-centered motion.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent-soft)] selection:text-[var(--foreground)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PointerHalo />
          <OfflineProvider>
            {children}
          </OfflineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
