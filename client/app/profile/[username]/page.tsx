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
  return (
    <div>
      {/* large screens*/}
      <div className="h-screen w-screen text-content hidden md:flex">
        <div className="w-1/4 m-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            <Image
              className="rounded-full m-2"
              src={profile?.user_image ?? "/profile_default.png"}
              alt="profile"
              height={228}
              width={228}
            />
            <Label className="font-bold text-2xl m-2" dir="ltr">
              @hamza
            </Label>
            <Label className="font-bold text-3xl m-2">عنتر</Label>
            <Label className="text-xl m-2">كاتب</Label>
            <div className="flex gap-4 m-4">
              <button
                className="bg-cbtn text-content text-lg rounded-lg p-2"
                onClick={
                  follow
                    ? () => unfollowUser(profile?.user_id!)
                    : () => followUser(profile?.user_id!)
                }
              >
                {follow ? "الغاء متابعة" : "متابعة"}
              </button>
              <button
                onClick={() => followUser(profile?.user_id!)}
                className="bg-cbtn text-content text-lg rounded-lg p-2"
                >
                ترقية لمراجع محتوى
              </button>
            </div>
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
            {/* <div className="flex flex-col m-4 justify-center items-center"></div> */}
          </div>
        </div>
        <div className="w-3/4 p-4 m-8 flex flex-col gap-8">
          {/*overview here*/}
          <div className="w-full h-36 rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
            overview
          </div>
          {/*articles here*/}
          <h1>articles</h1>
        </div>
      </div>

      {/* small screens */}
      <div className="h-screen w-screen text-content flex flex-col items-center md:hidden">
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
          <div className="flex gap-4">
            <button
              onClick={
                follow
                  ? () => unfollowUser(profile?.user_id!)
                  : () => followUser(profile?.user_id!)
              }
              className="bg-cbtn text-content rounded-lg p-2 m-2"
            >
              {follow ? "الغاء المتابعة" : "متابعة"}
            </button>
            <button
              onClick={() => followUser(profile?.user_id!)}
              className="bg-cbtn text-content rounded-lg p-2 m-2"
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
          {/* <div className="flex flex-col m-4 justify-center items-center"></div> */}
        </div>
      </div>
    </div>
  );
}
