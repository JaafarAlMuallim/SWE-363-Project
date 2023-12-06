import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";

export default async function ReviewArticle() {
  const response = await fetch("http://localhost:8080/article/drafted", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const draftedArticles: Article[] = await response.json();

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
        {draftedArticles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}
