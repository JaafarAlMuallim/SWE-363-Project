"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import User from "@/models/user";
export default function Profile({ params }: { params: { username: string } }) {
  const [profile, setProfile] = useState<User | null>(null);
  const [follow, setFollow] = useState<boolean>(false);
  useEffect(() => {
    fetch(`http://localhost:8080/profile/${params.username}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data;
        setProfile(data);
      })
      .catch((err) => console.log(err));
    fetch(`http://localhost:8080/user/following/${params.username}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) setFollow(true);
      })
      .catch((err) => {});
  }, []);

  const followUser = (id: String) => {
    fetch(`http://localhost:8080/user/follow/${id}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data;
        setFollow(true);
      })
      .catch((err) => {});
  };
  const unfollowUser = (id: String) => {
    fetch(`http://localhost:8080/user/unfollow/${id}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data;
        setFollow(false);
      })
      .catch((err) => {});
  };

  const upgradeToContentReviewer = () => {
    fetch(`http://localhost:8080/user/changeRole/${profile!.user_id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({ role: "reviewer" }),
    })
      .then((res) => res.json())
      .then((data) => {
        data;
        console.log(data);
      })
      .catch((err) => {});
  };

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
          @{profile?.username}
        </Label>
        <Label className="font-bold text-2xl m-2">{profile?.name}</Label>
        <Label className="text-lg m-2">{profile?.role}</Label>
        <div className="flex">
          <button
            onClick={
              follow
                ? () => unfollowUser(profile?.user_id!)
                : () => followUser(profile?.user_id!)
            }
            className="bg-gcontent2 text-content rounded-lg w-24 h-8 m-2"
          >
            {follow ? "الغاء المتابعة" : "متابعة"}
          </button>
          <button
            onClick={() => upgradeToContentReviewer()}
            className="bg-gcontent2 text-content rounded-lg w-40 h-8 m-2"
          >
            ترقية لمراجع محتوى
          </button>
        </div>
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
        <div className="flex flex-col m-4 justify-center items-center"></div>
      </div>
    </div>
  );
}
