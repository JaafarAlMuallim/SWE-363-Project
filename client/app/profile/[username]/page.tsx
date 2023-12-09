"use client";
import Image from "next/image";
import { useMutation, useQueries, useQuery } from "react-query";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/app/components/QueryProvider";
export default function Profile({ params }: { params: { username: string } }) {
  const { data: session } = useSession();
  const [profile, isFollowing] = useQueries([
    {
      queryKey: "profile",
      queryFn: () => {
        return fetch(`http://localhost:8080/profile/${params.username}`, {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            data;
            return data;
          })
          .catch((err) => console.log(err));
      },
      cacheTime: 8,
    },
    {
      enabled: session !== undefined && session?.user !== null,
      queryKey: "following",
      queryFn: () => {
        return fetch(
          `http://localhost:8080/user/following/${params.username}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session!.user.user_id}`,
            },
          },
        )
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((err) => console.log(err));
      },
      cacheTime: 8,
    },
  ]);
  // useMutation
  const {
    mutate: changeFollowStatus,
    isLoading: followingLoading,
    isSuccess: followingSuccess,
  } = useMutation({
    mutationKey: "following",
    mutationFn: () => {
      return fetch(
        `http://localhost:8080/user/follow/${profile.data.user_id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session!.user.user_id}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries("following");
    },
    onMutate: () => {
      queryClient.setQueryData("following", {
        ...isFollowing.data,
        isFollowing: !isFollowing.data.isFollowing,
      });
    },
  });
  const { mutate: changeRoleStatus } = useMutation({
    mutationKey: "profile",
    mutationFn: () => {
      return fetch(
        `http://localhost:8080/user/changeRole/${profile.data.user_id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ role: "reviewer" }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session!.user.user_id}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          data;
        })
        .catch((err) => {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });

  return (
    <div className="h-screen w-screen text-content flex flex-col items-center">
      <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
        {profile.isLoading ? (
          <Skeleton className="bg-gray-400 h-32 w-32 rounded-full m-2" />
        ) : (
          <Image
            className="rounded-full m-2"
            src={"/profile_default.png"}
            alt="profile"
            height={128}
            width={128}
          />
        )}
        <Label className="font-bold text-xl m-2" dir="ltr">
          {profile.isLoading ? (
            <Skeleton className="bg-gray-400 h-6 w-20" />
          ) : (
            `@${profile?.data.username}`
          )}
        </Label>
        <Label className="font-bold text-2xl m-2">
          {profile.isLoading ? (
            <Skeleton className="bg-gray-400 h-6 w-20" />
          ) : (
            `${profile?.data.name}`
          )}
        </Label>
        {profile?.isSuccess && profile?.data.role !== "reviewer" && (
          <Label className="text-lg m-2">{profile?.data.role}</Label>
        )}
        <div className="flex">
          {session && (
            <button
              className="bg-gcontent2 text-content rounded-lg w-24 h-8 m-2"
              onClick={() => changeFollowStatus()}
            >
              {isFollowing.isLoading ? (
                <Skeleton className="bg-gray-400 h-8 w-24" />
              ) : isFollowing?.data.isFollowing ? (
                "الغاء المتابعة"
              ) : (
                "متابعة"
              )}
            </button>
          )}

          {profile?.isSuccess &&
            profile?.data.role !== "reviewer" &&
            session?.user.role === "admin" && (
              <button
                onClick={() => changeRoleStatus()}
                className="bg-gcontent2 text-content rounded-lg w-40 h-8 m-2"
              >
                ترقية لمراجع محتوى
              </button>
            )}
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
