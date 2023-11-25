"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import bcrypt from "bcryptjs";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

  type signUpValues = z.infer<typeof signUpSchema>;

  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function hashedPassword(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  }
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:8080/user/signup", {
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
        if (data[0].user_id) {
          localStorage.setItem("token", data[0].user_id);
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <Button className="w-full bg-cbtn shadow-lg mt-2 text-content">دخول</Button>
      </form>
    </Form>
  );
}
