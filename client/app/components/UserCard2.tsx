import React from "react";
import Image from "next/image";
import User from "@/models/user";

export default function UserCard({ user }: { user: User }) {
  return (
    <>
      <div className="bg-gradient-to-br from-crd to-crd2 p-5 w-64 rounded-lg flex flex-col gap-2 m-3">
        <Image
          priority
          src={user.user_image!}
          alt="profile"
          width={800}
          height={800}
        ></Image>
        <div className="text-3xl text-content">{user.name}</div>
        <div className="text-2xl text-content">
          {user.role === "admin"
            ? "مسؤول"
            : user.role === "reviewer"
              ? "مراجع محتوى"
              : "مستخدم عادي"}
        </div>
        <div className="flex flex-row content-center justify-center gap-4 text-ellipsis">
          {user.overview}
        </div>
      </div>
    </>
  );
}
