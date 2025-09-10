// app/layout.tsx
import "./globals.css";
import { Providers } from "./Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"),
  title: {
    default: "E-Commerce App",
    template: "%s | E-Commerce App",
  },
  description: "Modern, çok dilli ve hızlı bir e-ticaret uygulaması.",
  alternates: {
    canonical: "/tr",
    languages: {
      en: "/en",
      tr: "/tr",
    },
  },
  openGraph: {
    type: "website",
    siteName: "E-Commerce App",
    title: "E-Commerce App",
    description: "Modern, çok dilli ve hızlı bir e-ticaret uygulaması.",
    url: "/tr",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce App",
    description: "Modern, çok dilli ve hızlı bir e-ticaret uygulaması.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}