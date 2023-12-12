"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const formSchema = z.object({
    name: z
      .string()
      .min(5, { message: "العنوان يجب أن يكون ٥ أحرف أو أكثر" })
      .trim(),
    founding_date: z
      .string()
      .min(5, { message: "العنوان الفرعي يجب أن يكون ٥ أحرف أو أكثر" })
      .trim(),
    description: z
      .string()
      .min(100, { message: "المحتوى يجب أن يكون ١٠٠ حرف أو أكثر" })
      .trim(),
    website: z.string().url({ message: "الموقع يجب أن يكون رابط" }),
    hq_location: z.string().min(3, { message: "الموقع يجب أن يكون رابط" }),
    org_status: z.string().min(3, { message: "الموقع يجب أن يكون رابط" }),
    main_sector: z.string().min(3, { message: "الموقع يجب أن يكون رابط" }),
    founders: z.string().min(3, { message: "الموقع يجب أن يكون رابط" }),
  });
  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      founding_date: "",
      description: "",
      website: "",
      hq_location: "",
      org_status: "",
      main_sector: "",
      founders: "",
    },
  });
  const { mutate: postOrg } = useMutation({
    mutationKey: "article",
    mutationFn: () => {
      return fetch(`http://localhost:8080/org/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.user?.user_id}`,
        },
        body: JSON.stringify({
          name: form.getValues("name"),
          founding_date: form.getValues("founding_date"),
          description: form.getValues("description"),
          website: form.getValues("website"),
          hq_location: form.getValues("hq_location"),
          org_status: form.getValues("org_status"),
          main_sector: form.getValues("main_sector"),
          founders: form.getValues("founders").split("،"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <section className="h-screen my-20">
      <Form {...form}>
        <form>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">اسم المؤسسة</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="اسم المؤسسة"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="founding_date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">تاريخ التأسيس</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="تاريخ التأسيس"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="website"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">موقع الشركة</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="موقع الشركة"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="hq_location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">مقر الشركة</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مقر الشركة"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="main_sector"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">القطاع الرئيسي</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="القطاع الرئيسي"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="org_status"
              control={form.control}
              render={({ field }) => (
                <FormItem dir="rtl">
                  <FormLabel className="text-white">حالة المؤسسة</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} dir="rtl">
                      <SelectTrigger
                        className="bg-inputbg w-36 text-white md:w-96"
                        dir="rtl"
                      >
                        <SelectValue placeholder="حالة المؤسسة" dir="rtl" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="success">شركة ناجحة</SelectItem>
                        <SelectItem value="failure">شركة غير ناجحة</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">وصف الشركة</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="وصف الشركة"
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="founders"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">اسماء المؤسسين</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اسماء المؤسسين -- الأول، الثاني، الثالث..."
                      onChange={field.onChange}
                      className="bg-inputbg w-36 text-white md:w-96"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8 my-12">
            <Button
              type="submit"
              className="bg-green-800"
              onClick={(evt) => {
                evt.preventDefault();
                postOrg();
                router.push("/organizations");
              }}
            >
              إنشاء
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
