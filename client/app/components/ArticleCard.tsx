import Article from "@/models/article";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { GoHeartFill } from "react-icons/go"

export default function ArticleCard(props: { article: Article }) {
    return (
        <Link href={`/articles/${props.article.id}`}>
            <div className="block w-80 text-white rounded-lg bg-cover shadow-lg bg-[url(/test.jpg)]">
                <div className="flex flex-col backdrop-brightness-50 rounded-lg">
                    <div className="w-full flex items-center justify-between p-6">
                        <Label className="mb-1 text-lg font-bold leading-tight text-white shadwo-xl">
                            {props.article.title}
                        </Label>
                        <div className="flex flex-col justify-center items-center">
                            <GoHeartFill />{props.article.likes}
                        </div>
                    </div>
                    <div className="my-2">
                        {props.article.tags!.map((tag, index) => {
                            return (
                                <div key={index} className='bg-gray-600 bg-opacity-75 px-2 mx-1 rounded-full inline text-center text-xs font-semibold'>
                                    {tag}
                                </div>
                            );
                            })}
                    </div>
                </div>
            </div>
        </Link>
    )
}