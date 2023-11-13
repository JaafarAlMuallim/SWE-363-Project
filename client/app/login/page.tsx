import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "../components/Register";
import Login from "../components/Login";

export default function Auth() {
  return (
    <Tabs defaultValue="login" dir="rtl" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2 bg-secondaryDark">
        <TabsTrigger value="login">تسجيل دخول</TabsTrigger>
        <TabsTrigger value="register">تسجيل جديد</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="flex justify-center">
        <Login />
      </TabsContent>
      <TabsContent value="register" className="flex justify-center">
        <Register />
      </TabsContent>
    </Tabs>
  );
}
