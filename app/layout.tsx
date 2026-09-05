import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PageHero } from "@/components/PageHero";
import { Navbar } from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Imad Syed",
    template: "%s · Gondolin",
  },
  openGraph: {
    title: "Gondolin",
    type: "website",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#041e32",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white font-light`}>
        <div className="site">
          <PageHero />
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
