import "./globals.css";
import { Inter } from "next/font/google";
import MyNavBar from "@/components/MyNavBar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Manraj Portfolio",
  description: "Next.js portfolio lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MyNavBar />
        <main className="min-h-screen bg-background text-foreground">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}