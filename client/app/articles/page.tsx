import Image from "next/image";
import Article from "@/models/article";
import ArticleCard from "./articleCard";
const articles: Article[] = [
  {
    id: 1,
    title: "العنوان",
    subtitle: "وصف مختصر عن المقالة من الكاتب",
    content: "المحتوى",
    date: "الاثنين، 21 سبتمبر 2023",
    tags: ["تقنية", "مطاعم", "توصيل"],
    image: "next.svg",
  },
  {
    id: 2,
    title: "العنوان",
    subtitle: "وصف مختصر عن المقالة من الكاتب",
    content: "المحتوى",
    date: "الاثنين، 21 سبتمبر 2023",
    tags: ["تقنية", "مطاعم", "توصيل"],
    image: "next.svg",
  },
];
export default async function Articles() {
  // fetch data from server

  return (
    // TODO: map through the elements and show them
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-white text-5xl text-center font-semibold">
          <span>المقالات</span>
        </div>
        <hr />
      </div>
      <div className="my-8 text-2xl font-semibold text-right mx-10 text-white">
        <p>اخر المقالات</p>
      </div>
      <div className="flex flex-col gap-10">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.id} />;
        })}
      </div>
    </>
  );
}
