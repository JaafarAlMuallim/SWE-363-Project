"use client";
import Organization from "@/models/org";
import OrganiztionCard from "..//components/OrganizationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "react-query";
import Link from "next/link";

export default function Organizations() {
  const { data: orgs, isLoading } = useQuery("organizations", () => {
    return fetch("http://localhost:8080/org").then(
      (res) => res.json() as Promise<Organization[]>,
    );
  });

  console.log(orgs);
  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-content text-5xl text-center font-semibold">
          <span>المؤسسات</span>
        </div>
        <hr />
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
            orgs!.map((org) => {
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
