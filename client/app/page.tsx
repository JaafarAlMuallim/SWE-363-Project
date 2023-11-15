"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
export default function Home() {
  return (
    <>
      <div className="text-white content-center text-3xl mb-5 ml-5 mr-5 mt-8 ">
        <h1>مكانك الأول لمعرفة كل ما يخص المشاريع الناشئة</h1>
      </div>
      <div className="mb-5 ml-5 mr-5">
        <Image src="/land-page-picture.png" alt="" width="500" height="500" />
      </div>
      <div>
        {" "}
        <Button className="text-white w-full bg-cyan-950	shadow-lg  ">
          استكشف المشاريع
        </Button>{" "}
      </div>

      <div>
        {" "}
        <p className="text-white content-center mb-5 ml-5 mr-2">
          مرحبًا بك في منصتنا المبتكرة المخصصة للشركات الناشئة، حيث تتحقق
          الأحلام الريادية. إليك لماذا يجب عليك اختيارنا للحصول على رؤى فريدة،
          وتوجيه شامل، ودعم لا مثيل له:
        </p>
        <Accordion
          className=" text-white mb-10 ml-2 mr-1"
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>تركيز خاص على الشركات الناشئة:</AccordionTrigger>
            <AccordionContent>
              نختص بشكل حصري في مجتمع الشركات الناشئة، مما يضمن أن يكون محتوانا
              مركزًا بشكل كامل على التحديات، والفرص، والاتجاهات التي تهم أكثر
              للأعمال الناشئة.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>مركز موارد شامل:</AccordionTrigger>
            <AccordionContent>
              يعتبر موقعنا مركزًا شاملاً للموارد، حيث يوفر مجموعة غنية من
              المقالات والدلائل والأدوات التي تغطي كل جانب من جوانب رحلة الشركة
              الناشئة - من الفكرة إلى التوسع.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>تحليلات ورؤى من قبل الخبراء:</AccordionTrigger>
            <AccordionContent>
              استفد من حكمة رواد الأعمال ذوي الخبرة، والخبراء في الصناعة، ورؤوس
              الأفكار الذين يسهمون بمحتوى حصري، مما يوفر لك آراءً قيمة
              واستراتيجيات للنجاح.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>الاتصال بالمجتمع:</AccordionTrigger>
            <AccordionContent>
              انضم إلى مجتمع نابض بالحياة من عشاق ريادة الأعمال. شارك في
              المناقشات، وشارك التجارب، وقم ببناء اتصالات ذات مغزى مع رواد
              الأعمال الآخرين والمرشدين والمستثمرين.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
