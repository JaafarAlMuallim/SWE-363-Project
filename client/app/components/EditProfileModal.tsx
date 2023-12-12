import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactDOM from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import User from "@/models/user";
type Props = {
  user: User;
  onClose: () => void;
  onSubmit: (comment: any) => void;
};
export default function EditProfileModa({ user, onClose, onSubmit }: Props) {
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

  const profileSchema = z.object({
    username: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    email: z.string().email(),
    //image: z.string().url(),
  });
  type profileValues = z.infer<typeof profileSchema>;
  const form = useForm<profileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      // image: user.user_image,
    },
  });

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 gap-4">
      <Form {...form}>
        <form className="bg-black p-4 rounded-lg shadow-xl gap-4">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username" className="text-content">
                  اسم المستخدم
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-inputbg text-white w-full"
                    value={form.getValues("username")}
                    type="content"
                    onChange={field.onChange}
                    placeholder="اسم المستخدم"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-content">
                  الاسم
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-inputbg text-white w-full"
                    value={form.getValues("name")}
                    onChange={field.onChange}
                    placeholder="الاسم"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username" className="text-content">
                  البريد الالكتروني
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-inputbg text-white w-full"
                    value={form.getValues("email")}
                    type="email"
                    onChange={field.onChange}
                    placeholder="البريد الالكتروني"
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
              const newData: User = {
                ...user,
                username: form.getValues("username"),
                name: form.getValues("name"),
                email: form.getValues("email"),
                // user_image: form.getValues("image"),
              };
              form.setValue("name", "");
              form.setValue("username", "");
              form.setValue("email", "");
              //form.setValue("image", "");
              onSubmit(newData);
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