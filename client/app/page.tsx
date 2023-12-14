"use client";

import { Button } from "@/components/ui/button";
import Animation from "./components/Animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import Link from "next/link";
export default function Home() {
  // Function to navigate to a specific section on the page
  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      {/* Main container */}
      <div className="flex flex-col items-center justify-center text-content">
        {/* Title */}
        <div className=" text-3xl mx-5 mt-10">
          <h1>مكانك الأول لمعرفة كل ما يخص المشاريع الناشئة</h1>
        </div>
        <div></div>
        <div className=" text-white-500 text-3xl mx-5 mt-10">
          مهتمون بجميع المشاريع في قطاع
          {/* Animated text */}
          <span className="text-special inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
            <ul className="block animate-text-slide-5 text-right leading-tight [&_li]:block">
              <li className="mx-3 mb-1">المالية</li>
              <li className="mx-3 mb-1">التقنية</li>
              <li className="mx-3 mb-1">اللوجستيات</li>
              <li className="mx-3 mb-1">المطاعم</li>
              <li className="mx-3 mb-1">الاعلام</li>
              <li className="mx-3 mb-1" aria-hidden="true">
                المالية
              </li>
            </ul>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href="/auth">
            {/* Button to navigate to the login page */}
            <Button className="bg-cbtn text-content shadow-lg my-10 w-50">
              انضم لنا
            </Button>
          </Link>
          {/* Button to navigate to the next section */}
          <Button
            className="bg-cbtn text-content shadow-lg my-10 w-50"
            onClick={() => navigateToSection("section2")}
          >
            اعرف المزيد
          </Button>
        </div>

        <div>
          <section id="section2">
            <p className=" content-center mb-5 ml-5 mr-2">
              مرحبًا بك في منصتنا المبتكرة المخصصة للشركات الناشئة، حيث تتحقق
              الأحلام الريادية. إليك لماذا يجب عليك اختيارنا للحصول على رؤى
              فريدة، وتوجيه شامل، ودعم لا مثيل له
            </p>
            {/* Accordion component */}
            <Accordion className="  mb-10 ml-2 mr-1" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  تركيز خاص على الشركات الناشئة
                </AccordionTrigger>
                <AccordionContent>
                  نختص بشكل حصري في مجتمع الشركات الناشئة، مما يضمن أن يكون
                  محتوانا مركزًا بشكل كامل على التحديات، والفرص، والاتجاهات التي
                  تهم أكثر للأعمال الناشئة.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>مركز موارد شامل</AccordionTrigger>
                <AccordionContent>
                  يعتبر موقعنا مركزًا شاملاً للموارد، حيث يوفر مجموعة غنية من
                  المقالات والدلائل والأدوات التي تغطي كل جانب من جوانب رحلة
                  الشركة الناشئة - من الفكرة إلى التوسع.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>تحليلات ورؤى من قبل الخبراء</AccordionTrigger>
                <AccordionContent>
                  استفد من حكمة رواد الأعمال ذوي الخبرة، والخبراء في الصناعة،
                  ورؤوس الأفكار الذين يسهمون بمحتوى حصري، مما يوفر لك آراءً قيمة
                  واستراتيجيات للنجاح.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>الاتصال بالمجتمع</AccordionTrigger>
                <AccordionContent>
                  انضم إلى مجتمع نابض بالحياة من عشاق ريادة الأعمال. شارك في
                  المناقشات، وشارك التجارب، وقم ببناء اتصالات ذات مغزى مع رواد
                  الأعمال الآخرين والمرشدين والمستثمرين.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </>
  );
}
