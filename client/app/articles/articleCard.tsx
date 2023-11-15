import Image from "next/image";
import Article from "@/models/article";
import Link from "next/link";

export default function ArticleCard(props: { article: Article }) {
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
  return (
    <Link href={`/articles/${props.article.id}`}>
      <div className="my-5 mx-5 shadow-xl px-10 rounded-lg bg-slate-800 py-20">
        <Image
          src={props.article.image!}
          alt=""
          className="rounded my-10"
          width={320}
          height={320}
        />
        <div className="my-2 text-xl font-semibold text-right text-purple-500">
          <p>{props.article.date}</p>
        </div>
        <div className="my-3 text-2xl font-semibold text-right text-white">
          <p>{props.article.title}</p>
        </div>
        <div className="my-5 text-xl font-semibold text-right text-white">
          <p className="">{props.article.subtitle}</p>
        </div>
        <section className="flex justify-center gap-2">
          {props.article.tags!.map((tag, index) => {
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
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
      </div>
    </Link>
  );
}
