import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FloralCraft",
  description: "With over 25 years experience in the industry, we have a thriving, happy family of customers and clients who trust us to deliver their most individual needs on time and within budget. We have fresh deliveries daily and use both local and international wholesalers, so we can guarantee the best choice and prices available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${playfairDisplay.variable} antialiased min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </NuqsAdapter>
        <ToastContainer />
      </body>
    </html>
  );
}