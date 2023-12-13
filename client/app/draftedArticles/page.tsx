"use client";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard2";
import Link from "next/link";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Articles() {
  const { data: profile } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!profile) router.push(`/auth?callbackUrl=/draftedArticles/`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [profile]);
  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled: profile !== undefined && profile?.user !== null,
    queryKey: "articles",
    queryFn: () => {
      return fetch("http://localhost:8080/article/drafted", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${profile?.user.user_id}`,
        },
        cache: "no-cache",
      }).then((res) => res.json() as Promise<Article[]>);
    },
  });

  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-content text-5xl text-center font-semibold">
          <span>المقالات</span>
        </div>
        <hr />
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
            </>
          ) : isSuccess ? (
            articles!.map((article) => {
              return (
                <Link
                  key={article.article_id}
                  href={`/draftedArticles/${article.article_id}`}
                >
                  <ArticleCard article={article} />
                </Link>
              );
            })
          ) : (
            <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
              <>
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
