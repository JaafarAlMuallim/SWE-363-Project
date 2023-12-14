"use client";
import Organization from "@/models/org";
import Org from "@/models/org";
import Image from "next/image";
import { useMutation, useQueries, useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ArticleCard from "@/app/components/ArticleCard2";
import Article from "@/models/article";
import { OrgFounder } from "@/models/org_founders";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { queryClient } from "../../components/QueryProvider";
export default function Organization({
  params,
}: {
  params: { org_id: string };
}) {
  const { data: session } = useSession();
  const [
    { data: org, isLoading: orgLoading },
    { data: articles, isLoading: articleLoading },
    { data: orgFounders, isLoading: orgFoundersLoading },
  ] = useQueries([
    {
      queryKey: "org",
      queryFn: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/org/${params.org_id}`,
            {
              method: "GET",
            },
          );
          return res.json() as Promise<Org>;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      queryKey: "articles",
      queryFn: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/org/${params.org_id}/articles`,
            {
              method: "GET",
            },
          );
          return res.json() as Promise<Article[]>;
        } catch (error) {
          console.log(error);
        }
      },
    },
    {
      queryKey: "orgFounders",
      queryFn: async () => {
        try {
          const res = await fetch(
            `http://localhost:8080/org/${params.org_id}/founders`,
            {
              method: "GET",
            },
          );
          return res.json() as Promise<OrgFounder[]>;
        } catch (error) {
          console.log(error);
        }
      },
    },
  ]);

  const { mutate: changeOrgStatus } = useMutation({
    mutationKey: "org",
    mutationFn: async (value: "failure" | "success") => {
      try {
        const res = await fetch(`http://localhost:8080/org/${params.org_id}`, {
          method: "PATCH",
          body: JSON.stringify({ org_status: value }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.user_id}`,
          },
        });
        return res.json() as Promise<Org>;
      } catch (error) {
        console.log(error);
      }
    },
    onMutate: () => {
      queryClient.setQueryData("org", (oldData: any) => {
        return {
          ...oldData,
          org_status: org?.org_status === "success" ? "failure" : "success",
        };
      });
    },
  });

  if (orgLoading) {
    return (
      <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
        <Skeleton className="w-80 h-36" />
        <Skeleton className="w-64 h-12" />
        <Skeleton className="w-40 h-4" />
        <Skeleton className="h-80 w-64" />
        <div className="flex flex-col my-20">
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-screen text-content hidden md:flex">
        <div className="w-1/4 m-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
            {orgLoading ? (
              <Skeleton className="bg-gray-400 rounded-full m-2" />
            ) : (
              <Image
                className="rounded-lg"
                src={"/test.jpg"}
                alt="profile"
                height={400}
                width={400}
              />
            )}
            <>
              <Label className="font-bold text-3xl m-2" dir="ltr">
                {org?.name}
              </Label>
              <Label className="text-xl m-2">{org?.founding_date}</Label>
              <Label className="text-xl m-2">{`${org?.main_sector
                ?.charAt(0)
                .toUpperCase()}${org?.main_sector?.substring(1)}`}</Label>
            </>
            <div className="flex m-4 justify-center items-center">
              <Label className="m-1 text-gcontent2">عدد المؤسسين</Label>
              <Label className="font-bold m-1">
                {org?.org_founders?.length}
              </Label>
            </div>
            {org?.org_status === "success" ? (
              <Label className="font-bold m-1 text-green-600 text-2xl">
                ناجحة
              </Label>
            ) : (
              <Label className="font-bold m-1 text-red-600 text-2xl">
                غير ناجحة
              </Label>
            )}
            <div className="my-4">
              {session &&
              session.user &&
              (session!.user?.role === "admin" ||
                session!.user?.role === "reviewer") &&
              org?.org_status === "success" ? (
                <Button
                  className="bg-red-700 text-white rounded-lg px-4 py-2"
                  onClick={() => {
                    changeOrgStatus("failure");
                  }}
                >
                  تغيير حالة الشركة
                </Button>
              ) : (
                <Button
                  className="bg-green-700 text-white rounded-lg px-4 py-2"
                  onClick={() => {
                    changeOrgStatus("success");
                  }}
                >
                  تغيير حالة الشركة
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 m-8 flex flex-col gap-8">
          <div className="w-full h-fit rounded-lg bg-white bg-opacity-5 p-5">
            <div className="flex flex-col whitespace-normal text-right">
              {org?.description}
              <ul className="flex flex-col justify-start">
                المؤسسين:
                {orgFoundersLoading ? (
                  <Skeleton className="bg-gray-400 h-30 w-30" />
                ) : (
                  orgFounders?.map((founder, index) => (
                    <li key={founder.founder_id} className="block">
                      {founder.founder}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <h1 className="text-2xl">Articles Related to {org?.name}</h1>
          <div className="container mx-auto px-4 md:px-12">
            <div className="flex flex-wrap justify-start gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
              {articleLoading ? (
                <>
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                  <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                </>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen text-content flex flex-col items-center md:hidden">
        <div className="flex flex-col justify-center items-center w-80 m-10 shadow-lg bg-gradient-to-br from-crd to-crd2 rounded-lg text-center">
          {orgLoading ? (
            <Skeleton className="rounded-full m-2 bg-gray-400" />
          ) : (
            <Image
              className="rounded-lg mb-2"
              src={"/test.jpg"}
              alt="profile"
              height={300}
              width={400}
            />
          )}
          {orgLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="font-bold text-xl m-2 bg-gray-400" />
              <Skeleton className="font-bold text-2xl m-2 bg-gray-400" />
              <Skeleton className="text-lg m-2 bg-gray-400" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label className="font-bold text-2xl" dir="ltr">
                {org?.name}
              </Label>
              <Label className="text-lg">{org?.founding_date}</Label>
              <Label className="text-lg">
                {`${org?.main_sector
                  ?.charAt(0)
                  .toUpperCase()}${org?.main_sector?.substring(1)}`}
              </Label>
            </div>
          )}
          <div className="flex m-4 justify-center items-center">
            <Label className="m-1 text-gcontent2">المؤسسين</Label>
            <Label className="font-bold m-1">{org?.org_founders?.length}</Label>
          </div>
        </div>
        {/*overview here*/}
        <div className="w-80 bg-gradient-to-br from-crd to-crd2 h-fit rounded-lg p-5 whitespace-pre-line">
          {orgLoading ? (
            <Skeleton className="bg-gray-400 h-64 w-40" />
          ) : (
            <div className="flex flex-col justify-start">
              {org?.description}
              <ul className="flex flex-col justify-start">
                المؤسسين:
                {orgFoundersLoading ? (
                  <Skeleton className="bg-gray-400 h-30 w-30" />
                ) : (
                  orgFounders?.map((founder, index) => (
                    <li key={founder.founder_id} className="block">
                      {founder.founder}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        <h1 className="text-2xl my-4">Articles Related to {org?.name}</h1>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
            {articleLoading ? (
              <>
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
                <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
