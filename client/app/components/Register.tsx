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

export default function Register() {
    return (
        <Card className="w-96 bg-white bg-opacity-10 text-white shadow-md">
                <CardHeader>
                <CardTitle>تسجيل مستخدم جديد</CardTitle>
                <CardDescription className="text-gray-400">فضلا ادخل بياناتك</CardDescription>
                </CardHeader>
                <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col justify-end space-y-1.5">
                            <Label htmlFor="name">الاسم</Label>
                            <Input id="name" type="text" placeholder="محمد علي" className="bg-inputbg" />
                        </div>
                        <div className="flex flex-col justify-end space-y-1.5">
                            <Label htmlFor="email">البريد الالكتروني</Label>
                            <Input id="email" type="email" placeholder="example@gmail.com" className="bg-inputbg" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input id="password" type="password" placeholder="ادخل كلمة المرور" className="bg-inputbg" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">تاريخ الميلاد</Label>
                            <DatePicker />
                        </div>
                    </div>
                </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="w-full bg-cbtn">سجل</Button>
                </CardFooter>
            </Card>
    )
}