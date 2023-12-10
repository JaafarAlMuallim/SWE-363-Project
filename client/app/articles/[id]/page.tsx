"use client";
import Article from "@/models/article";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import CommentSection from "./CommentSection";

export default function Article({ params }: { params: { id: string } }) {
  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "article",
    queryFn: () =>
      fetch(`http://localhost:8080/article/${params.id}`, {
        method: "GET",
        next: {
          revalidate: 5,
        },
      }).then((res) => res.json() as Promise<Article>),
  });
  if (isLoading) {
    return (
      <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
        <Skeleton className="w-80 h-36" />
        <Skeleton className="w-64 h-12" />
        <Skeleton className="w-40 h-4" />
        <Skeleton className="h-80 w-64" />
        <div className="flex flex-col my-20">
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
        </div>
      </div>
    );
  }

  const { content } = article!;
  const date = article!.date!.toString().substring(0, 10);
  const cleanContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  return (
    <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
      <Image src={`../next.svg`} alt={"Image"} width={400} height={400} />
      <h1 className="text-4xl text-center">{article!.title}</h1>
      <p>{article!.subtitle}</p>
      <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
      <p>{date.toString().substring(0, 10)}</p>
      <section className="flex justify-center gap-2">
        {article!.article_tags &&
          article!.article_tags!.map((tag, index) => {
            return (
              <div
                key={index}
                className={`bg-crd2 text-white px-4 py-1 rounded-full inline w-24 text-center`}
              >
                {tag.tag}
              </div>
            );
          })}
      </section>
      <p>Author Card To be implemented with About us page before</p>
      <CommentSection article={article!} />
    </div>
  );
}
