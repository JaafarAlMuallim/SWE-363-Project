"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile({ params }: { params: { username: string } }) {
  const { data: profile } = useSession();
  if (!profile) return <Skeleton className="h-screen w-screen bg-gray-400" />;
  return (
    <>
      <div className="h-screen w-screen text-content hidden md:flex">
        <div className="w-1/4 m-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            <Image
              className="rounded-full my-2"
              src={"/profile_default.png"}
              alt="profile"
              height={228}
              width={228}
            />
            <Label className="font-bold text-2xl m-2" dir="ltr">
              @{profile?.user.username}
            </Label>
            <Label className="font-bold text-3xl m-2">
              {profile.user.name}
            </Label>
            <Label className="text-xl m-2">{profile.user.role}</Label>
          </div>
          <div className="grid grid-cols-3 w-fit text-content items-center gap-4 border rounded-lg border-gcontent2">
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
        </div>
        <div className="w-3/4 p-4 m-8 flex flex-col gap-8">
          <div className="w-full h-fit rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
            هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
            في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص
            الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة
          </div>
          <h1>articles</h1>
        </div>
      </div>

      <div className="h-screen w-screen text-content flex flex-col items-center md:hidden">
        <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
          <Image
            className="rounded-full my-2"
            src={"/profile_default.png"}
            alt="profile"
            height={128}
            width={128}
          />
          <Label className="font-bold text-xl m-2" dir="ltr">
            @{profile?.user.username}
          </Label>
          <Label className="font-bold text-2xl m-2">{profile?.user.name}</Label>
          <Label className="text-lg m-2">{profile?.user.role}</Label>
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
        {/*overview here*/}
        <div className="w-80 h-fit m-8 rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
          هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في
          صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص
          الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة
        </div>
      </div>
    </>
  );
}
