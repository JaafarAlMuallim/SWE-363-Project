"use client";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReviewArticle() {
  const { data: session } = useSession({
    required: true,
  });
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) router.push("/auth?callbackUrl=/reviewArticle");
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
  if (
    session != null &&
    session?.user?.role !== "admin" &&
    session?.user?.role !== "reviewer"
  ) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center text-2xl font-semibold text-red-500">
        لا يمكنك الوصول لهذه الصفحة، هذه الصفحة مخصصة للمراجعين والمسؤولين فقط
        <Link href="/">
          <Button className="bg-cbtn text-content shadow-lg my-10 w-50">
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>
    );
  }
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: "inReview",
    enabled:
      session !== null && session !== undefined && session?.user !== null,
    queryFn: () => {
      return fetch("http://localhost:8080/article/inReview", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
          console.log(err);
        });
    },
  });

  if (isLoading) {
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
        <div className="flex flex-col gap-8">
          <Skeleton className="h-24 w-80 rounded-lg bg-cover shadow-lg bg-gray-400" />
          <Skeleton className="h-24 w-80 rounded-lg bg-cover shadow-lg bg-gray-400" />
          <Skeleton className="h-24 w-80 rounded-lg bg-cover shadow-lg bg-gray-400" />
        </div>
      </>
    );
  }
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
      <div className="flex flex-col h-screen gap-10">
        {isSuccess && data?.length > 0 ? (
          data!.map((article: Article) => {
            return (
              <ArticleCard
                article={article}
                key={article.article_id}
                link={"reviewArticle"}
              />
            );
          })
        ) : (
          <p>لا يوجد مقالات</p>
        )}
      </div>
    </>
  );
}
