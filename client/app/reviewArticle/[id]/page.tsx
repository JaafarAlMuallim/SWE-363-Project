"use client";
import Article from "@/models/article";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { useEffect } from "react";

export default function Article({ params }: { params: { id: string } }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return { redirect: "/auth/callbackUrl=/reviewArticle" };
    },
  });
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session)
        router.push(`/auth?callbackUrl=/reviewArticle/${params.id}`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
  const { data: article, isLoading } = useQuery({
    queryKey: "inReview",
    queryFn: () => {
      return fetch(`http://localhost:8080/article/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const handleChange = (newStatus: string) => {
    fetch(
      `http://localhost:8080/article/${article?.article_id}/changeArticleStatus`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        body: JSON.stringify({
          article_status: newStatus,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
        <Image src={`../next.svg`} alt={"Image"} width={400} height={400} />
        <>
          <Skeleton className="w-96 h-6" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-96 h-48" />
          <section className="flex justify-center gap-2">
            <button
              className="bg-crd2 text-white px-4 py-1 rounded-full inline w-24 text-center"
              onClick={() => {
                handleChange("published");
                router.push("/articles");
              }}
            >
              قبول
            </button>
            <button
              className="bg-crd2 text-white px-4 py-1 rounded-full inline w-24 text-center"
              onClick={() => {
                handleChange("rejected");
                router.push("/reviewArticle");
              }}
            >
              رفض
            </button>
          </section>
        </>
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
      <p>{date}</p>
      <section className="flex justify-center gap-2">
        {article!.article_tags &&
          article!.article_tags!.map((tag: any, index: any) => {
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

      <div className="flex gap-8">
        <Button
          type="submit"
          className="bg-green-800"
          onClick={() => {
            handleChange("published");
            router.push("/articles");
          }}
        >
          قبول
        </Button>
        <Button
          type="button"
          className="bg-orange-800"
          onClick={() => {
            handleChange("rejected");
            router.push("/reviewArticle");
          }}
        >
          رفض
        </Button>
      </div>
    </div>
  );
}
