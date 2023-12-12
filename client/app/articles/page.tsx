"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Article from "@/models/article";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import ArticleCard from "../components/ArticleCard2";
export default function Articles() {
  const { data: articles, isLoading } = useQuery("articles", () => {
    return fetch("http://localhost:8080/article/published", {
      method: "GET",
      cache: "no-cache",
    }).then((res) => res.json() as Promise<Article[]>);
  });
  const [search, setSearch] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(
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
        : articles?.filter((article) => {
            const titleMatch = article.title.includes(currentSearchValue);
            const subtitleMatch =
              article.subtitle?.includes(currentSearchValue);
            const tagMatch = article.article_tags?.some(
              (tag) => tag.tag?.includes(currentSearchValue),
            );
            const orgMatch = article.org?.name.includes(currentSearchValue);
            return titleMatch || subtitleMatch || tagMatch || orgMatch;
          });
      setFilteredArticles(filtered!);
    }
  };
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
        <Input
          onChange={(e) => handleSearch(e)}
          value={search}
          className="w-96 text-black"
          placeholder="ابحث عن مقالة معينة أو كلمات مفتاحية أو شركات محددة..."
        ></Input>
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
            filteredArticles!.map((article) => {
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
