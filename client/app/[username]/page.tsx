"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueries } from "react-query";
import User from "@/models/user";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "../components/QueryProvider";
import {} from "react-query";
import { useState } from "react";
import EditProfileModa from "../components/EditProfileModal";
import Link from "next/link";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard2";
import ProfileStats from "@/models/profile_stats";
import { toast, useToast } from "@/components/ui/use-toast";

export default function Profile({ params }: { params: { username: string } }) {
  const { data: profile } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [
    { data: userProfile, isLoading, isSuccess },
    { data: stats, isLoading: statsLoading, isSuccess: statsSuccess },
  ] = useQueries([
    {
      enabled: profile !== undefined && profile?.user !== null,
      queryKey: "userProfile",
      queryFn: () => {
        return fetch(`http://localhost:8080/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${profile?.user.user_id}`,
          },
        }).then((res) => res.json() as Promise<User>);
      },
    },
    {
      enabled: profile !== undefined && profile?.user !== null,
      queryKey: "profileStats",
      queryFn: () => {
        return fetch(`http://localhost:8080/profile/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${profile?.user.user_id}`,
          },
        }).then((res) => res.json() as Promise<ProfileStats>);
      },
    },
  ]);

  const { mutate: handleEditProfileMutation } = useMutation({
    mutationKey: "userProfile",
    mutationFn: (data: User) => {
      handleCancel();
      return fetch(`http://localhost:8080/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${profile?.user.user_id}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json() as Promise<User>);
    },
    onSuccess: () => {
      toast({
        title: "تم تعديل الملف الشخصي بنجاح",
        description: "تم حفظ الملف الشخصي الجديد بنجاح",
        className: "bg-green-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("userProfile");
    },
    onMutate: (data) => {
      queryClient.setQueryData("userProfile", (oldData: any) => {
        return {
          ...oldData,
          ...data,
        };
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
  const { data: articles, isLoading: articleLoading } = useQuery({
    enabled: profile !== undefined && profile?.user !== null,
    queryKey: "articlesByUser",
    queryFn: () => {
      return fetch(`http://localhost:8080/article/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${profile?.user.user_id}`,
        },
      }).then((res) => res.json() as Promise<Article[]>);
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full">
      <div className=" text-content hidden md:flex">
        <div className="w-1/4 m-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            <Image
              className="rounded-full my-2"
              src={"/profile_default.png"}
              alt="profile"
              height={228}
              width={228}
            />
            <div className="flex flex-col items-center justify-center gap-4">
              {isLoading ? (
                <>
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-40 h-6" />
                </>
              ) : isSuccess ? (
                <>
                  <Label className="font-bold text-2xl" dir="ltr">
                    @{userProfile!.username}
                  </Label>
                  <Label className="text-xl">{userProfile!.name}</Label>
                  <Label className="text-xl m-2">{userProfile!.role}</Label>
                  <button
                    className="bg-gcontent2 text-white rounded-lg px-4 py-2 m-2"
                    onClick={() => {
                      handleEditProfile();
                    }}
                  >
                    تعديل الملف الشخصي
                  </button>
                  <Link
                    className="bg-gcontent2 text-white rounded-lg px-4 py-2 m-2"
                    href="/bookmarks"
                  >
                    المقالات المفضلة
                  </Link>
                  <Link
                    className="bg-gcontent2 text-white rounded-lg px-4 py-2 m-2"
                    href="/draftedArticles"
                  >
                    المقالات مسودة
                  </Link>
                </>
              ) : (
                <></>
              )}
              {isModalOpen && (
                <EditProfileModa
                  onClose={handleCancel}
                  onSubmit={handleEditProfileMutation}
                  user={userProfile!}
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 w-fit text-content items-center gap-4 border rounded-lg border-gcontent2">
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.followers : 0}
              </Label>
              <Link href={"/following"}>
                <Label className="m-1 text-gcontent2">المُتابَعون</Label>
              </Link>
            </div>
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.following : 0}
              </Label>
              <Link href={"/followers"}>
                <Label className="m-1 text-gcontent2">المُتابعين</Label>
              </Link>
            </div>
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.articles : 0}
              </Label>
              <Label className="m-1 text-gcontent2">مقال</Label>
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 m-8 flex flex-col gap-8">
          <div className="w-full h-fit rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
            {isLoading ? (
              <Skeleton className="w-80 h-8" />
            ) : isSuccess ? (
              userProfile?.overview
            ) : (
              <>لا توجد معلومات هنا</>
            )}
          </div>
          <h1 className="text-2xl">Articles By {profile?.user.name}</h1>
          <div className="container mx-auto px-4 md:px-12">
            <div className="h-auto flex flex-wrap justify-start gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
              {articleLoading ? (
                <>
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                </>
              ) : isSuccess ? (
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

      <div className=" text-content flex flex-col items-center md:hidden">
        <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
          <Image
            className="rounded-full my-2"
            src={"/profile_default.png"}
            alt="profile"
            height={128}
            width={128}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Skeleton className="w-40 h-8" />
                <Skeleton className="w-40 h-8" />
                <Skeleton className="w-40 h-8" />
              </>
            ) : (
              <>
                <Label className="font-bold text-xl" dir="ltr">
                  @{userProfile?.username}
                </Label>
                <Label className="font-bold text-2xl">
                  {userProfile?.name}
                </Label>
                <Label className="text-lg">{userProfile?.role}</Label>
                <button className="bg-gcontent2 text-white rounded-lg px-4 py-2 m-2">
                  تعديل الملف الشخصي
                </button>
                <Link
                  className="bg-gcontent2 text-white rounded-lg px-4 py-2 m-2"
                  href="/bookmarks"
                >
                  المقالات المفضلة
                </Link>
              </>
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
          {isLoading ? (
            <Skeleton className="w-80 h-8" />
          ) : isSuccess ? (
            userProfile?.overview
          ) : (
            <>لا توجد معلومات هنا</>
          )}
        </div>

        <h1>Articles By {profile?.user.name}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="h-auto flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
            {articleLoading ? (
              <>
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              </>
            ) : isSuccess ? (
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
  );
}
