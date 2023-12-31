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
import Org from "@/models/org";
import TipTap from "../components/TipTap";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!session) router.push("/auth?callbackUrl=/writeArticle");
    }, 1250);
    return () => {
      clearTimeout(timeout);
    };
  }, [session]);

  if (!session) {
    return <div className="h-screen"></div>;
  }
  // Form validation schema
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
    org: z.string().min(1, { message: "المنظمة يجب أن يكون ٣ أحرف أو أكثر" }),
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
    data: orgs,
    isLoading: orgsLoading,
    isSuccess,
  } = useQuery({
    queryKey: "orgs",
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:8080/org/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.user_id}`,
          },
        });
        return res.json() as Promise<Org[]>;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { mutate: postArticle } = useMutation({
    mutationKey: "article",
    mutationFn: async () => {
      try {
        const res = await fetch(`http://localhost:8080/article/`, {
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
            org_id: form.getValues("org"),
            article_status:
              session!.user.role === "admin" ||
              session!.user.role === "reviewer"
                ? "published"
                : "in_review",
          }),
        });
        return res.json();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { mutate: draftArticle } = useMutation({
    mutationKey: "article",
    mutationFn: async () => {
      try {
        const res = await fetch(`http://localhost:8080/article/`, {
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
        });
        return res.json();
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(form.getValues("org"));

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
                  <FormLabel className="text-content">العنوان</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقالتك"
                      onChange={field.onChange}
                      className="bg-inputbg w-64 text-content"
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
                  <FormLabel className="text-content">العنوان الفرعي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقالتك الفرعي"
                      onChange={field.onChange}
                      className="bg-inputbg w-64 text-content"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="org"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder="الشركات"
                        onChange={() => field.onChange()}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {orgsLoading ? (
                        <Skeleton />
                      ) : (
                        isSuccess &&
                        orgs!.map((org) => (
                          <SelectItem key={org.org_id} value={org.org_id!}>
                            {org.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-content">المحتوى</FormLabel>
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
                <FormLabel className="text-content">المحتوى</FormLabel>
                <FormControl>
                  <Input
                    placeholder="كلمات مفتاحية، مثال : تقنية، تطوير، برمجة"
                    onChange={field.onChange}
                    className="bg-inputbg w-64 text-content"
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
