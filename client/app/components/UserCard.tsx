import React from "react";
import Image from "next/image";
import { link } from "fs";
interface Probs {
  iconPath: string;
  name: string;
  role: string;
  twitter?: string;
  linkedIn?: string;
}

export const UserCard = ({
  iconPath,
  name,
  role,
  twitter,
  linkedIn,
}: Probs) => {
  return (
    <>
      <div className="bg-gradient-to-br from-crd to-crd2 p-5 w-64 rounded-lg flex flex-col gap-2 m-3">
        <Image
          priority
          src={iconPath}
          alt="Bukha's image"
          width={800}
          height={800}
        ></Image>
        <div className="text-3xl text-content">{name}</div>
        <div className="text-2xl text-content">{role}</div>
        <div className="flex flex-row content-center justify-center gap-4">
          {twitter && (
            <a href={twitter}>
              <Image
                priority
                src={"/x.png"}
                alt="twitter"
                width={45}
                height={45}
              ></Image>
            </a>
          )}
          {linkedIn && (
            <a href={linkedIn}>
              <Image
                priority
                src={"/linkedin-square-icon.png"}
                alt="twitter"
                width={45}
                height={45}
              />
            </a>
          )}
        </div>
      </div>
    </>
  );
};
