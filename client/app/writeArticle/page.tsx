"use client";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import TipTap from "../components/TipTap";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "العنوان يجب أن يكون ٥ أحرف أو أكثر" })
      .trim(),
    subtitle: z
      .string()
      .min(5, { message: "العنوان الفرعي يجب أن يكون ٥ أحرف أو أكثر" })
      .trim(),
    content: z
      .string()
      .min(100, { message: "المحتوى يجب أن يكون ١٠٠ حرف أو أكثر" })
      .trim(),
    tags: z.string().min(1, { message: "الوسم يجب أن يكون ٣ أحرف أو أكثر" }),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
      tags: "",
    },
  });
  const { mutate: postArticle } = useMutation({
    mutationKey: "article",
    mutationFn: () => {
      return fetch(`http://localhost:8080/article/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          subtitle: form.getValues("subtitle"),
          content: form.getValues("content"),
          tags: form.getValues("tags").split("،"),
          article_status:
            session!.user.role === "admin" || session!.user.role === "reviewer"
              ? "published"
              : "in_review",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const { mutate: draftArticle } = useMutation({
    mutationKey: "article",
    mutationFn: () => {
      console.log(form.getValues("tags").split("،"));
      return fetch(`http://localhost:8080/article/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        body: JSON.stringify({
          title: form.getValues("title"),
          subtitle: form.getValues("subtitle"),
          content: form.getValues("content"),
          tags: form.getValues("tags").split("،"),
          article_status: "draft",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <section className="h-screen my-20">
      <Form {...form}>
        <form className="flex flex-col gap-8">
          <div className="flex flex-col justify-center gap-8 md:flex-row md:gap-20">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">العنوان</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقالتك"
                      onChange={field.onChange}
                      className="bg-inputbg w-64 text-white"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subtitle"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">العنوان الفرعي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقالتك الفرعي"
                      onChange={field.onChange}
                      className="bg-inputbg w-64 text-white"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">المحتوى</FormLabel>
                <FormControl>
                  <TipTap content={""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">المحتوى</FormLabel>
                <FormControl>
                  <Input
                    placeholder="كلمات مفتاحية، مثال : تقنية، تطوير، برمجة"
                    onChange={field.onChange}
                    className="bg-inputbg w-64 text-white"
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-8">
            <Button
              type="submit"
              className="bg-green-800"
              onClick={(evt) => {
                evt.preventDefault();
                postArticle();
                router.push("/articles");
              }}
            >
              إنشاء
            </Button>
            <Button
              type="button"
              className="bg-orange-800"
              onClick={(evt) => {
                evt.preventDefault();
                draftArticle();
                router.push("/draftedArticles");
              }}
            >
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
