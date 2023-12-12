"use client";
import Organization from "@/models/org";
import OrganiztionCard from "..//components/OrganizationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "react-query";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Org from "@/models/org";
import { Button } from "@/components/ui/button";

export default function Organizations() {
  const { data: session } = useSession();
  const { data: orgs, isLoading } = useQuery("organizations", () => {
    return fetch("http://localhost:8080/org").then(
      (res) => res.json() as Promise<Organization[]>,
    );
  });
  const [search, setSearch] = useState("");
  const [filteredOrgs, setFilteredOrgs] = useState<Org[]>(
    isLoading ? [] : orgs!,
  );
  useEffect(() => {
    setFilteredOrgs(isLoading ? [] : orgs!);
  }, [orgs, isLoading]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSearchValue = e.target.value;
    setSearch(currentSearchValue);
    if (currentSearchValue.length === 0) {
      setFilteredOrgs(orgs!);
    } else {
      const filtered = isLoading
        ? []
        : orgs?.filter((org) => {
            const nameMatch = org.name.includes(currentSearchValue);
            const orgFounder = org.org_founders?.some(
              (founder) => founder.founder?.includes(currentSearchValue),
            );
            return nameMatch || orgFounder;
          });
      setFilteredOrgs(filtered!);
    }
  };

  console.log(orgs);
  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-content text-5xl text-center font-semibold">
          <span>المؤسسات</span>
        </div>
        <div className="flex justify-center my-8 text-2xl font-semibold text-right text-content mx-4">
          <div className="flex gap-4">
            {session && session.user && (
              <Button type="button" className="bg-green-700 text-l">
                <Link href={"/writeOrg"} className="">
                  مؤسسة جديدة
                </Link>
              </Button>
            )}
            <Input
              onChange={(e) => handleSearch(e)}
              value={search}
              className="w-56 text-black md:w-96"
              placeholder="ابحث عن كلمات مفتاحية"
            />
          </div>
        </div>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
            </>
          ) : (
            filteredOrgs!.map((org) => {
              return (
                <Link key={org.org_id} href={`/organizations/${org.org_id}`}>
                  <OrganiztionCard org={org} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
