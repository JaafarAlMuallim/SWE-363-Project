import React from "react";
import Image from "next/image";

import { UserCard } from "../components/UserCard";

const AboutUsPage = () => {
  return (
      <><section className="bg-crd2 text-center p-5  relative">
      <div className="bg-no-repeat bg-center bg-[url(/AboutUsbackgroundIcon.png)] absolute inset-0 opacity-40 " />
      <div className="flex flex-col items-center gap-4 relative">
        <div className="text-white text-4xl">
          قطاع ريادة الأعمال في تطور 
          <span className="font-bold"> مبهر</span>
        </div>

        <Image
          className="p-4"
          priority
          src={"/undraw_growth_curve_re_t5s7 1.svg"}
          width={500}
          height={500}
          alt="Guy showing something" />
        <div className="text-white text-2xl mt-3">
          لذلك قررنا ننشئ  <strong>Pitfall</strong> <br />
          المنصة الاولى عربيا المختصة في مجال رحلات رياديين الاعمال في الشرق
          الأوسط بأكمل شفافية
        </div>
      </div>
    </section><div className="text-center p-4">
        <div className="text-4xl text-white">فريق العمل</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UserCard
            iconPath="/bukha.png"
            name="أحمد بوخمسين"
            role="مبرمج"
            twitter="https://x.com/notbukha"
            linkedIn="https://www.linkedin.com/in/ahmed-bukhamsin-2174aa245/"
          ></UserCard>
          <UserCard
            iconPath="/bukha.png"
            name="أحمد عبدالعال"
            role=""
            twitter=""
            linkedIn=""
          ></UserCard>
          <UserCard
            iconPath="/bukha.png"
            name="Ahmed"
            role=""
            twitter=""
            linkedIn=""
          ></UserCard>
          <UserCard
            iconPath="/bukha.png"
            name="Ahmed"
            role=""
            twitter=""
            linkedIn=""
          ></UserCard>
        </div>
      </div></>
  );
};

export default AboutUsPage;
