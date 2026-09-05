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
  themeColor: "#0a3a6b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-transparent text-white font-light`}
      >
        <picture className="bg-picture">
          <source
            media="(max-width: 700px)"
            srcSet="/gondolin-mobile.webp"
            width={853}
            height={1844}
          />
          <img
            src="/gondolin.webp"
            alt=""
            width={3840}
            height={2160}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="site">
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
