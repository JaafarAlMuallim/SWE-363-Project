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
        <CardTitle className="text-content">تسجيل دخول</CardTitle>
        <CardDescription className="text-gcontent2">
          فضلا ادخل بياناتك
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <div className="flex flex-col justify-center items-center text-content">
        <div className="mx-auto my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-content after:ml-4 after:block after:h-px after:flex-grow after:bg-content">
          او باستخدام
        </div>
        <Button className="w-[300px] bg-cbtn text-content m-3 shadow-lg flex gap-2">
           Google<FaGoogle />
        </Button>
       
      </div>
    </Card>
  );
}
