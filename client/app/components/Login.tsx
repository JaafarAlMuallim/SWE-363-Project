import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../auth/LoginForm";
import { FaGoogle } from "react-icons/fa";

export default function Login() {
  return (
    <Card className="w-96 bg-white bg-opacity-10 text-white shadow-lg">
      <CardHeader>
        <CardTitle>تسجيل الدخول</CardTitle>
        <CardDescription className="text-gray-400">
          فضلا ادخل بياناتك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <div className="flex flex-col justify-center items-center">
        <div className="mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-white after:ml-4 after:block after:h-px after:flex-grow after:bg-white">
          او باستخدام
        </div>
        <Button className="w-[300px] bg-cbtn m-3 shadow-lg flex gap-2">
           Google<FaGoogle />
        </Button>
       
      </div>
    </Card>
  );
}
