import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "../components/Register";
import Login from "../components/Login";
import { Label } from "@/components/ui/label";
import { Sriracha } from "next/font/google";
const sriracha = Sriracha({
  subsets: ["latin"],
  weight: "400"
});
export default function Auth() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Label className={`${sriracha.className} text-white text-8xl m-8` }>Pitfall</Label>
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
    </div>
  );
}
