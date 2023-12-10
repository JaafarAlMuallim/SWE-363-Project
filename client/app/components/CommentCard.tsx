"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Comment from "@/models/comment";
import { GoHeartFill } from "react-icons/go";

export default function CommentCard({
  comment,
  onDelete,
}: {
  comment: Comment;
  onDelete(comment: Comment): void;
}) {
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
              evt.preventDefault();
            }}
          >
            تعديل
          </Button>
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
