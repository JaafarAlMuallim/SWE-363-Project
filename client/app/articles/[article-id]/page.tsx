import Article from "@/models/article";
import Image from "next/image";

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

const colors = [
  "bg-red-300 text-red-600",
  "bg-pink-300 text-pink-600",
  "bg-rose-300 text-rose-600",
  "bg-fuchsia-300 text-fuchsia-600",
  "bg-purple-300 text-purple-600",
  "bg-violet-300 text-violet-600",
  "bg-indigo-300 text-indigo-600",
  "bg-blue-300 text-blue-600",
  "bg-cyan-300 text-cyan-600",
  "bg-teal-300 text-teal-600",
  "bg-emerald-300 text-emerald-600",
  "bg-green-300 text-green-600",
  "bg-lime-300 text-lime-600",
  "bg-yellow-300 text-yellow-600",
  "bg-orange-300 text-orange-600",
  "bg-amber-300 text-amber-600",
  "bg-gray-300 text-gray-600",
];
export default function Article({
  params,
}: {
  params: { article_id: string };
}) {
  console.log(params.article_id);
  // fetch the article with the id of params.article_id
  let article: Article;
  if (params.article_id === "1") {
    article = articles[0];
  } else {
    article = articles[1];
  }

  return (
    <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
      <Image
        src={`../${article.image!}`}
        alt={"Image"}
        width={400}
        height={400}
      />
      <h1 className="text-4xl text-center">{article.title}</h1>
      <p>{article.subtitle}</p>
      <p>{article.content}</p>
      <p>{article.date}</p>
      <section className="flex justify-center gap-2">
        {article.tags!.map((tag, index) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          colors.splice(colors.indexOf(randomColor), 1);
          console.log(colors);
          console.log(randomColor);
          return (
            <div
              key={index}
              className={`${randomColor} px-4 py-1 rounded-full inline w-24 text-center`}
            >
              {tag}
            </div>
          );
        })}
      </section>
      <p>Author Card To be implemented with About us page before</p>
    </div>
  );
}