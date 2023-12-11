import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import React from "react";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthProvider";
import Navbar from "./components/Navbar";
import QueryProvider from "./components/QueryProvider";
const cairo = Cairo({ subsets: ["arabic"] });
const local_theme = "dark";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" local_theme={local_theme}>
      <QueryProvider>
        <body
          dir="rtl"
          className={`${cairo.className} bg-gradient-to-br from-primaryDark to-secondaryDark`}
        >
          <AuthProvider>
            <Navbar />
            <div id="backdrop" />
            <div id="modal-root" />
            <main className="flex flex-col justify-center items-center w-full">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
