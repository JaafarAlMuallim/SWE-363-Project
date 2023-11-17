"use client"

import { Label } from "@/components/ui/label"
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";
import { Avatar } from "@material-tailwind/react";

const articles: Article[] = [
    {
      id: 1,
      title: "ميزان البزنس في الاطلس",
      subtitle: "وصف مختصر عن المقالة من الكاتب",
      content: "المحتوى",
      date: "الاثنين، 21 سبتمبر 2023",
      tags: ["تقنية", "مطاعم", "توصيل"],
      image: "/test.jpg",
      likes: 89,
    },
    {
      id: 2,
      title: "باب التداول في التسائل",
      subtitle: "وصف مختصر عن المقالة من الكاتب",
      content: "المحتوى",
      date: "الاثنين، 21 سبتمبر 2023",
      tags: ["تقنية", "مطاعم", "توصيل"],
      image: "/test.jpg",
      likes: 9,
    },
];

export default function Profile() {
    return (
        <div className="h-screen w-screen text-white flex flex-col items-center">
            <div className="flex flex-col justify-center items-center w-64 m-8 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
                {/* <img src="bukha.png" className="m-4" /> */}
                <Avatar src="bukha.png" alt="avatar" size="xxl" className="m-4 shadow-lg" withBorder={true} variant="circular"/>
                <Label className="font-bold text-xl m-2" dir="ltr">@Ahmed</Label>
                <Label className="font-bold text-2xl m-2">أحمد عبدالعال</Label>
                <Label className="text-lg m-2">كاتب | مبرمج</Label>
            </div>

            <div className="grid grid-cols-3 w-80 mx-4 text-base items-center gap-4 border rounded-lg border-gray-400">
                <div className="flex flex-col m-4 justify-center items-center">
                    <Label className="font-bold m-1">3</Label>
                    <Label className="m-1 text-gray-400">متابَعون</Label>
                    
                </div>
                <div className="flex flex-col m-4 justify-center items-center">
                    <Label className="font-bold m-1">3220</Label>
                    <Label className="m-1 text-gray-400">متابعا</Label>
                </div>
                <div className="flex flex-col m-4 justify-center items-center">
                    <Label className="font-bold m-1">70</Label>
                    <Label className="m-1 text-gray-400">مقال</Label>
                </div>
            </div>
            
            <div className="w-full m-8 gap-8 h-8 flex flex-col items-center">
                {articles.map((article) => {
                    return <ArticleCard article={article} key={article.id} />;
                })}
            </div>
        </div>
    )
}