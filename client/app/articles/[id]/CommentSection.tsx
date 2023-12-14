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
import Article from "@/models/article";
import Comment from "@/models/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";
import { useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast";

export default function CommentSection({ article }: { article: Article }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
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
    mutationFn: (comment: Comment) => {
      return fetch(
        `http://localhost:8080/article/comment/${article.article_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session!.user.user_id}`,
          },
          body: JSON.stringify({
            content: comment.content,
          }),
        },
      );
    },
    onSuccess: () => {
      toast({
        title: "تم إضافة التعليق بنجاح",
        className: "bg-green-700 text-white",
        duration: 3000,
      });
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
      toast({
        title: "تم حذف التعليق بنجاح",
        className: "bg-green-700 text-white",
        duration: 3000,
      });
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
    <section className="w-11/12 bg-white bg-opacity-5 rounded-lg p-4 border border-content flex flex-col justify-center gap-2">
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
                      className="placeholder:text-gcontent w-full text-black"
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
                form.setValue("content", "");
                handleComment(newComment);
              }}
            >
              إرسال
            </Button>
          </form>
        </Form>
      )}
      <div className="overflow-y-scroll h-80">
        <h1 className="border-b border-content text-xl my-4">التعليقات</h1>
        {comments &&
          comments!.map((comment, index) => {
            return (
              <CommentCard
                key={index}
                comment={comment}
                onDelete={handleDelete}
                onEdit={() => {
                  showModal ? setShowModal(false) : setShowModal(true);
                }}
              />
            );
          })}
      </div>
    </section>
  );
}
