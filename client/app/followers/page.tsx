"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  if (!session) {
    return <div className="h-screen"></div>;
  }
  // Fetch the user's followers
  const {
    data: users,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled:
      session !== undefined &&
      session?.user !== null &&
      session?.user.user_id !== undefined,
    queryKey: "follower",
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8080/user/follower", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user.user_id}`,
          },
          cache: "no-cache",
        });
        return res.json() as Promise<UserFollow[]>;
      } catch (error) {}
    },
  });
  //filter by using search bar state
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
            const usernameMatch = following
              .user!.username.toLowerCase()
              .includes(currentSearchValue.toLowerCase());
            const nameMatch = following
              .user!.name.toLowerCase()
              .includes(currentSearchValue.toLowerCase());
            const roleMatch = following
              .user!.role.toLowerCase()
              .includes(currentSearchValue.toLowerCase());
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
        <div className="h-screen flex flex-wrap justify-center gap-10 md:gap-4 mx-1 lg:-mx-4 text-content">
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
                  key={following.user_id}
                  href={`/profile/${following.user!.username}`}
                >
                  <UserCard user={following.user!} />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
