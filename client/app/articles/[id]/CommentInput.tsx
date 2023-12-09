"use client";
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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function CommentInput({
  handleSubmit,
}: {
  handleSubmit: (content: string, bearer: string) => Promise<void>;
}) {
  const { data: session } = useSession();
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
  if (!session?.user) return null;
  return (
    <Form {...form}>
      <form
        onSubmit={() =>
          handleSubmit(form.getValues("content"), session!.user.user_id!)
        }
      >
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
        <Button className="w-full bg-cbtn shadow-lg mt-2 text-content">
          إرسال
        </Button>
      </form>
    </Form>
  );
}
