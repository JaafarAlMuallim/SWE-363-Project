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
import { FaGoogle } from 'react-icons/fa'

export default function Login() {
    return (
        <Card className="w-96 bg-white bg-opacity-10 text-white shadow-lg">
            <CardHeader>
                <CardTitle>تسجيل الدخول</CardTitle>
                <CardDescription className="text-gray-400">فضلا ادخل بياناتك</CardDescription>
            </CardHeader>
            <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col justify-end space-y-1.5">
                        <Label htmlFor="email">البريد الالكتروني</Label>
                        <Input id="email" type="email" placeholder="example@gmail.com" className="bg-inputbg" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">كلمة المرور</Label>
                        <Input id="password" type="password" placeholder="ادخل كلمة المرور" className="bg-inputbg" />
                    </div>
                </div>
            </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="w-full bg-cbtn shadow-lg">دخول</Button>
            </CardFooter>
            <div className="flex flex-col justify-center items-center">
            <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
                    او باستخدام
            </div>
                <Button className="w-[300px] bg-cbtn m-3 shadow-lg flex gap-2">Google<FaGoogle/></Button>  
            </div>
        </Card>

    )
}