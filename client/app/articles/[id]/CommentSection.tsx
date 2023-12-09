"use client";

import { queryClient } from "@/app/components/QueryProvider";
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
import { Skeleton } from "@/components/ui/skeleton";
import Article from "@/models/article";
import Comment from "@/models/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";

export default function CommentSection({ article }: { article: Article }) {
  const { data: session } = useSession();
  const { data: comments, isLoading: loadingComments } = useQuery({
    queryKey: "comments",
    queryFn: () => {
      return fetch(
        `http://localhost:8080/article/comment/${article.article_id}`,
        {
          method: "GET",
          next: {
            revalidate: 5,
          },
        },
      ).then((res) => res.json() as Promise<Comment[]>);
    },
  });
  const { mutate: handleComment } = useMutation({
    mutationKey: "comments",
    mutationFn: () => {
      return fetch(
        `http://localhost:8080/article/comment/${article.article_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session!.user.user_id}`,
          },
          body: JSON.stringify({
            content: form.getValues("content"),
          }),
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },

    onMutate: async (newComment: Comment) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
      ]);
      queryClient.setQueryData<Comment[]>(["comments"], (old = []) => [
        ...old,
        newComment,
      ]);

      return { previousComments };
    },
  });

  const commentSchema = z.object({
    content: z.string().min(1).max(1000),
  });
  type commentValues = z.infer<typeof commentSchema>;
  const form = useForm<commentValues>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  return (
    <section className="flex flex-col justify-center gap-2">
      {session?.user && (
        <Form {...form}>
          <form>
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="text-content">
                    تعليقك
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-inputbg placeholder:text-gcontent w-full"
                      type="content"
                      onChange={field.onChange}
                      placeholder="ادخل تعليقك هنا"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-cbtn shadow-lg mt-2 text-content"
              onClick={(evt) => {
                evt.preventDefault();
                const newComment: Comment = {
                  content: form.getValues("content"),
                  date: new Date().toISOString(),
                  user: session.user,
                  article_id: article.article_id,
                };
                handleComment(newComment);
              }}
            >
              إرسال
            </Button>
          </form>
        </Form>
      )}
      {loadingComments ? (
        <div className="flex flex-col">
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
          <Skeleton className="bg-gray-400 h-30 w-30" />
        </div>
      ) : (
        comments &&
        comments!.map((comment, index) => {
          console.log(comment);
          return (
            <div key={index} className="flex flex-col gap-2">
              <p>{comment.content}</p>
              <p>{comment.date}</p>
              <p>{comment.user.username}</p>
              {<Link href="#">edit</Link>}
            </div>
          );
        })
      )}
    </section>
  );
}
