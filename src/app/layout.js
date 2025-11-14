import "./globals.css";
import MyNavBar from "@/components/MyNavBar";

export const metadata = {
  title: "Manraj Portfolio",
  description: "Next.js portfolio labs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MyNavBar />
        {children}
      </body>
    </html>
  );
}
