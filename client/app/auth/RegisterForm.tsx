"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import User from "@/models/user";
export default function RegisterForm() {
  const signUpSchema = z.object({
    email: z.string().email({ message: "البريد الالكتروني غير صحيح" }).trim(),
    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب ان تكون اكثر من 8 احرف" })
      .trim(),
    name: z
      .string()
      .min(3, { message: "الاسم يجب ان يكون اكثر من 3 احرف" })
      .trim(),
    username: z
      .string()
      .min(3, { message: "اسم الحساب يجب ان يكون اكثر من 3 احرف" }),
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = searchParams.get("callbackUrl");

  type signUpValues = z.infer<typeof signUpSchema>;

  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.getValues("email"),
        password: form.getValues("password"),
        name: form.getValues("name"),
        username: form.getValues("username"),
      }),
    });
    const data = (await res.json()) as User;
    if (data.user_id !== null) {
      const response = await signIn("credentials", {
        email: form.getValues("email"),
        password: form.getValues("password"),
        callbackUrl: url! || "/",
        redirect: false,
      });
      if (response!.status === 200) router.push(response!.url!);
    }
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-content"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name" className="text-content">
                الاسم
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-inputbg placeholder:text-gcontent"
                  type="text"
                  name="name"
                  onChange={field.onChange}
                  placeholder="الاسم"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username" className="text-content">
                اسم الحساب
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-inputbg placeholder:text-gcontent"
                  type="text"
                  name="username"
                  onChange={field.onChange}
                  placeholder="mohammedAli123"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="text-content">
                البريد الالكتروني
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-inputbg placeholder:text-gcontent"
                  onChange={field.onChange}
                  name="email"
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-content">
                كلمة المرور
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-inputbg placeholder:text-gcontent"
                  type="password"
                  onChange={field.onChange}
                  placeholder="ادخل كلمة المرور"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-cbtn shadow-lg mt-2 text-content">
          دخول
        </Button>
      </form>
    </Form>
  );
}
