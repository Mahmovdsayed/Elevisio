import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { content, seoKeywords } from "@/content/Content";
import { Analytics } from "@vercel/analytics/react"
import { baseUrl } from "@/static/constant";

const GetLexendDeca = Geist({
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: `Elevisio`,
  description: `${content.homePage.description}`,
  keywords: seoKeywords,
  openGraph: {
    title: `Elevisio`,
    description: `${content.homePage.description}`,
    url: `${baseUrl}`,
    siteName: "Elevisio",
    // images:
    //   [{
    //     url: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1746778846/hlazqf5kqffq8xgtnfwy.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Elevisio Overview"
    //   }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Elevisio`,
    description: `${content.homePage.description}`,
    // images: [
    //   {
    //     url: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1746778846/hlazqf5kqffq8xgtnfwy.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Elevisio Overview"
    //   }
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="dark">
      <head>
        <meta property="og:image" content="https://res.cloudinary.com/dtpsyi5am/image/upload/v1746778846/hlazqf5kqffq8xgtnfwy.jpg" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dtpsyi5am/image/upload/v1746778846/hlazqf5kqffq8xgtnfwy.jpg" />
      </head>
      <body
        className={`${GetLexendDeca.variable} overflow-x-hidden antialiased`}
      >
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
