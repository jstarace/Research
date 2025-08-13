import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jason Starace",
  description: "Jason Starace - Research and Academic Portfolio",
  icons: {
    icon: "/favicon.ico",
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
      </body>
    </html>
  );
}