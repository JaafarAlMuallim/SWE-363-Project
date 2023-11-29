"use client";
import { Label } from "@/components/ui/label";
import User from "@/models/user";
import { useEffect, useState } from "react";

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
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="h-screen w-screen text-content flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-64 m-8 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
        <Label className="font-bold text-xl m-2" dir="ltr">
          @{profile?.username}
        </Label>
        <Label className="font-bold text-2xl m-2">{profile?.name}</Label>
        <Label className="text-lg m-2">{profile?.role}</Label>
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
    </div>
  );
}
