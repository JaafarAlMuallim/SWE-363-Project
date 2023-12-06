import Link from "next/link";
import React from "react";
import { Home, Newspaper, Info, Phone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Sriracha } from "next/font/google";
const sriracha = Sriracha({
    subsets: ["latin"],
    weight: "400",
});
  
export default function Footer() {
    return (
        <div className="bg-secondaryDark text-content">
            <div className="container flex flex-col items-center justify-center gap-4 py-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2"> 
                        <Home className="mx-2" />
                        الرئيسية
                    
                    </Link>
                    <Link href="/articles" className="flex items-center gap-2">
                        <Newspaper className="mx-2" />
                        المقالات
                    </Link>
                    <Link href="/about" className="flex items-center gap-2">
                        <Info className="mx-2" />
                        عن المدونة
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2">
                        <Phone className="mx-2" />
                        اتصل بنا
                    </Link>
                </div>
                <Link href="/" className={`${sriracha.className}`}>
                        <Label className="text-xl">Pitfall</Label>
                </Link>
                

            </div>
        </div>
    )
            
}
