"use client";
import { Label } from "@/components/ui/label";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard";
import { Avatar } from "@material-tailwind/react";

export default function Profile() {
  return (
    <div className="h-screen w-screen text-content flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-64 m-8 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
        <Avatar
          src="bukha.png"
          alt="avatar"
          size="xxl"
          className="m-4 shadow-lg"
          withBorder={true}
          variant="circular"
        />
        <Label className="font-bold text-xl m-2" dir="ltr">
          @Ahmed
        </Label>
        <Label className="font-bold text-2xl m-2">أحمد عبدالعال</Label>
        <Label className="text-lg m-2">كاتب | مبرمج</Label>
      </div>

      <div className="grid grid-cols-3 w-80 mx-4 text-base items-center gap-4 border rounded-lg border-gcontent2">
        <div className="flex flex-col m-4 justify-center items-center">
          <Label className="font-bold m-1">3</Label>
          <Label className="m-1 text-gcontent2">متابَعون</Label>
        </div>
        <div className="flex flex-col m-4 justify-center items-center">
          <Label className="font-bold m-1">3220</Label>
          <Label className="m-1 text-gcontent2">متابعا</Label>
        </div>
        <div className="flex flex-col m-4 justify-center items-center">
          <Label className="font-bold m-1">70</Label>
          <Label className="m-1 text-gcontent2">مقال</Label>
        </div>
      </div>
      {/* <div className="w-full m-8 gap-8 h-8 flex flex-col items-center">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </div>*/}
    </div>
  );
}
