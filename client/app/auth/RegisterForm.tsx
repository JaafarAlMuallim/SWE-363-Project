"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    const router = useRouter();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName((name) => e.target.value);
        console.log(name);
    };
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername((username) => e.target.value);
        console.log(username);
    };
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
        fetch("http://localhost:8080/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
                username: username,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    let errorMessage = "Register failed!";
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
                <Label htmlFor="name">الاسم</Label>
                <Input
                id="name"
                type="text"
                placeholder="محمد علي"
                className="bg-inputbg"
                onChange={handleName}
                />
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">اسم الحساب</Label>
            <Input
            id="username"
            type="username"
            placeholder="mohammedAli123"
            className="bg-inputbg"
            onChange={handleUsername}
            />
            </div>
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
        </div>
        <Button className="w-full bg-cbtn shadow-lg mt-6">دخول</Button>
    </form>
    );
}
