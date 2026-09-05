import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

const description =
  "Imad Syed — software developer in Toronto. Tools for cities and small businesses.";

export const metadata: Metadata = {
  title: {
    default: "Imad Syed",
    template: "%s · Gondolin",
  },
  description,
  openGraph: {
    title: "Imad Syed",
    description,
    type: "website",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a3a6b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-transparent text-white font-light`}>
        <div className="background">
          <img className="bg-desktop" src="/gondolin.webp" alt="" />
          <img className="bg-mobile" src="/gondolin-mobile.webp" alt="" />
        </div>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
