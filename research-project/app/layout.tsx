import "@/styles/globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Jason Starace",
  description: "Jason Starace - Research and Academic Portfolio",
  icons: {
    icon: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}