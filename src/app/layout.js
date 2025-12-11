import "./globals.css";
import MyNavBar from "@/components/MyNavBar";
import { Toaster } from "@/components/ui/toaster";
import Auth0ProviderClient from "@/components/Auth0ProviderClient";

export const metadata = {
  title: "ManrajPortfolio",
  description: "Portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <Auth0ProviderClient>
          <Toaster>
            <MyNavBar />
            <main className="pt-6">{children}</main>
          </Toaster>
        </Auth0ProviderClient>
      </body>
    </html>
  );
}