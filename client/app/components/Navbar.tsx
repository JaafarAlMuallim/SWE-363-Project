import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-opacity-0 py-2 border-b border-s-zinc-200 w-full text-white">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl">
          Pitfall
        </Link>
        {/* <Link className={buttonVariants()} href='/sign-in'><Menu /></Link> */}
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
