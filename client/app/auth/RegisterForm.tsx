"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DatePicker, getBirthDate } from "../components/DatePicker";
export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const router = useRouter();

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName((name) => e.target.value);
        console.log(name);
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail((email) => e.target.value);
        console.log(email);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword((password) => e.target.value);
        console.log(password);
    };
    // const handleBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setBirthDate((birthDate) => getBirthDate());
    //     console.log(birthDate);
    // };
    
    return (
    <form>
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
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                    <DatePicker date={birthDate} setDate={setBirthDate} />
        </div>
        </div>
        <Button className="w-full bg-cbtn shadow-lg mt-6">دخول</Button>
    </form>
    );
}
