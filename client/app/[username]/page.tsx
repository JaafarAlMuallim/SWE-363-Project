"use client";
import { Label } from "@/components/ui/label";
import User from "@/models/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import followUser from "../server-actions/follow";

export default function Profile({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<User | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8080/profile/`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data;
        setProfile(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen w-screen text-content flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
        <Image
          className="rounded-full m-2"
          src={profile?.user_image ?? "/profile_default.png"}
          alt="profile"
          height={128}
          width={128}
        />
        <Label className="font-bold text-xl m-2" dir="ltr">
          @{profile?.username}
        </Label>
        <Label className="font-bold text-2xl m-2">{profile?.name}</Label>
        <Label className="text-lg m-2">{profile?.role}</Label>

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

//  <div className="flex">
//    <button
//      onClick={() => followUser(profile?.user_id)}
//      className="bg-gcontent2 text-content rounded-lg w-24 h-8 m-2"
//    >
//      متابعة
//    </button>
//    <button
//      onClick={() => followUser(profile?.user_id)}
//      className="bg-gcontent2 text-content rounded-lg w-40 h-8 m-2"
//    >
//      ترقية لمراجع محتوى
//    </button>
//  </div>
//</div>
