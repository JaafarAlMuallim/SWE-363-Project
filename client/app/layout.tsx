import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

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
    <html lang="ar">
      <body
        dir="rtl"
        className={`${cairo.className} bg-gradient-to-br from-primaryDark to-secondaryDark`}
      >
        <Navbar />
        <main className="h-screen flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
