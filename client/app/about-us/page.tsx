import React from "react";
import Image from "next/image";

import { UserCard } from "../components/UserCard";

const AboutUsPage = () => {
  return (
    <div className="h-screen">
      <section className="bg-sky-500 text-center p-5  relative">
        <div className="bg-no-repeat bg-center bg-[url(/AboutUsbackgroundIcon.png)] absolute inset-0 opacity-40 " />
        <div className="flex flex-col items-center gap-4 relative">
          <div className="text-white text-4xl">
            ...قطاع ريادة الأعمال في تطور
            <div className="font-bold underline">مبهر</div>
          </div>

          <Image
            className="p-4"
            priority
            src={"/undraw_growth_curve_re_t5s7 1.svg"}
            width={500}
            height={500}
            alt="Guy showing something"
          />
          <div className="text-white text-2xl mt-3">
            <strong>Pitfall</strong> لذلك قررنا ننشئ <br />
            المنصة الاولى عربيا المختصة في مجال رحلات رياديين الاعمال في الشرق
            الأوسط بأكمل شفافية
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        <div className="text-4xl text-white">فريق العمل</div>
        <div className="flex flex-col gap-4 items-center">
          <UserCard
            iconPath="/bukha.png"
            name="احمد كامل بوخمسين"
            role="مبرمج"
            twitter="https://x.com/notbukha"
            linkedIn="https://www.linkedin.com/in/ahmed-bukhamsin-2174aa245/"
          ></UserCard>
          <UserCard
            iconPath="/bukha.png"
            name="Ahmed"
            role=""
            twitter=""
            linkedIn=""
          ></UserCard>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
