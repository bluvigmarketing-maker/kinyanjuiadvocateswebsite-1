import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Kinyanjui T.W & Co. Advocates is a Kenyan law firm providing litigation, arbitration, conveyancing, and advisory legal services to individuals, corporate entities, and institutions. Strategic advocacy. Disciplined analysis. Sound legal judgment.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kinyanjui T.W & Co. Advocates",
    template: "%s | Kinyanjui T.W & Co. Advocates",
  },
  description,
  keywords: [
    "Kinyanjui Advocates",
    "law firm Kenya",
    "advocates Ruiru",
    "litigation Kenya",
    "conveyancing Kenya",
    "land law Kenya",
    "employment law Kenya",
    "arbitration Kenya",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kinyanjui T.W & Co. Advocates",
    title: "Kinyanjui T.W & Co. Advocates",
    description,
  },
  twitter: {
    card: "summary",
    title: "Kinyanjui T.W & Co. Advocates",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
