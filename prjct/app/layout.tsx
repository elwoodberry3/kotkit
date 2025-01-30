import type { Metadata } from "next";
import "./globals.css";
import AuthOverlay from "./components/AuthOverlay";
import UserProvider from "./context/user";

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
      <UserProvider>
        <body>
          <AuthOverlay />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
