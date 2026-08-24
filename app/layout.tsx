import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header, JsonLd } from "./components/SiteChrome";
import { siteConfig } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Van Dijk Rijschool",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "education",
  keywords: ["rijschool Den Haag", "rijlessen Den Haag", "autorijschool", "rijlespakket", "proefles rijschool"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/vd-mark.jpg",
    shortcut: "/images/vd-mark.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl-NL">
      <body>
        <a className="skip-link" href="#main-content">Direct naar inhoud</a>
        <Header />
        {children}
        <Footer />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": ["Organization", "DrivingSchool"],
              name: siteConfig.name,
              url: siteConfig.url,
              logo: `${siteConfig.url}/images/logo-stacked.jpg`,
              description: siteConfig.description,
              areaServed: siteConfig.areas.map((name) => ({ "@type": "City", name })),
              sameAs: [],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              inLanguage: "nl-NL",
            },
          ]}
        />
      </body>
    </html>
  );
}
