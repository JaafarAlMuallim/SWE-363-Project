import Article from "@/models/article";
import Tag from "@/models/tag";
import ArticleCard from "../components/ArticleCard2";
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
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
      </div>
    </>
  );
}
