import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://salesfulfillment3pl.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sales Fulfillment 3PL | Shopify, TikTok Shop CBT, Amazon FBM & FBA Fulfillment",
    template: "%s | Sales Fulfillment 3PL",
  },
  description:
    "Sales Fulfillment 3PL provides Shopify fulfillment, TikTok Shop fulfillment with CBT support, Amazon FBM fulfillment, and Amazon FBA prep for growing e-commerce brands.",
  keywords: [
    "3PL fulfillment",
    "Shopify fulfillment",
    "TikTok Shop fulfillment",
    "TikTok Shop CBT",
    "Amazon FBM fulfillment",
    "Amazon FBA prep",
    "ecommerce fulfillment",
    "warehouse fulfillment",
  ],
  authors: [{ name: "Sales Fulfillment 3PL" }],
  creator: "Sales Fulfillment 3PL",
  publisher: "Sales Fulfillment 3PL",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sales Fulfillment 3PL",
    title: "Sales Fulfillment 3PL | Future-Ready E-commerce Fulfillment",
    description:
      "Shopify fulfillment, TikTok Shop CBT fulfillment, Amazon FBM, and Amazon FBA prep under one marketplace-ready operation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Fulfillment 3PL | Future-Ready E-commerce Fulfillment",
    description:
      "Fulfillment for Shopify, TikTok Shop CBT, Amazon FBM, and Amazon FBA prep.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
