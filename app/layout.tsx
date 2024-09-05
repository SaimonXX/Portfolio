import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simon H. Portfolio",
  description: "This is mi tech life",
  metadataBase: new URL("https://simonhernandez.online"),
  openGraph: {
    title: "Simon H. Portfolio",
    description: "'Check out my projects in my tech world...'",
    url: "https://simonhernandez.online",
    siteName: "Simon H. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SaimonAHG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="logo.svg" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
