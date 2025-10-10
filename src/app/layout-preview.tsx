import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Willow Date Night Edition",
  description: "Romantic swipes for date nights—unlock tiers from Spark to Lock-In",
  manifest: "/manifest.json",
  themeColor: "#00FFAA",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Willow Date Night",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Willow Date Night Edition",
    title: "Willow Date Night Edition",
    description: "Romantic swipes for date nights—unlock tiers from Spark to Lock-In",
  },
  twitter: {
    card: "summary",
    title: "Willow Date Night Edition",
    description: "Romantic swipes for date nights—unlock tiers from Spark to Lock-In",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#00FFAA" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Willow Date Night" />
        <meta name="msapplication-TileColor" content="#00FFAA" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
