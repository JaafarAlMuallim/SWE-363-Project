"use client";

import CommentCard from "@/app/components/CommentCard";
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
            authorization: `Bearer ${session!.user.user_id}`,
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
  const handleDelete = (comment: Comment) => {
    deleteComment(comment);
  };
  const { mutate: deleteComment } = useMutation({
    mutationKey: "comments",
    mutationFn: (comment: Comment) => {
      console.log(comment);
      return fetch(`http://localhost:8080/comment/${comment.comment_id!}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session!.user.user_id}`,
        },
        body: JSON.stringify({
          comment,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
    onMutate: async (newComment: Comment) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
      ]);
      queryClient.setQueryData<Comment[]>(["comments"], (old = []) =>
        old.filter((comment) => comment.comment_id !== newComment.comment_id),
      );

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
    <section className="overflow-y-scroll flex flex-col justify-center gap-2">
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
        <div className="flex flex-col gap-8">
          <Skeleton className="bg-gray-400 h-20 w-96" />
          <Skeleton className="bg-gray-400 h-20 w-96" />
          <Skeleton className="bg-gray-400 h-20 w-96" />
        </div>
      ) : (
        comments &&
        comments!.map((comment, index) => {
          return (
            <CommentCard
              key={index}
              comment={comment}
              onDelete={handleDelete}
            />
          );
        })
      )}
    </section>
  );
}
