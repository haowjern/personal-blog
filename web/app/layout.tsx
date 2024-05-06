import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/footer";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Tee Haow Jern's Blog",
  description:
    "A blog where Tee Haow Jern, a software engineer based in Malaysia shares his thoughts on coding and volleyball.",
  openGraph: {
    title: "Tee Haow Jern's Blog",
    description:
      "A blog where Tee Haow Jern, a software engineer based in Malaysia shares his thoughts on coding and volleyball.",
    url: BASE_URL,
    siteName: "Tee Haow Jern",
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-gray-100 dark:bg-gray-950",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
