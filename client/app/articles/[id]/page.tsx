"use client";
import Article from "@/models/article";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import CommentSection from "./CommentSection";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { queryClient } from "../../components/QueryProvider";
import { useRouter } from "next/navigation";

export default function Article({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: article, isLoading } = useQuery({
    queryKey: "article",
    queryFn: () =>
      fetch(`http://localhost:8080/article/${params.id}`, {
        method: "GET",
      }).then((res) => res.json() as Promise<Article>),
  });
  const { data: isBookmarked, isLoading: isBookmarkedLoading } = useQuery({
    enabled: session !== undefined && session?.user !== null,
    queryKey: "isBookmarked",
    queryFn: () => {
      return fetch(`http://localhost:8080/user/isbookmarked/${params.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        cache: "no-cache",
      }).then((res) => res.json() as Promise<boolean>);
    },
  });
  const { mutate: bookmark } = useMutation({
    mutationKey: "isBookmarked",
    mutationFn: () => {
      console.log("SAVE");
      return fetch(`http://localhost:8080/user/bookmark/${params.id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.user?.user_id}`,
        },
      }).then((res) => res.json() as Promise<boolean>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("isBookmarked");
    },
    onMutate: async () => {
      await queryClient.cancelQueries("isBookmarked");
      const previousValue = queryClient.getQueryData("isBookmarked");
      queryClient.setQueryData<boolean>("isBookmarked", (old) => !old);
      return { previousValue };
    },
  });
  const { mutate: unbookmark } = useMutation({
    mutationKey: "isBookmarked",
    mutationFn: () => {
      return fetch(`http://localhost:8080/user/unbookmark/${params.id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${session?.user?.user_id}`,
        },

        cache: "no-cache",
      }).then((res) => res.json() as Promise<boolean>);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("isBookmarked");
    },
    onMutate: async () => {
      await queryClient.cancelQueries("isBookmarked");
      const previousValue = queryClient.getQueryData("isBookmarked");
      queryClient.setQueryData<boolean>("isBookmarked", (old) => !old);
      return { previousValue };
    },
  });
  const onDeleteArticle = () => {
    fetch(`http://localhost:8080/article/${params.id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session?.user?.user_id}`,
      },
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          router.push("/articles");
        }
      });
  };

  if (isLoading) {
    return (
      <div className="h-screen my-20 text-content flex flex-col justify-start items-center gap-5">
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

  console.log(isBookmarked);
  const { content } = article!;
  const date = article!.date!.toString().substring(0, 10);
  const cleanContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });
  return (
    <div className="my-20 px-6 w-full text-content flex flex-col justify-start items-center gap-5">
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
                className={`bg-crd2 text-content px-4 py-1 rounded-full w-32 text-center`}
              >
                {tag.tag}
              </div>
            );
          })}
      </section>
      <div className="flex gap-4">
        {isBookmarkedLoading ? (
          <Skeleton className="bg-gray-400 h-30 w-30" />
        ) : (
          <button
            className="flex bg-blue-700 text-white px-4 py-1 rounded-full w-32 text-center justify-center"
            onClick={isBookmarked ? () => unbookmark() : () => bookmark()}
          >
            {isBookmarked ? "عدم الحفظ" : "حفظ المقال"}
          </button>
        )}
        {session &&
          session.user &&
          (session!.user?.user_id === article!.user_id ||
            session!.user.role === "admin") && (
            <button
              className="flex bg-red-700 text-white px-4 py-1 rounded-full w-32 text-center justify-center"
              onClick={() => {
                onDeleteArticle();
              }}
            >
              حذف المقال
            </button>
          )}
      </div>
      <CommentSection article={article!} />
    </div>
  );
}
