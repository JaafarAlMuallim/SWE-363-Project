import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Sriracha } from "next/font/google";
const sriracha = Sriracha({
  subsets: ["latin"],
  weight: "400"
});

const Navbar = () => {
  return (
    <div className="bg-opacity-0 py-2 border-b border-s-zinc-200 w-full text-white">
      <div className="container flex items-center justify-between">
        <Menu />
        {/* <Link className={buttonVariants()} href='/sign-in'><Menu /></Link> */}   
        <Link href="/" className={`${sriracha.className} text-2xl`}>
          Pitfall
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
