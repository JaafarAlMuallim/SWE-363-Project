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
        {/* large screens*/}
        <div className="h-screen w-screen text-content hidden md:flex">
          <div className="w-1/4 m-10 flex flex-col items-center gap-8">
            <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
              <Image
                className="rounded-full m-2"
                src={profile?.data.user_image ?? "/profile_default.png"}
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
                  onClick={() => changeFollowStatus()}
                >
                  {isFollowing.data.isFollowing ? "الغاء متابعة" : "متابعة"}
                </button>
                <button
                  onClick={() => changeRoleStatus()}
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
            <div className="w-full h-fit rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
              overview هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى)
              ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال
              المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة
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
              src={profile?.data.user_image ?? "/profile_default.png"}
              alt="profile"
              height={128}
              width={128}
            />
            <Label className="font-bold text-xl m-2" dir="ltr">
              @{profile?.data.username}
            </Label>
            <Label className="font-bold text-2xl m-2">
              {profile?.data.name}
            </Label>
            <Label className="text-lg m-2">{profile?.data.role}</Label>
            <div className="flex gap-4">
              <button
                onClick={() => changeFollowStatus()}
                className="bg-cbtn text-content rounded-lg p-2 m-2"
              >
                {isFollowing.data.isFollowing ? "الغاء المتابعة" : "متابعة"}
              </button>
              <button
                onClick={() => changeRoleStatus()}
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
          {/*overview here*/}
          <div className="w-80 h-fit m-8 rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
            overview
          </div>
        </div>
      </div>
    </div>
  );
}
