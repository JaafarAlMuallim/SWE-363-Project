import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";
export default async function Articles() {
  const res = await fetch("http://localhost:8080/article/published", {
    method: "GET",
    credentials: "include",
    cache: "no-cache",
  });
  const articles = (await res.json()) as Article[];
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
        {articles.map((article) => {
          return (
            <ArticleCard
              article={article}
              key={article.article_id}
              link={"articles"}
            />
          );
        })}
      </div>
    </>
  );
}
