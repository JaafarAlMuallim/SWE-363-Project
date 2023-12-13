"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import ArticleCard from "../components/ArticleCard2";
import { useRouter } from "next/navigation";
import LikedArticle from "@/models/liked_article";

export default function LikedArticles() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) router.push(`/auth?callbackUrl=/liked/`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
  const {
    data: articles,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled: session !== undefined && session?.user !== null,
    queryKey: "articles",
    queryFn: () => {
      return fetch("http://localhost:8080/article/liked", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user.user_id}`,
        },
        cache: "no-cache",
      }).then((res) => res.json() as Promise<LikedArticle[]>);
    },
  });
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<LikedArticle[]>(
    isLoading ? [] : articles!,
  );
  useEffect(() => {
    setFilteredArticles(isLoading ? [] : articles!);
  }, [articles, isLoading]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSearchValue = e.target.value;
    setSearch(currentSearchValue);
    if (currentSearchValue.length === 0) {
      setFilteredArticles(articles!);
    } else {
      const filtered = isLoading
        ? []
        : articles?.filter((liked) => {
            const titleMatch = liked.article.title.includes(currentSearchValue);
            const subtitleMatch =
              liked.article.subtitle?.includes(currentSearchValue);
            const tagMatch = liked.article.article_tags?.some(
              (tag) => tag.tag?.includes(currentSearchValue),
            );
            const orgMatch =
              liked.article.org?.name.includes(currentSearchValue);
            return titleMatch || subtitleMatch || tagMatch || orgMatch;
          });
      setFilteredArticles(filtered!);
    }
  };
  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-4 text-content text-5xl text-center font-semibold">
          <span>مقالات أعجبتني</span>
        </div>
        <div className="flex justify-center my-8 text-2xl font-semibold text-right text-content mx-4">
          <div className="flex gap-4">
            <Input
              onChange={(e) => handleSearch(e)}
              value={search}
              className="w-56 text-black md:w-96"
              placeholder="ابحث عن كلمات مفتاحية"
            />
          </div>
        </div>
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
            isSuccess &&
            filteredArticles!.map((liked) => {
              return (
                <Link
                  key={liked.article_id}
                  href={`/articles/${liked.article_id}`}
                >
                  <ArticleCard article={liked.article} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
