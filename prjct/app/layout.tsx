import type { Metadata } from "next";
import "./globals.css";
import AuthOverlay from "./components/AuthOverlay";

export const metadata: Metadata = {
  title: "KROWD",
  description: "A new social media application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthOverlay />
        {children}
      </body>
    </html>
  );
}
