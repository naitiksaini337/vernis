import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vernis.luxury"),
  title: "VERNIS · High-Gloss Nail Lacquer",
  description:
    "A single-coat, chip-resistant luxury nail lacquer formulated for deep pigment saturation and high-gloss reflection. Six signature shades.",
  keywords: [
    "vernis",
    "nail lacquer",
    "dark grunge nail polish",
    "luxury cosmetic",
    "chip-resistant nail colour",
    "cerise noire",
    "morticia",
  ],
  authors: [{ name: "VERNIS" }],
  openGraph: {
    title: "VERNIS · High-Gloss Nail Lacquer",
    description: "Deep pigment saturation, chip-resistant colour in six curated shades.",
    siteName: "VERNIS",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans selection:bg-[#8E0C2D] selection:text-white">
        {children}
      </body>
    </html>
  );
}

