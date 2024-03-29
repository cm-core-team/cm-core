import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "./footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Congregation Manager",
  description: "Manage a congregation with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
