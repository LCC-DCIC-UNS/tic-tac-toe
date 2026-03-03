import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Two Dots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="/lib/jquery-3.5.1.min.js" strategy="beforeInteractive" />
        <Script src="/lib/pengines.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
