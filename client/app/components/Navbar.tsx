"use client"
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false)
  return (
    <><div className="bg-opacity-0 py-2 border-b border-s-zinc-200 w-full text-white">
      <div className="container flex items-center justify-between">
        <Menu
          onClick={() => setActive(!active)} />
        {/* <Link className={buttonVariants()} href='/sign-in'><Menu /></Link> */}
        <Link href="/" className="text-2xl">
          Pitfall
        </Link>
      </div>
    </div>
    <div className={`fixed w-full h-full ${active ? 'translate-x-2/4' : 'translate-x-full'} transition-all duration-500 ease-in-out bg-blue-gray-200`}>
        <ul className="list-none text-white">
          <li><Link href={`/`}>Home</Link></li>
          <li><Link href={`/articles`}>Articles</Link></li>
          <li><Link href={`/profile`}>Profile</Link></li>
          <li><Link href={`/about-us`}>About us</Link></li>
        </ul>
    </div></>
  );
};

export default Navbar;
