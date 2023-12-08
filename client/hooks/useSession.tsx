"use client";
import User from "@/models/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useSession = () => {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/session", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user) setSession(data);
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);
  const signup = async (credentials: {
    email: string;
    password: string;
    name: string;
    username: string;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data: User = await response.json();
        setSession(data);
        router.push("/");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data: User = await response.json();
        console.log(data);
        setSession(data);
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/profile", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data: User = await response.json();
        setSession(data);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setSession(null);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return { session, loading, signup, login, getProfile, logout };
};

export default useSession;
