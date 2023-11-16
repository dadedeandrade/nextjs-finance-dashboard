import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider, ThemeProviderMUI } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Finance Dashboard",
  description:
    "Developed by Vinicius de Andrade, for more information check https://vinicius-andrade.vercel.app/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProviderMUI>{children}</ThemeProviderMUI>
        </NextAuthProvider>
      </body>
    </html>
  );
}
