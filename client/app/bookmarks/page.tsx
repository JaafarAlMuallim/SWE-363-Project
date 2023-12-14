"use client";
import { Skeleton } from "@/components/ui/skeleton";
import Article from "@/models/article";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import ArticleCard from "../components/ArticleCard2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type BookmarksProps = {
  user_id: string;
  article_id: string;
  bookmark_id: string;
  article: Article;
};
export default function Bookmarks() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) router.push("/auth?callbackUrl=/bookmarks");
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
  if (!session) {
    return <div className="h-screen"></div>;
  }
  // Fetch the user's bookmarks
  const { data: bookmarks, isLoading } = useQuery({
    enabled:
      session !== undefined &&
      session?.user !== null &&
      session?.user.user_id !== undefined,
    queryKey: "bookmarks",
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8080/user/bookmarked", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.user?.user_id}`,
          },
        });
        return res.json() as Promise<BookmarksProps[]>;
      } catch (error) {
        console.log(error);
      }
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
      <div className="my-8 text-2xl font-semibold text-right mx-10 text-content">
        <p>المقالات المحفوظة</p>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="h-screen flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
          {/* if the data is loading, show the skeleton */}
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
            </>
          ) : bookmarks!.length > 0 ? (
            bookmarks!.map((bookmark) => {
              return (
                <Link
                  key={bookmark.article.article_id}
                  href={`/articles/${bookmark.article.article_id}`}
                >
                  <ArticleCard article={bookmark.article} />
                </Link>
              );
            })
            ) : (
            // if the user has no bookmarks, show a message
            <div className="h-screen text-center text-2xl text-content">
              <p>لا يوجد مقالات محفوظة</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
