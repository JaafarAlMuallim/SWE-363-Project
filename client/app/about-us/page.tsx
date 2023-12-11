"use client";
import React from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "./AboutUsAnimation.json";

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
          <Lottie
            className="w-7/8 h-7/8 lg:w-2/6"
            animationData={animationData}
          />

          <div className=" text-2xl mt-3">
            لذلك قررنا ننشئ <strong>Pitfall</strong> <br />
            المنصة الاولى عربيا المختصة في مجال رحلات رياديين الاعمال في الشرق
            الأوسط بأكمل شفافية
          </div>
        </div>
      </section>
      <div className="text-center text-content p-4">
        <div className="text-4xl ">فريق العمل</div>
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
      </div>
    </>
  );
};

export default AboutUsPage;
