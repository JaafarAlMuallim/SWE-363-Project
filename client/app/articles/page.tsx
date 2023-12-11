"use client";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard2";
import Link from "next/link";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
export default function Articles() {
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery("articles", () => {
    return fetch("http://localhost:8080/article/published", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json() as Promise<Article[]>);
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
      <div className="my-8 text-2xl font-semibold text-right mx-10 text-content">
        <p>اخر المقالات</p>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
            </>
          ) : (
            articles!.map((article) => {
              return (
                <Link
                  key={article.article_id}
                  href={`/articles/${article.article_id}`}
                >
                  <ArticleCard article={article} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
