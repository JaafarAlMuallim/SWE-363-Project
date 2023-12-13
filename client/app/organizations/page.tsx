"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [orgsList, setOrgsList] = useState<"all" | "failure" | "success">(
    "all",
  );
  const handleListChange = (value: string) => {
    let newListState: "all" | "failure" | "success";
    if (orgsList === "all") {
      newListState = "success";
    } else if (orgsList === "success") {
      newListState = "failure";
    } else {
      newListState = "all";
    }
    setOrgsList(newListState);
    const filtered = isLoading
      ? []
      : orgs?.filter((org) => {
          const nameMatch = org.name.includes(search);
          const orgFounder = org.org_founders?.some(
            (founder) => founder.founder?.includes(search),
          );
          return nameMatch || orgFounder;
        });

    setFilteredOrgs((_) => {
      return newListState === "all"
        ? filtered!
        : filtered!.filter((org) => org.org_status === newListState);
    });
  };
  //  const handleListChange = (value: string) => {
  //    setOrgsList(value as "all" | "failure" | "success");
  //    const filtered = isLoading
  //      ? []
  //      : orgs?.filter((org) => {
  //          const nameMatch = org.name.includes(search);
  //          const orgFounder = org.org_founders?.some(
  //            (founder) => founder.founder?.includes(search),
  //          );
  //          return nameMatch || orgFounder;
  //        });
  //    setFilteredOrgs((_) => {
  //      return value === "all"
  //        ? filtered!
  //        : filtered!.filter((org) => org.org_status === orgsList);
  //    });
  //  };

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
      setFilteredOrgs((_) => {
        return orgsList === "all"
          ? filtered!
          : filtered!.filter((org) => org.org_status === orgsList);
      });
    }
  };

  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-content text-5xl text-center font-semibold">
          <span>المؤسسات</span>
        </div>
        <div className="grid grid-cols-2 gap-4 center my-8 text-2xl font-semibold text-right text-content mx-10">
          {session && session.user && (
            <Button type="button" className="bg-green-700 text-l w-36">
              <Link href={"/writeOrg"}>مؤسسة جديدة</Link>
            </Button>
          )}
          <Input
            onChange={(e) => handleSearch(e)}
            value={search}
            className="w-36 text-black md:w-96"
            placeholder="كلمات مفتاحية"
          />
          <Select
            onValueChange={(value: "all" | "failure" | "success") =>
              handleListChange(value)
            }
            dir="rtl"
          >
            <SelectTrigger
              className="bg-inputbg w-36 text-white md:w-96"
              dir="rtl"
            >
              <SelectValue
                placeholder="حالة المؤسسة"
                dir="rtl"
                defaultValue={"all"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الشركات</SelectItem>
              <SelectItem value="success">ناجحة</SelectItem>
              <SelectItem value="failure">غير ناجحة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="h-screen flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
