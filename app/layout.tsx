import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/nav/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gondolin",
    template: "%s · Gondolin",
  },
  description: "Imad's personal website",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#111111",
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
