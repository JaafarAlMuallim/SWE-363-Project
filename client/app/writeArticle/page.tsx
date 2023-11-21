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
import TipTap from "./TipTap";
import { Button } from "@/components/ui/button";
export default function Page() {
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
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
  });
  return (
    <section className="h-screen my-20">
      <Form {...form}>
        <form className="flex flex-col gap-8">
          <div className="flex justify-center gap-20">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">العنوان</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="عنوان مقالتك"
                      onChange={field.onChange}
                      className="bg-inputbg w-64"
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
                      placeholder="عنوان مقالتك الفرعي"
                      onChange={field.onChange}
                      className="bg-inputbg w-64"
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
                  <TipTap content={""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-8">
            <Button type="submit" className="bg-green-800">
              إنشاء
            </Button>
            <Button type="button" className="bg-orange-800" onClick={() => {}}>
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
