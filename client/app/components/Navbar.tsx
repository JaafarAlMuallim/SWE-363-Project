"use client";
import {
  Bookmark,
  Home,
  Menu,
  Moon,
  Newspaper,
  Sun,
  Users,
  Bell,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { Sriracha } from "next/font/google";
import { useRouter } from "next/navigation";
const sriracha = Sriracha({
  subsets: ["latin"],
  weight: "400",
});
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [local_theme, setTheme] = useState("light");
  const [chk, setChk] = useState(true);
  const router = useRouter();
  return (
    <>
      <div className="sticky top-0 z-10 bg-secondaryDark py-4 border-b w-full text-content">
        <div className="container">
          {/* Large screens */}
          <nav className="hidden md:flex items-center justify-between">
            <ul className="list-none flex items-center gap-4">
              {session && session.user ? (
                <li>
                  <Link href={`/${session.user.username}`}>
                    @{session.user.username}
                    {session?.user.user_image && (
                      <Avatar
                        src={session?.user.user_image}
                        alt="avatar"
                        size="md"
                        className="shadow-lg mr-2"
                        withBorder={true}
                        variant="circular"
                      />
                    )}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href={`/auth`}>تسجيل الدخول</Link>
                </li>
              )}
              {/*}
              <li>
                //{" "}
                <button onClick={handleThemeChange} className="p-2">
                  // {chk == true ? <Sun /> : <Moon />}
                  //{" "}
                </button>
              </li>
              */}
              <li>
                <Link
                  className="flex link link-underline link-underline-black p-2"
                  href={"/"}
                >
                  الرئيسية
                  <Home className="mx-2" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex link link-underline link-underline-black p-2"
                  href={`/articles`}
                >
                  المقالات
                  <Newspaper className="mx-2" />
                </Link>
              </li>
              {session &&
                (session.user.role === "admin" ||
                  session.user.role === "reviewer") && (
                  <li>
                    <Link href="/reviewArticle">
                      <Bell />
                    </Link>
                  </li>
                )}
              <li>
                <Link
                  className="flex link link-underline link-underline-black p-2"
                  href={`/bookmarks`}
                >
                  الصفحات المرجعية <Bookmark className="mx-2" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex link link-underline link-underline-black p-2"
                  href={`/about-us`}
                >
                  عنا <Users className="mx-2" />
                </Link>
              </li>
              {session && session.user && (
                <li>
                  <Link
                    className="flex"
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                    href={`/`}
                  >
                    تسجيل الخروج
                  </Link>
                </li>
              )}
            </ul>
            <Link href="/" className={`${sriracha.className} text-2xl`}>
              Pitfall
            </Link>
          </nav>
          {/* Small screens */}
          <div className="flex items-center justify-between md:hidden ">
            <Menu className="scale-150" onClick={() => setActive(!active)} />
            <Link href="/" className={`${sriracha.className} text-2xl`}>
              Pitfall
            </Link>
          </div>
        </div>
      </div>
      {/* slide menu */}
      <div
        className={`fixed w-full h-screen z-10 ${
          active ? "lg:translate-x-2/3 translate-x-2/4 " : "translate-x-full"
        } transition-all duration-500 ease-in-out bg-secondaryDark text-content bg-opacity-90`}
      >
        <nav className="list-none ml-4 mt-4 flex flex-col justify-end items-end gap-20">
          <ul className="flex flex-col justify-center items-center gap-8 list-none">
            {session && session.user ? (
              <li>
                <Link
                  onClick={() => setActive((prevState) => !prevState)}
                  href={`/profile`}
                >
                  @{session.user.username || "X"}
                  <Avatar
                    src={session.user.user_image}
                    size="md"
                    className="shadow-lg mr-2"
                    withBorder={true}
                    variant="circular"
                  />
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={`/auth`}
                  onClick={() => setActive((prevState) => !prevState)}
                >
                  تسجيل الدخول
                </Link>
              </li>
            )}

            <li>
              <Link
                className="flex"
                onClick={() => setActive((prevState) => !prevState)}
                href={"/"}
              >
                الرئيسية
                <Home className="mx-2" />
              </Link>
            </li>
            <li>
              <Link
                className="flex"
                onClick={() => setActive((prevState) => !prevState)}
                href={`/articles`}
              >
                المقالات
                <Newspaper className="mx-2" />
              </Link>
            </li>
            <li>
              <Link
                className="flex"
                onClick={() => setActive((prevState) => !prevState)}
                href={`/bookmarks`}
              >
                الصفحات المرجعية <Bookmark className="mx-2" />
              </Link>
            </li>
            <li>
              <Link
                className="flex"
                onClick={() => setActive((prevState) => !prevState)}
                href={`/about-us`}
              >
                عنا <Users className="mx-2" />
              </Link>
            </li>
            {session?.user && (
              <li>
                <Link
                  className="flex"
                  onClick={() => {
                    setActive((prevState) => !prevState);
                    signOut();
                    router.push("/");
                  }}
                  href={`/`}
                >
                  تسجيل الخروج
                </Link>
              </li>
            )}
            {/*<li>
              <button onClick={handleThemeChange} className="px-4">
                {chk == true ? <Sun /> : <Moon />}
              </button>
            </li>*/}
          </ul>
        </nav>
      </div>
    </>
  );
}
