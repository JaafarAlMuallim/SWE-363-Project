"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Article from "@/models/article";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import TipTap from "../../components/TipTap";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import DOMPurify from "dompurify";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ArticlePage({
  params,
}: {
  params: { article_id: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session)
        router.push(`/auth?callbackUrl=/draftedArticles/${params.article_id}}`);
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);
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
      .min(100, { message: "المحتوى يجب أن يكون ١٠٠ حرف أو أكثر" }),
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

  const {
    data: article,
    isLoading,
    isSuccess,
  } = useQuery({
    enabled:
      session !== undefined && session?.user !== null && session !== null,
    queryKey: "article",
    queryFn: () => {
      return fetch(
        `http://localhost:8080/article/drafted/${params.article_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user.user_id}`,
          },
        },
      ).then((res) => res.json() as Promise<Article>);
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

  if (isLoading) {
    return <Skeleton className="bg-gray-400 h-96 w-96 rounded-lg shadow-lg" />;
  }
  if (isSuccess) {
    const { content } = article!;
    const cleanContent = DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    });
    form.setValue("title", article!.title!);
    form.setValue("subtitle", article!.subtitle!);
    form.setValue("content", cleanContent);
    const tags = article!.article_tags!.map((tag) => tag.tag).join("،");
    form.setValue("tags", tags);

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
                        value={article!.title}
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
                        value={article!.subtitle}
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
                    <TipTap
                      content={DOMPurify.sanitize(article!.content, {
                        USE_PROFILES: { html: true },
                      })}
                      onChange={field.onChange}
                    />
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
                      value={tags}
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
}
