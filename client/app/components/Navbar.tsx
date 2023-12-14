"use client";
import {
  Bookmark,
  Home,
  Menu,
  Moon,
  Building,
  Newspaper,
  Sun,
  Users,
  Bell,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
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
                  <Link
                    href={`/profile`}
                    className="flex flex-row justify-center items-center"
                  >
                    @{session.user.username}
                    {session?.user.user_image && (
                      <Image
                        priority
                        src={"/profile_default.png"}
                        alt="avatar"
                        className="shadow-lg mr-2"
                        height={40}
                        width={40}
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
                    <Link className="flex" href="/reviewArticle">
                      مراجعة المقالات
                      <Bell className="mx-2" />
                    </Link>
                  </li>
                )}
              <li>
                <Link
                  className="flex link link-underline link-underline-black p-2"
                  href={`/organizations`}
                >
                  المؤسسات <Building className="mx-2" />
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
                  <button
                    className="flex"
                    onClick={() => {
                      router.replace("/");
                      signOut();
                    }}
                  >
                    تسجيل الخروج
                  </button>
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
                  className="flex flex-row justify-center items-center"
                >
                  @{session.user.username || "X"}
                  <Image
                    priority
                    src={"/profile_default.png"}
                    alt="avatar"
                    className="shadow-lg mr-2"
                    height={40}
                    width={40}
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
                href={`/organizations`}
              >
                المؤسسات <Building className="mx-2" />
              </Link>
            </li>
            {session &&
              (session.user.role === "admin" ||
                session.user.role === "reviewer") && (
                <li>
                  <Link className="flex" href="/reviewArticle">
                    مراجعة المقالات
                    <Bell className="mx-2" />
                  </Link>
                </li>
              )}
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
                <button
                  className="flex"
                  onClick={() => {
                    setActive((prevState) => !prevState);
                    router.push("/");
                    signOut();
                  }}
                >
                  تسجيل الخروج
                </button>
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
