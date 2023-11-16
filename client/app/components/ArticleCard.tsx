import Article from "@/models/article";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { GoHeartFill } from "react-icons/go"

export default function ArticleCard(props: { article: Article }) {
    return (
        <Link href={`/articles/${props.article.id}`}>
            <div className="block w-80 rounded-lg bg-cover shadow-lg bg-[url(/test.jpg)]">
                <div className="w-full h-full flex items-center justify-between p-8 backdrop-brightness-50 rounded-lg">
                    <Label className="mb-2 text-lg font-bold leading-tight text-white dark:text-neutral-50 shadwo-xl">
                        {props.article.title}
                    </Label>
                    <div className="flex flex-col justify-center items-center">
                        <GoHeartFill />{props.article.likes}
                    </div>
                    
                </div>  
            </div>
        </Link>
    )
}