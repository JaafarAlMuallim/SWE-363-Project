"use client"

import Article from "@/models/article";
import Link from "next/link";
import { GoHeartFill } from "react-icons/go";
import { Avatar } from "@material-tailwind/react";

export default function ArticleCard(props: { article: Article }) {
    return (
        <Link href={`/articles/${props.article.article_id}`} className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 text-content">
            <article className="bg-gradient-to-br from-crd to-crd2 overflow-hidden rounded-lg shadow-lg">

                <a>
                    <img alt="Placeholder" className="block h-auto w-full" src="/test.jpg" />
                </a>

                <header className="flex items-center justify-between w-full leading-tight p-2 md:p-4">
                    {/* <h1 className="text-lg">
                        <a className="no-underline hover:underline">
                            {props.article.title}
                        </a>
                    </h1>
                    <p className="text-gcontent2 text-sm">
                        {props.article.date}
                    </p> */}
                    <div className="flex items-center">
                        <Link href={`/profile/${props.article.user_id}`}>
                            <Avatar
                                src="/profile_default.png"
                                alt="avatar"
                                size="md"
                                className="shadow-lg"
                                withBorder={true}
                                variant="circular"
                            />
                                {/* <Link href={`/profile/${props.article.user_id}`} className="mr-2 text-sm">
                                        {props.article.user_id}
                                </Link> */}
                        </Link>
                        <div className="mr-2">
                            <span>{props.article.user_id}</span>
                            <span className="block text-gcontent2 text-sm">{props.article.date}</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <GoHeartFill />
                        {props.article.likes}
                    </div>
                </header>
                <div className="p-2 md:p-4">
                    <h1 className="text-lg">
                        {props.article.title}
                    </h1>
                    <h2 className="text-l text-gcontent2">
                        {props.article.subtitle}
                    </h2>
                </div>
                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    {/* <a className="flex items-center no-underline hover:underline">
                    <Avatar
                        src="/profile_default.png"
                        alt="avatar"
                        size="md"
                        className="shadow-lg mr-2"
                        withBorder={true}
                        variant="circular"
                    />
                        <Link href={`/profile/${props.article.user_id}`} className="mr-2 text-sm">
                                {props.article.user_id}
                        </Link>
                    </a> */}
                    
                    {/* <div className="flex flex-col justify-center items-center">
                        <GoHeartFill />
                        {props.article.likes}
                    </div> */}
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
        </Link>
    )
}