import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import React from "react";
import { SessionProvider } from "@/store/sessionStore";
import Provider from "./components/Provider";
import Footer from "./components/Footer";
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
      <body
        dir="rtl"
        className={`${cairo.className} bg-gradient-to-br from-primaryDark to-secondaryDark`}
      >
        <Provider>
          <Navbar />
          <main className=" flex flex-col justify-center items-center">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
