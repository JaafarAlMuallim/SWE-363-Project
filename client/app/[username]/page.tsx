"use client";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery, useMutation } from "react-query";
import User from "@/models/user";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "../components/QueryProvider";
import {} from "react-query";
import { useState } from "react";
import EditProfileModa from "../components/EditProfileModal";
import Link from "next/link";

export default function Profile({ params }: { params: { username: string } }) {
  const { data: profile } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEditProfile = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    data: userProfile,
    isLoading,
    isSuccess,
  } = useQuery({
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
  });

  const { mutate: handleEditProfileMutation } = useMutation({
    mutationKey: "userProfile",
    mutationFn: (data: User) => {
      handleCancel();
      return fetch(`http://localhost:8080/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${profile?.user.user_id}`,
        },
        body: JSON.stringify(data),
      }).then((res) => res.json() as Promise<User>);
    },
    onSuccess: () => {
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

  return (
    <>
      <div className="h-screen w-screen text-content hidden md:flex">
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
            هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم
            في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص
            الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة
          </div>
          <h1>articles</h1>
        </div>
      </div>

      <div className="h-screen w-screen text-content flex flex-col items-center md:hidden">
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
        {/*overview here*/}
        <div className="w-80 h-fit m-8 rounded-lg border border-gcontent2 bg-white bg-opacity-5 p-5">
          هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في
          صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص
          الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة
        </div>
      </div>
    </>
  );
}
