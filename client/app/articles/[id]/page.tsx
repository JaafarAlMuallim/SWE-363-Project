import Article from "@/models/article";
import Image from "next/image";
import CommentInput from "./CommentInput";
import Link from "next/link";

export default async function Article({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:8080/article/${params.id}`, {
    method: "GET",
    next: {
      revalidate: 5,
    },
  });
  const article = (await res.json()) as Article;
  console.log(article);
  const date = new Date(article.date!);
  const handleComment = async (content: string, bearer: string) => {
    "use server";
    const res = await fetch(
      `http://localhost:8080/article/comment/${params.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
        body: JSON.stringify({
          content: content,
        }),
      },
    );
    const data = await res.json();
  };
  return (
    <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
      <Image src={`../next.svg`} alt={"Image"} width={400} height={400} />
      <h1 className="text-4xl text-center">{article.title}</h1>
      <p>{article.subtitle}</p>
      <p>{article.content}</p>
      <p>{date.toISOString().substring(0, 10)}</p>
      <section className="flex justify-center gap-2">
        {article.article_tags &&
          article.article_tags!.map((tag, index) => {
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
      <CommentInput handleSubmit={handleComment} />
      <section className="flex flex-col justify-center gap-2">
        {article.comment &&
          article.comment.map((comment, index) => {
            console.log(comment);
            return (
              <div key={index} className="flex flex-col gap-2">
                <p>{comment.content}</p>
                <p>{comment.date}</p>
                <p>{comment.user.username}</p>
                {<Link href="#">edit</Link>}
              </div>
            );
          })}
      </section>
    </div>
  );
}
