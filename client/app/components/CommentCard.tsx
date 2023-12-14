"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Comment from "@/models/comment";
import { GoHeartFill } from "react-icons/go";
import { useMutation } from "react-query";
import { queryClient } from "@/app/components/QueryProvider";
import { useSession } from "next-auth/react";
import { useState } from "react";
import EditCommentModal from "./EditCommentModal";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";

export default function CommentCard({
  comment,
  onDelete,
  onEdit,
}: {
  comment: Comment;
  onDelete(comment: Comment): void;
  onEdit(): void;
}) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const updateCommentMutation = useMutation(
    async (updatedComment: Comment) => {
      try {
        handleModalClose();
        const res = await fetch(
          `http://localhost:8080/comment/${updatedComment.comment_id!}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session!.user.user_id}`,
            },
            body: JSON.stringify(updatedComment),
          },
        );
        return res.json();
      } catch (err) {
        console.log(err);
      }
    },
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(["comments"]);

        const previousComments = queryClient.getQueryData<Comment[]>([
          "comments",
        ]);

        queryClient.setQueryData<Comment[]>(["comments"], (oldComments) =>
          oldComments!.map((comment) =>
            comment.comment_id === newComment.comment_id
              ? { ...comment, ...newComment }
              : comment,
          ),
        );
        return { previousComments };
      },
      onError: (err, newComment, context) => {
        queryClient.setQueryData(["comments"], context!.previousComments);
      },
      onSuccess: () => {
        toast({
          title: "تم تعديل التعليق بنجاح",
          className: "bg-green-700 text-white",
          duration: 3000,
        });

        queryClient.invalidateQueries(["comments"]);
      },
    },
  );
  return (
    <div className="w-full text-content bg-transparent rounded-lg">
      <div className="flex flex-col rounded-lg">
        <div className="w-full flex items-center justify-between p-4">
          <div className="flex items-center">
            <object>
              <Link href={`/profile/${comment.user!.username}`}>
                <Image
                  src={comment.user!.user_image!}
                  alt="avatar"
                  className="shadow-lg rounded-full"
                  width={40}
                  height={40}
                />
              </Link>
            </object>
            <div className="mr-2">
              <span>
                <object>
                  <Link
                    href={`/profile/${comment.user!.username}`}
                    className="hover:underline"
                  >
                    {comment.user!.username}
                  </Link>
                </object>
              </span>
              <span className="block text-gcontent2 text-sm">
                {comment.date}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <GoHeartFill />
            {comment.comment_likes}
          </div>
        </div>
        <div className="flex flex-col mb-8 mx-6">
          <Label className="text-right">{comment.content}</Label>
        </div>
        <div className="flex my-2 gap-6 mx-4">
          {session &&
            session.user &&
            session.user.user_id === comment.user_id && (
              <Button
                type="button"
                className="bg-orange-400"
                onClick={(evt) => {
                  handleEdit();
                }}
              >
                تعديل
              </Button>
            )}
          {isModalOpen && (
            <EditCommentModal
              comment={comment}
              onClose={handleModalClose}
              onSubmit={updateCommentMutation.mutate}
            />
          )}
          {session &&
            session.user &&
            (session.user.user_id === comment.user_id ||
              session.user.role === "admin") && (
              <Button
                type="button"
                className="bg-red-800"
                onClick={(evt) => {
                  onDelete(comment);
                }}
              >
                حذف
              </Button>
            )}
        </div>
      </div>
    </div>
  );
}
