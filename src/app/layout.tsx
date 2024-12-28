import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import dynamic from 'next/dynamic';

const I18nProvider = dynamic(() => import('@/i18n/config.tsx'), {
  ssr: false
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FoodScan",
  description:
    "FoodScan - 食品安全分析平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-700">
        <ThirdwebProvider>
          <I18nProvider>
            <LanguageProvider>
              <Navbar />
              {children}
              <Toaster position="top-center" />
            </LanguageProvider>
          </I18nProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
