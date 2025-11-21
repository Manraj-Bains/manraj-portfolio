import "./globals.css";
import MyNavBar from "@/components/MyNavBar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "ManrajPortfolio",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Toaster>
          <MyNavBar />
          <main className="pt-6">{children}</main>
        </Toaster>
      </body>
    </html>
  );
}
