import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import RegisterForm from "../auth/RegisterForm"

export default function Register() {
    return (
        <Card className="w-96 bg-white bg-opacity-10 text-content shadow-md">
                <CardHeader>
                <CardTitle>تسجيل مستخدم جديد</CardTitle>
                <CardDescription className="text-gcontent2">فضلا ادخل بياناتك</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
    )
}