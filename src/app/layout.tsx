import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["700"],
  variable: "--font-poppins" 
});

const roboto = Roboto({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: "--font-roboto" 
});

export const metadata: Metadata = {
  title: "Romantic Wellness Tracker",
  description: "A gentle space for your cycle and soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable} font-sans antialiased`}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
