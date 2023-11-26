import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";
// const articles: Article[] = [
//   {
//     id: 1,
//     title: "العنوان",
//     subtitle: "وصف مختصر عن المقالة من الكاتب",
//     content: "المحتوى",
//     date: "الاثنين، 21 سبتمبر 2023",
//     tags: ["تقنية", "مطاعم", "توصيل"],
//     image: "next.svg",
//     likes: 4,
//   },
//   {
//     id: 2,
//     title: "العنوان",
//     subtitle: "وصف مختصر عن المقالة من الكاتب",
//     content: "المحتوى",
//     date: "الاثنين، 21 سبتمبر 2023",
//     tags: ["تقنية", "مطاعم", "توصيل"],
//     image: "next.svg",
//     likes: 89,
//   },
// ];
export default async function Articles() {
  const res = await fetch("http://localhost:8080/article", {
    method: "GET",
    credentials: "include",
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
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}
