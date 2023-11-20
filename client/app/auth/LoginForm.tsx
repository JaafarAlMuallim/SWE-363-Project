"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((email) => e.target.value);
    console.log(email);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((password) => e.target.value);
    console.log(password);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.user_id);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col justify-end space-y-1.5">
          <Label htmlFor="email">البريد الالكتروني</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-inputbg"
            onChange={handleEmail}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            placeholder="ادخل كلمة المرور"
            className="bg-inputbg"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
}
