import Article from "@/models/article";
import Tag from "@/models/tag";
import ArticleCard from "../components/ArticleCard2";
export default async function Articles() {
  // const res = await fetch("http://localhost:8080/article/published", {
  //   method: "GET",
  //   credentials: "include",
  //   next: { revalidate: 120 },
  // });
  // const articles = (await res.json()) as Article[];
  const tags: Tag[] = [
    {
      tag_id: "1",
      article_id: "1",
      tag: "فقازة"
    },
    {
      tag_id: "2",
      article_id: "2",
      tag: "ادارة"
    }
  ]
  const articles: Article[] = [
    {
      article_id: "1",
      title: "فن الادارة في الكسالة",
      subtitle: "دموع الفقازة في عين النحاسة",
      content: "المحتوى",
      date: "الاثنين، 21 سبتمبر 2023",
      article_tags: tags,
      article_image: "/test.jpg",
      likes: 4,
      user_id: "زعتبر"
    },
    {
      article_id: "2",
      title: "عنوان الزمان في بحر الحنان",
      subtitle: "اسطورة الاشواق في ميزان الافاق",
      content: "المحتوى",
      date: "الاثنين، 21 سبتمبر 2023",
      article_tags: tags,
      article_image: "/test.jpg",
      likes: 89,
      user_id: "بردقا"
    },
  ];
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
                <ArticleCard article={article} key={article.article_id} />
                );
              })}
        </div>
      </div>
    </>
  );
}
