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
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function LoginForm() {
  const loginSchema = z.object({
    email: z.string().email({ message: "البريد الالكتروني غير صحيح" }).trim(),
    password: z
      .string()
      .min(8, { message: "كلمة المرور يجب ان تكون اكثر من 8 احرف" })
      .trim(),
  });

  type loginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<loginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  async function hashedPassword(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: form.getValues("email"),
        password: form.getValues("password"),
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            if (data.user_id) {
              localStorage.setItem("token", data.user_id);
              sessionStorage.setItem("token", data.user_id);
              router.push("/");
            }
          });
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
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
        <Button className="w-full bg-cbtn shadow-lg mt-2 text-content">
          دخول
        </Button>
      </form>
    </Form>
  );

  //  return (
  //    <form method="POST" onSubmit={handleSubmit}>
  //      <div className="grid w-full items-center gap-4">
  //        <div className="flex flex-col justify-end space-y-1.5">
  //          <Label htmlFor="email">البريد الالكتروني</Label>
  //          <Input
  //            id="email"
  //            type="email"
  //            placeholder="example@gmail.com"
  //            className="bg-inputbg"
  //            onChange={handleEmail}
  //          />
  //        </div>
  //        <div className="flex flex-col space-y-1.5">
  //          <Label htmlFor="password">كلمة المرور</Label>
  //          <Input
  //            id="password"
  //            type="password"
  //            placeholder="ادخل كلمة المرور"
  //            className="bg-inputbg"
  //            onChange={handlePassword}
  //          />
  //        </div>
  //        <Button className="w-full bg-cbtn shadow-lg mt-2">دخول</Button>
  //      </div>
  //    </form>
  //  );
}
