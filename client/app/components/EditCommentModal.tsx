import { FormEvent, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactDOM from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Comment from "@/models/comment";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "react-query";
import { queryClient } from "@/app/components/QueryProvider";
type Props = {
  comment: Comment;
  onClose: () => void;
  onSubmit: (comment: any) => void;
};
export default function EditCommentModal({
  comment,
  onClose,
  onSubmit,
}: Props) {
  const { data: session } = useSession();
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const commentSchema = z.object({
    content: z.string().min(1).max(1000),
  });
  type commentValues = z.infer<typeof commentSchema>;
  const form = useForm<commentValues>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: comment.content!,
    },
  });

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Form {...form}>
        <form className="bg-gradient-to-br z-50 from-crd to-crd2 p-4 rounded-lg shadow-xl gap-4 w-96">
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
                    className="bg-inputbg text-content w-full"
                    value={form.getValues("content")}
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
            type="button"
            className="w-full bg-cbtn shadow-lg mt-2 text-content"
            onClick={(evt) => {
              evt.preventDefault();
              const newComment: Comment = {
                ...comment,
                content: form.getValues("content"),
              };
              form.setValue("content", "");
              onSubmit(newComment);
            }}
          >
            إرسال
          </Button>
          <Button
            type="button"
            className="w-full bg-cbtn shadow-lg mt-2 text-content"
            onClick={onClose}
          >
            إلغاء
          </Button>
        </form>
      </Form>
    </div>,
    modalRoot,
  );
}
