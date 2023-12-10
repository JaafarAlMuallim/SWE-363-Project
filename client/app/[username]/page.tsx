"use client";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Profile({ params }: { params: { username: string } }) {
  const { data: profile } = useSession();
  return (
    <div className="h-screen w-screen text-content flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
        <Image
          className="rounded-full m-2"
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
          <div className="flex flex-col m-4 justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
}
