"use client";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMutation, useQueries } from "react-query";
import User from "@/models/user";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "../components/QueryProvider";
import {} from "react-query";
import { useEffect, useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import Link from "next/link";
import Article from "@/models/article";
import ArticleCard from "../components/ArticleCard2";
import ProfileStats from "@/models/profile_stats";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditImageModal from "../components/EditImageModal";
import { useEdgeStore } from "@/lib/edgeStore";

export default function Profile() {
  const { data: profile } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  // Show the edit profile modal
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };
  // Hide the edit profile modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleImageOpen = () => {
    setImageModal(true);
  };
  const handleImageCancel = () => {
    setImageModal(false);
  };
  const { edgestore } = useEdgeStore();

  // Redirect the user back if the session is finished
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!profile) router.push(`/auth?callbackUrl=/profile/`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [profile]);
  const [
    { data: userProfile, isLoading, isSuccess },
    { data: stats, isSuccess: statsSuccess },
    { data: articles, isLoading: articleLoading },
  ] = useQueries([
    {
      enabled:
        profile !== undefined &&
        profile?.user !== null &&
        profile?.user.user_id !== undefined,
      queryKey: "userProfile",
      queryFn: async () => {
        try {
          const res = await fetch(`http://localhost:8080/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${profile?.user.user_id}`,
            },
            next: { revalidate: 60 },
          });
          return res.json() as Promise<User>;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      enabled:
        profile !== undefined &&
        profile?.user !== null &&
        profile?.user.user_id !== undefined,
      queryKey: "profileStats",
      queryFn: async () => {
        try {
          const res = await fetch(`http://localhost:8080/profile/stats`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${profile?.user.user_id}`,
            },
            next: { revalidate: 60 },
          });
          return res.json() as Promise<ProfileStats>;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      enabled:
        profile !== undefined &&
        profile?.user !== null &&
        profile?.user.user_id !== undefined,
      queryKey: "articlesByUser",
      queryFn: async () => {
        try {
          const res = await fetch(`http://localhost:8080/article/user/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${profile?.user.user_id}`,
            },
            next: { revalidate: 60 },
          });
          return res.json() as Promise<Article[]>;
        } catch (error) {
          console.log(error);
        }
      },
    },
  ]);

  //edit profile mutation
  const { mutate: handleEditProfileMutation } = useMutation({
    mutationKey: "userProfile",
    mutationFn: async (data: User) => {
      try {
        handleCancel();
        const res = await fetch(`http://localhost:8080/profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${profile?.user.user_id}`,
          },
          body: JSON.stringify(data),
        });
        return res.json() as Promise<User>;
      } catch (error) {
        console.log(error);
      }
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
      toast({
        title: "حدث خطأ أثناء تعديل الملف الشخصي",
        description: "حدث خطأ أثناء تعديل الملف الشخصي",
        className: "bg-red-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("userProfile");
    },
  });
  const { mutate: handleEditImageMutation } = useMutation({
    mutationKey: "userProfile",
    mutationFn: async (url: string) => {
      console.log(url);
      try {
        const res = await fetch(`http://localhost:8080/profile/image`, {
          method: "PATCH",
          body: JSON.stringify({ user_image: url }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${profile?.user.user_id}`,
          },
        });
        return res.json() as Promise<User>;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      toast({
        title: "تم تعديل الصورة الشخصية بنجاح",
        description: "تم حفظ الصورة الشخصية الجديدة بنجاح",
        className: "bg-green-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("userProfile");
    },
    onError: (error) => {
      toast({
        title: "حدث خطأ أثناء تعديل الصورة الشخصية",
        description: "حدث خطأ أثناء تعديل الصورة الشخصية",
        className: "bg-red-700 text-white",
        duration: 3000,
      });
      queryClient.invalidateQueries("userProfile");
    },
  });
  return (
    // Main container
    <div className="min-h-screen flex flex-col justify-center items-center w-full">
      <div className="w-1/4 m-10 flex flex-col items-center gap-8">
        {/* Desktop view */}
        <div className=" text-content hidden md:flex">
          {/* The user's profile section */}
          <section className="w-1/4 m-10 flex flex-col items-center gap-8">
            <div className="flex flex-col w-96 items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
              <button onClick={() => handleImageOpen()}>
                <Image
                  className="rounded-full my-2 hover:filter hover:grayscale hover:contrast-200 trasition-all duration-300"
                  src={userProfile?.user_image!}
                  alt="profile"
                  height={228}
                  width={228}
                />
              </button>
              {imageModal && (
                <EditImageModal
                  width={300}
                  height={300}
                  onClose={() => handleImageCancel()}
                  onMutation={handleEditImageMutation}
                />
              )}

              <div className="flex flex-col items-center justify-center gap-4">
                {/* If the user is still loading, show a skeleton */}
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
                      className="bg-cbtn text-white rounded-lg px-4 py-2 m-2"
                      onClick={() => {
                        handleEditProfile();
                      }}
                    >
                      تعديل الملف الشخصي
                    </button>
                    <div className="flex flex-row">
                      <Link
                        className="bg-cbtn text-white rounded-lg px-4 py-2 m-2"
                        href="/bookmarks"
                      >
                        المقالات المرجعية
                      </Link>
                      <Link
                        className="bg-cbtn text-white rounded-lg px-4 py-2 m-2"
                        href="/draftedArticles"
                      >
                        المقالات المسودة
                      </Link>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {isModalOpen && (
                  <EditProfileModal
                    onClose={handleCancel}
                    onSubmit={handleEditProfileMutation}
                    user={userProfile!}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 w-fit text-content items-center gap-4 border rounded-lg border-cbtn">
              <div className="flex flex-col m-4 justify-center items-center">
                <Label className="font-bold m-1">
                  {statsSuccess ? stats!.followers : 0}
                </Label>
                <Link href={"/following"}>
                  <Label className="m-1 text-cbtn">المُتابَعون</Label>
                </Link>
              </div>
              <div className="flex flex-col m-4 justify-center items-center">
                <Label className="font-bold m-1">
                  {statsSuccess ? stats!.following : 0}
                </Label>
                <Link href={"/followers"}>
                  <Label className="m-1 text-cbtn">المُتابعين</Label>
                </Link>
              </div>
              <div className="flex flex-col m-4 justify-center items-center">
                <Label className="font-bold m-1">
                  {statsSuccess ? stats!.articles : 0}
                </Label>
                <Label className="m-1 text-cbtn">مقال</Label>
              </div>
            </div>
          </section>
          {/* The user's overview & related articles section */}
          <section className="w-3/4 p-4 m-8 flex flex-col gap-8">
            <div className="w-full h-fit rounded-lg border border-cbtn bg-white bg-opacity-5 p-5">
              {isLoading ? (
                <Skeleton className="w-80 h-8" />
              ) : isSuccess ? (
                userProfile?.overview!.length! > 0 ? (
                  userProfile?.overview
                ) : (
                  <p>لا توجد معلومات هنا</p>
                )
              ) : (
                <></>
              )}
            </div>
            <h1 className="text-2xl">
              مقالات كتبت بواسطة {profile?.user.name}{" "}
            </h1>
            {/* Display Related articles */}
            <div className="container my-12 mx-auto px-4 md:px-12">
              <div className="h-screen flex flex-wrap justify-start gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
          </section>
        </div>
        {/* Mobile view */}
        <div className=" text-content flex flex-col items-center md:hidden">
          <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            <button onClick={() => handleImageOpen()}>
              <Image
                className="rounded-full my-2 hover:bg-black bg-opacity-50"
                src={userProfile?.user_image!}
                alt="profile"
                height={128}
                width={128}
              />
            </button>
            {imageModal && (
              <EditImageModal
                width={300}
                height={300}
                onClose={() => handleImageCancel()}
                onMutation={handleEditImageMutation}
              />
            )}

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
                  <button
                    className="bg-cbtn text-white rounded-lg px-4 py-2 m-2"
                    onClick={() => {
                      handleEditProfile();
                    }}
                  >
                    تعديل الملف الشخصي
                  </button>
                  <div className="flex flex-row gap-2 my-4">
                    <Link
                      className="bg-cbtn text-content rounded-lg px-4 py-2"
                      href="/bookmarks"
                    >
                      المقالات المرجعية
                    </Link>
                    <Link
                      className="bg-cbtn text-content rounded-lg px-4 py-2"
                      href="/draftedArticles"
                    >
                      المقالات المسودة
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 w-80 mx-4 text-base items-center gap-4 border rounded-lg border-cbtn">
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.articles : 0}
              </Label>
              <Label className="m-1 text-cbtn">متابَعون</Label>
            </div>
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.following : 0}
              </Label>
              <Label className="m-1 text-cbtn">متابعا</Label>
            </div>
            <div className="flex flex-col m-4 justify-center items-center">
              <Label className="font-bold m-1">
                {statsSuccess ? stats!.articles : 0}
              </Label>
              <Label className="m-1 text-cbtn">مقال</Label>
            </div>
          </div>
          <div className="w-80 h-fit m-8 rounded-lg border border-cbtn bg-white bg-opacity-5 p-5">
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
            <div className="h-screen flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
    </div>
  );
}
