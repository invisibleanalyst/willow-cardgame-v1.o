import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Willow Date Night Edition",
  description: "Romantic swipes for date nights—unlock tiers from Spark to Lock-In",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Willow Date Night",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Willow Date Night",
    "application-name": "Willow Date Night",
    "msapplication-TileColor": "#00FFAA",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#00FFAA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
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
      <body className="font-craftwork antialiased bg-theme text-theme-primary transition-colors duration-300">
        <ThemeProvider>
          <PageWrapper>
            {children}
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}