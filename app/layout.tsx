import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer, Header, JsonLd } from "./components/SiteChrome";
import { pageRobots, siteConfig } from "./lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Van Dijk Rijschool",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "education",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: pageRobots(),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: `${siteConfig.url}/`,
    images: [{
      url: "/images/og/van-dijk-rijschool-og-1200x630.jpg",
      width: 1200,
      height: 630,
      alt: siteConfig.title,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/og/van-dijk-rijschool-og-1200x630.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl-NL">
      <head>
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Direct naar inhoud</a>
        <Header />
        {children}
        <Footer />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": siteConfig.organizationId,
              name: siteConfig.name,
              alternateName: "Van Dijk Rijschool",
              description: siteConfig.description,
              legalName: siteConfig.legalName,
              url: siteConfig.url,
              logo: `${siteConfig.url}/icon-512.png`,
              telephone: siteConfig.contact.telephone.value.replace(/\s/g, ""),
              email: siteConfig.contact.email.value,
              identifier: { "@type": "PropertyValue", propertyID: "KVK", value: siteConfig.contact.kvk.value },
              vatID: siteConfig.contact.vatId.value,
              founder: { "@type": "Person", "@id": `${siteConfig.url}/over-ons#eric-van-dijk`, name: "Eric van Dijk", url: `${siteConfig.url}/over-ons` },
              contactPoint: { "@type": "ContactPoint", telephone: siteConfig.contact.telephone.value.replace(/\s/g, ""), email: siteConfig.contact.email.value, contactType: "Klantenservice", availableLanguage: "nl", areaServed: "NL" },
              areaServed: siteConfig.areas.map((name) => ({ "@type": "Place", name })),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": siteConfig.websiteId,
              name: siteConfig.name,
              alternateName: "Van Dijk Rijschool",
              url: siteConfig.url,
              inLanguage: "nl-NL",
              publisher: { "@id": siteConfig.organizationId },
            },
          ]}
        />
      </body>
    </html>
  );
}
