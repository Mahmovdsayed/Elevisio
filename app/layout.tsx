import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { content } from "@/content/Content";

const GetLexendDeca = Geist({
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: `${content.homePage.title}`,
  description: `${content.homePage.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GetLexendDeca.variable}  antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
