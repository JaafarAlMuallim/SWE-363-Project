"use client";
import React from "react";
import { UserCard } from "../components/UserCard";

const AboutUsPage = () => {
  return (
    <>
      <section className="bg-crd w-full text-center p-5  relative">
        <div className="bg-no-repeat bg-center bg-[url(/AboutUsbackgroundIcon.png)] absolute inset-0 opacity-40 " />
        <div className="flex flex-col items-center gap-4 relative text-content">
          <div className=" text-4xl">
            قطاع ريادة الأعمال في تطور
            <span className="font-bold"> مبهر</span>
          </div>

          <div className=" text-2xl mt-3">
            لذلك قررنا ننشئ <strong>Pitfall</strong> <br />
            المنصة الاولى عربيا المختصة في مجال رحلات رياديين الاعمال في الشرق
            الأوسط بأكمل شفافية
          </div>
        </div>
      </section>
      <div className="text-center text-content p-4">
        <div className="text-4xl ">فريق العمل</div>
        {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
        <div className="flex flex-col sm:flex-cols-2 md:flex-cols-2 lg:flex-cols-3 lg:flex-row gap-6">
          <UserCard
            iconPath="/Avatar.png"
            name="جعفر المعلم"
            role="مبرمج"
            twitter="https://x.com/Ja3far032"
            linkedIn="http://linkedin.com/in/jaafar-al-muallim"
          />
          <UserCard
            iconPath="/bukha.png"
            name="أحمد العبدالعال"
            role="مصمم"
            twitter="https://x.com/notbukha"
            linkedIn="https://www.linkedin.com/in/ahmed-bukhamsin-2174aa245/"
          />
          <UserCard
            iconPath="/bukha.png"
            name="محمد المهدود"
            role="مصمم"
            twitter="https://x.com/m7m__7"
            linkedIn="https://www.linkedin.com/in/mohamd-al-mahdood-/"
          />
          <UserCard
            iconPath="/bukha.png"
            name="أحمد بوخمسين"
            role="مبرمج"
            twitter="https://x.com/notbukha"
            linkedIn="https://www.linkedin.com/in/ahmed-bukhamsin-2174aa245/"
          />
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
