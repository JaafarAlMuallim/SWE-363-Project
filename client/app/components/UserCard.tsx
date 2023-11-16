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
      <div className="bg-sky-500 p-5 w-1/2 rounded max-w-lg flex flex-col gap-2 m-3">
        <Image
          src={iconPath}
          alt="Bukha's image"
          width={800}
          height={800}
        ></Image>
        <div className="text-3xl text-white">{name}</div>
        <div className="text-2xl text-white">{role}</div>
        <div className="flex flex-row content-center justify-center gap-4">
          {twitter && (
            <a href={twitter}>
              <Image
                src={"/twitter-x-logo-42554.png"}
                alt="twitter"
                width={75}
                height={75}
              ></Image>
            </a>
          )}
          {linkedIn && (
            <a href={linkedIn}>
              <Image
                src={"/linkedin-square-icon.png"}
                alt="twitter"
                width={75}
                height={75}
              ></Image>
            </a>
          )}
        </div>
      </div>
    </>
  );
};
