"use client";

import Article from "@/models/article";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";
import { Avatar } from "@material-tailwind/react";
import Image from "next/image";

export default function ArticleCard(props: { article: Article }) {
  return (
    <article className="bg-gradient-to-br from-crd to-crd2 overflow-hidden rounded-lg w-80 shadow-lg">
      <Image
        alt="Placeholder"
        className="rounded-t-lg"
        src="/test.jpg"
        width={400}
        height={400}
      />
      <header className="flex items-center justify-between w-full leading-tight p-2 md:p-4">
        <div className="flex items-center">
          <object>
            <Link href={`/profile/${props.article!.user!.username}`}>
              <Avatar
                src="/profile_default.png"
                alt="avatar"
                size="md"
                className="shadow-lg"
                withBorder={true}
                variant="circular"
              />
            </Link>
          </object>
          <div className="mr-2">
            <span>
              <object>
                <Link
                  href={`/profile/${props.article.user!.username}`}
                  className="hover:underline"
                >
                  {props.article.user!.username}
                </Link>
              </object>
            </span>
            <span className="block text-gcontent2 text-sm">
              {props.article.date}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <GoHeartFill />
          {props.article.likes}
        </div>
      </header>
      <div className="p-2 md:p-4">
        <h1 className="text-lg">{props.article.title}</h1>
        <h2 className="text-l text-gcontent2">{props.article.subtitle}</h2>
      </div>
      <footer className="flex items-center justify-between leading-none p-2 md:p-4">
        <div className="">
          {props.article.article_tags!.map((tag, index) => {
            return (
              <div
                key={index}
                className="bg-gcontent bg-opacity-75 px-2 mx-1 rounded-full inline text-center text-xs font-semibold"
              >
                {tag.tag}
              </div>
            );
          })}
        </div>
      </footer>
    </article>
  );
}
