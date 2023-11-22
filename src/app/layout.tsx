import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider, StoreProvider, ThemeProviderMUI } from "./providers";
import Loading from "./dashboard/loading";
import { Suspense } from "react";

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
        <StoreProvider>
          <NextAuthProvider>
            <ThemeProviderMUI>
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </ThemeProviderMUI>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
