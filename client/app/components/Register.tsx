import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "./DatePicker"
import RegisterForm from "../auth/RegisterForm"

export default function Register() {
    return (
        <Card className="w-96 bg-white bg-opacity-10 text-white shadow-md">
                <CardHeader>
                <CardTitle>تسجيل مستخدم جديد</CardTitle>
                <CardDescription className="text-gray-400">فضلا ادخل بياناتك</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
    )
}