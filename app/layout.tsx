// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout"; // @/components/Layout importu doğru olmalı
import { Providers } from "./Providers"; // './Providers' importu doğru olmalı

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "A Next.js e-commerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> {/* Redux Provider'ı */}
          <Layout> {/* Ana Layout */}
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}