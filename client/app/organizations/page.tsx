"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const { data: orgs, isLoading } = useQuery("organizations", async () => {
    // Fetch the organizations
    try {
      const res = await fetch("http://localhost:8080/org", {
        method: "GET",
        next: { revalidate: 60 },
      });
      return res.json() as Promise<Org[]>;
    } catch (err) {
      console.log(err);
    }
  });
  const [search, setSearch] = useState("");
  const [filteredOrgs, setFilteredOrgs] = useState<Org[]>(
    isLoading ? [] : orgs!,
  );
  // Filter the organizations based on the search value
  const [orgsList, setOrgsList] = useState<"all" | "failure" | "success">(
    "all",
  );
  const handleListChange = (value: string) => {
    let newListState: "all" | "failure" | "success";
    newListState = value as "all" | "failure" | "success";
    // Set the new list state
    setOrgsList(newListState);
    const filtered = isLoading
      ? []
      : orgs?.filter((org) => {
          const nameMatch = org.name
            .toLowerCase()
            .includes(search.toLowerCase());
          const orgFounder = org.org_founders?.some((founder) =>
            founder.founder?.toLowerCase().includes(search.toLowerCase()),
          );
          return nameMatch || orgFounder;
        });

    setFilteredOrgs((_) => {
      return newListState === "all"
        ? filtered!
        : filtered!.filter((org) => org.org_status === newListState);
    });
  };
  // Set the filtered orgs to the orgs when the orgs are loaded
  useEffect(() => {
    setFilteredOrgs(isLoading ? [] : orgs!);
  }, [orgs, isLoading]);

  // Filter the organizations based on the search value
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
            const orgFounder = org.org_founders?.some((founder) =>
              founder.founder?.includes(currentSearchValue),
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
        <div className="flex flex-wrap justify-center gap-4 md:gap-4 lg:-mx-4 center my-8 text-2xl font-semibold text-right text-content mx-10">
          {session && session.user && (
            <Button type="button" className="bg-green-700 text-l w-36">
              <Link href={"/writeOrg"}>مؤسسة جديدة</Link>
            </Button>
          )}
          <Select
            onValueChange={(value: "all" | "failure" | "success") =>
              handleListChange(value)
            }
            dir="rtl"
          >
            <SelectTrigger className="bg-inputbg w-36 md:w-40" dir="rtl">
              <SelectValue
                placeholder="حالة المؤسسة"
                dir="rtl"
                defaultValue={"all"}
              />
            </SelectTrigger>
            <SelectContent className="bg-inputbg text-content">
              <SelectItem value="all">كل الشركات</SelectItem>
              <SelectItem value="success">ناجحة</SelectItem>
              <SelectItem value="failure">غير ناجحة</SelectItem>
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => handleSearch(e)}
            value={search}
            className="w-52 text-gcontent2 md:w-96"
            placeholder="كلمات مفتاحية"
          />
        </div>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="h-auto flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
