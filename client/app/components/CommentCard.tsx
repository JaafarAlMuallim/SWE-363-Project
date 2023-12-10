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

  const handleEdit = () => {
    setIsModalOpen(true);
    console.log("handleEdit", isModalOpen);
    console.log("modal opened");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    console.log("handleClose", isModalOpen);
    console.log("modal closed");
  };

  const updateCommentMutation = useMutation(
    (updatedComment: Comment) => {
      handleModalClose();
      console.log("updateCommentMutation", updatedComment);
      return fetch(
        `http://localhost:8080/comment/${updatedComment.comment_id!}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session!.user.user_id}`,
          },
          body: JSON.stringify(updatedComment),
        },
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
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
      onSettled: () => {
        queryClient.invalidateQueries(["comments"]);
      },
    },
  );
  return (
    <div className="w-80 text-white bg-transparent rounded-lg">
      <div className="flex flex-col rounded-lg">
        <div className="w-full flex items-center justify-between p-4">
          <Label className="mb-1 text-base font-bold leading-tight text-white shadow-xl">
            {comment.user.username}
          </Label>
          <div className="flex flex-col justify-center items-center">
            <GoHeartFill />
            {comment.comment_likes}
          </div>
        </div>
        <div className="flex flex-col mb-8">
          <Label className="text-right">{comment.content}</Label>
        </div>
        <div className="flex my-2 gap-6 mx-4">
          <Button
            type="button"
            className="bg-orange-400"
            onClick={(evt) => {
              handleEdit();
            }}
          >
            تعديل
          </Button>
          {isModalOpen && (
            <EditCommentModal
              comment={comment}
              onClose={handleModalClose}
              onSubmit={updateCommentMutation.mutate}
            />
          )}
          <Button
            type="button"
            className="bg-red-800"
            onClick={(evt) => {
              onDelete(comment);
            }}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
}
