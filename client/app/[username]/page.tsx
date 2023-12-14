"use client";
import Image from "next/image";
import { useMutation, useQueries, useQuery } from "react-query";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/app/components/QueryProvider";
import Article from "@/models/article";
import Link from "next/link";
import ArticleCard from "@/app/components/ArticleCard2";
import { useToast } from "@/components/ui/use-toast";
import User from "@/models/user";
export default function Profile({ params }: { params: { username: string } }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  // fetch user's data
  const [profile, isFollowing] = useQueries([
    {
      queryKey: "profile",
      queryFn: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/profile/${params.username}`,
            {
              method: "GET",
              credentials: "include",
              next: { revalidate: 60 },
            },
          );
          return res.json() as Promise<User>;
        } catch (error) {
          console.log(error);
        }
      },
      cacheTime: 8,
    },
    {
      enabled: session !== undefined && session?.user !== null,
      queryKey: "following",
      queryFn: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/user/following/${params.username}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${session!.user.user_id}`,
              },
            },
          );
          const data = await res.json();
          return data!;
        } catch (err) {
          console.log(err);
        }
      },
      cacheTime: 8,
    },
  ]);
  // useMutation
  const { mutate: changeFollowStatus } = useMutation({
    mutationKey: "following",
    mutationFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/user/follow/${profile.data!.user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session!.user.user_id}`,
            },
          },
        );
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      toast({
        title: "تمت المتابعة بنجاح",
        description: `تمت متابعة ${profile!.data!!.name}`,
        className: "bg-green-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("following");
    },
    onMutate: () => {
      queryClient.setQueryData("following", {
        ...isFollowing.data!,
        isFollowing: !isFollowing.data!.isFollowing,
      });
    },
  });
  const { mutate: changeRoleStatus } = useMutation({
    mutationKey: "profile",
    mutationFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/user/changeRole/${profile.data!!.user_id}`,
          {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
              role: profile?.data!?.role === "reviewer" ? "user" : "reviewer",
            }),
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session!.user.user_id}`,
            },
          },
        );
        return res.json() as Promise<User>;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      toast({
        title:
          profile?.data!!.role === "reviewer"
            ? "تمت الترقية بنجاح"
            : "تمت التخفيض بنجاح",
        description:
          profile?.data!!.role === "reviewer"
            ? `تمت ترقية ${profile.data!!.name}`
            : `تمت تخفيض ${profile.data!!.name}`,

        className:
          profile.data!!.role === "reviewer"
            ? "bg-green-700 text-white"
            : "bg-red-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("profile");
    },
    onMutate: () => {
      queryClient.setQueryData("profile", {
        ...profile.data!,
        role: profile.data!!.role === "reviewer" ? "user" : "reviewer",
      });
    },
  });

  const {
    data: articles,
    isLoading: articleLoading,
    isSuccess: articleSuccess,
  } = useQuery({
    queryKey: "articlesByUser",
    enabled: profile.isSuccess,
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/article/user/${profile.data!!.user_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        return res.json() as Promise<Article[]>;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="h-screen w-screen text-content hidden md:flex">
        <div className="w-1/4 m-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            {profile.isLoading ? (
              <Skeleton className="bg-gray-400 rounded-full m-2" />
            ) : (
              <Image
                className="rounded-full m-2"
                src={profile.data?.user_image!}
                alt="profile"
                height={228}
                width={228}
              />
            )}
            {profile.isLoading ? (
              <div className="flex flex-col">
                <Skeleton className="font-bold text-2xl m-2 bg-gray-400" />
                <Skeleton className="font-bold text-3xl m-2 bg-gray-400" />
                <Skeleton className="text-xl m-2 bg-gray-400" />
              </div>
            ) : (
              <>
                <Label className="font-bold text-2xl m-2" dir="ltr">
                  @{profile?.data!.username}
                </Label>
                <Label className="font-bold text-3xl m-2">
                  {profile.data!.name}
                </Label>
                <Label className="text-xl m-2">{profile.data!.role}</Label>
              </>
            )}
            <div className="flex gap-4 m-4">
              {isFollowing.isLoading ? (
                <Skeleton className="bg-cbtn text-content text-lg rounded-lg p-2" />
              ) : (
                <button
                  className="bg-cbtn text-content rounded-lg p-2 m-2"
                  onClick={() => changeFollowStatus()}
                >
                  {isFollowing.isSuccess && isFollowing.data!.isFollowing
                    ? "الغاء متابعة"
                    : "متابعة"}
                </button>
              )}
              {profile.isLoading ? (
                <Skeleton className="bg-cbtn text-content text-lg rounded-lg p-2" />
              ) : profile.data!.role === "reviewer" ? (
                <button
                  onClick={() => changeRoleStatus()}
                  className="bg-red-700 text-content rounded-lg p-2 m-2"
                >
                  مستخدم عادي
                </button>
              ) : (
                session &&
                session?.user &&
                session?.user.role === "admin" && (
                  <button
                    onClick={() => changeRoleStatus()}
                    className="bg-green-700 text-content rounded-lg p-2 m-2"
                  >
                    ترقية لمراجع محتوى
                  </button>
                )
              )}
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
          </div>
        </div>
        <div className="w-3/4 p-4 m-8 flex flex-col gap-8">
          <div className="w-full h-fit rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
            {profile?.isLoading ? (
              <Skeleton className="w-80 h-8" />
            ) : profile?.isSuccess ? (
              profile?.data!.overview
            ) : (
              <>لا توجد معلومات هنا</>
            )}
          </div>
          <h1 className="text-2xl">
            Articles By{" "}
            {profile?.isLoading ? (
              <Skeleton className="w-36 h-6" />
            ) : profile?.isSuccess ? (
              profile?.data!.name
            ) : (
              <></>
            )}
          </h1>
          <div className="container my-12 mx-auto px-4 md:px-12">
            <div className="h-screen flex flex-wrap justify-start gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
              {articleLoading ? (
                <>
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                </>
              ) : articleSuccess ? (
                articles!.map((article) => {
                  return (
                    <Link
                      key={article.article_id}
                      href={`/articles/${article.article_id}`}
                    >
                      <ArticleCard article={article} />
                    </Link>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen w-screen text-content flex flex-col items-center md:hidden">
        <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
          {profile.isLoading ? (
            <Skeleton className="rounded-full m-2 bg-gray-400" />
          ) : (
            <Image
              priority
              className="rounded-full m-2"
              src={profile.data?.user_image!}
              alt="profile"
              height={128}
              width={128}
            />
          )}
          {profile.isLoading ? (
            <div className="flex flex-col">
              <Skeleton className="font-bold text-xl m-2 bg-gray-400" />
              <Skeleton className="font-bold text-2xl m-2 bg-gray-400" />
              <Skeleton className="text-lg m-2 bg-gray-400" />
            </div>
          ) : (
            <>
              <Label className="font-bold text-xl m-2" dir="ltr">
                @{profile?.data!.username}
              </Label>
              <Label className="font-bold text-2xl m-2">
                {profile?.data!.name}
              </Label>
              <Label className="text-lg m-2">{profile?.data!.role}</Label>
            </>
          )}
          <div className="flex gap-4">
            {isFollowing.isLoading ? (
              <Skeleton className="bg-cbtn text-content rounded-lg p-2 m-2" />
            ) : (
              <button
                onClick={() => changeFollowStatus()}
                className="bg-cbtn text-content rounded-lg p-2 m-2"
              >
                {isFollowing.isSuccess && isFollowing.data!.isFollowing
                  ? "الغاء المتابعة"
                  : "متابعة"}
              </button>
            )}
            {profile.isLoading ? (
              <Skeleton className="bg-cbtn text-content text-lg rounded-lg p-2" />
            ) : profile.data!.role === "reviewer" ? (
              <button
                onClick={() => changeRoleStatus()}
                className="bg-red-700 text-content rounded-lg p-2 m-2"
              >
                مستخدم عادي
              </button>
            ) : (
              <button
                onClick={() => changeRoleStatus()}
                className="bg-green-700 text-content rounded-lg p-2 m-2"
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
        </div>
        <div className="w-80 h-fit m-8 rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
          {profile?.isLoading ? (
            <Skeleton className="w-80 h-8" />
          ) : profile?.isSuccess ? (
            profile?.data!.overview
          ) : (
            <>لا توجد معلومات هنا</>
          )}
        </div>
      </div>
    </>
  );
}
