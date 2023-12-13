"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import User from "@/models/user";
import UserCard from "../components/UserCard2";
import UserFollow from "@/models/userFollow";

export default function FollowingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) router.push(`/auth?callbackUrl=/following/`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled: session !== undefined && session?.user !== null,
    queryKey: "following",
    queryFn: () => {
      return fetch("http://localhost:8080/user/following", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user.user_id}`,
        },
        cache: "no-cache",
      }).then((res) => res.json() as Promise<UserFollow[]>);
    },
  });
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserFollow[]>(
    isLoading ? [] : users!,
  );
  useEffect(() => {
    setFilteredUsers(isLoading ? [] : users!);
  }, [users, isLoading]);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSearchValue = e.target.value;
    setSearch(currentSearchValue);
    if (currentSearchValue.length === 0) {
      setFilteredUsers(users!);
    } else {
      const filtered = isLoading
        ? []
        : users?.filter((following) => {
            const usernameMatch =
              following.followed!.username.includes(currentSearchValue);
            const nameMatch =
              following.followed!.name.includes(currentSearchValue);
            const roleMatch =
              following.followed!.role.includes(currentSearchValue);
            return usernameMatch || nameMatch || roleMatch;
          });
      setFilteredUsers(filtered!);
    }
  };
  return (
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-4 text-content text-5xl text-center font-semibold">
          <span>المُتابَعون</span>
        </div>
        <div className="flex justify-center my-8 text-2xl font-semibold text-right text-content mx-4">
          <div className="flex gap-4">
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
        <div className="h-auto flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
          {isLoading ? (
            <>
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
              <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />
            </>
          ) : (
            isSuccess &&
            filteredUsers!.map((following) => {
              return (
                <Link
                  key={following.followed_id}
                  href={`/profile/${following.followed!.username}`}
                >
                  <UserCard user={following.followed!} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
