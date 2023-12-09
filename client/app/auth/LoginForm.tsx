"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: form.getValues("email"),
      password: form.getValues("password"),
    });

    // Sign User In with NextAuth
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
}
