"use client"
import { Bookmark, Home, Menu, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 bg-secondaryDark py-4 border-b w-full text-white">
        <div className="container">
            {/* Large screens */}
            <nav className="hidden md:flex items-center justify-between">
              <ul className="list-none flex items-center gap-8">
                <li>
                  <Link href={`/profile`} className="link link-underline link-underline-black p-4">
                    Ahmed@
                    <Avatar 
                      src="bukha.png"
                      alt="avatar"
                      size="md"
                      className="shadow-lg mr-2"
                      withBorder={true}
                      color="white"
                      variant="circular"
                    />
                  </Link>
                </li>
                <li><Link className="flex link link-underline link-underline-black p-2" href={'/'}>الرئيسية<Home className="mx-2"/></Link></li>
                <li><Link className="flex link link-underline link-underline-black p-2" href={`/articles`}>المقالات<Newspaper className="mx-2"/></Link></li>
                <li><Link className="flex link link-underline link-underline-black p-2" href={`/bookmarks`}>العلامات المرجعية <Bookmark className="mx-2"/></Link></li>
                <li><Link className="flex link link-underline link-underline-black p-2" href={`/about-us`}>عنا <Users className="mx-2"/></Link></li>
              </ul>
              <Link href="/" className="text-2xl">
                Pitfall
              </Link>
            </nav>
            {/* Small screens */}
            <div className="flex items-center justify-between md:hidden ">
              <Menu className="scale-150" onClick={() => setActive(!active)} />
              {/* <Link className={buttonVariants()} href='/sign-in'><Menu /></Link> */}
              <Link href="/" className="text-2xl">
                Pitfall
              </Link>
            </div>
        </div>
      </div>
      {/* slide menu */}
      <div
        className={`fixed w-full h-screen z-10 ${
          active ? 'lg:translate-x-2/3 translate-x-2/4 ' : 'translate-x-full'
        } transition-all duration-500 ease-in-out bg-secondaryDark text-white bg-opacity-90`}
      >
        <nav className="list-none ml-4 mt-4 flex flex-col justify-end items-end gap-8">
          <ul className="flex flex-col justify-center items-center gap-8 list-none">
            <li>
              <Link onClick={() => setActive(!active)} href={`/profile`}>
                Ahmed@
                <Avatar
                  src="bukha.png"
                  alt="avatar"
                  size="md"
                  className="shadow-lg mr-2"
                  withBorder={true}
                  color="white"
                  variant="circular"
                />
              </Link>
            </li>
            <li><Link className="flex" onClick={() => setActive(!active)} href={'/'}>الرئيسية<Home className="mx-2"/></Link></li>
            <li><Link className="flex" onClick={() => setActive(!active)} href={`/articles`}>المقالات<Newspaper className="mx-2"/></Link></li>
            <li><Link className="flex" onClick={() => setActive(!active)} href={`/about-us`}>العلامات المرجعية <Bookmark className="mx-2"/></Link></li>
            <li><Link className="flex" onClick={() => setActive(!active)} href={`/about-us`}>عنا <Users className="mx-2"/></Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
