"use client";

import Org from "@/models/org";
import Image from "next/image";

export default function OrganizationCard(props: { org: Org }) {
  return (
    <article className="bg-gradient-to-br from-crd to-crd2 overflow-hidden rounded-lg shadow-lg mx-8 my-4 w-80">
      <Image
        priority
        alt="Placeholder"
        className="rounded-t-lg"
        src="/test.jpg"
        width={400}
        height={400}
      />
      <header className="flex items-center justify-between w-full leading-tight mt-4">
        <div className="flex items-center">
          <div className="mr-2">
            <span className="text-gcontent2 text-sm">
              {props.org.founding_date}
            </span>
          </div>
        </div>
      </header>
      <div className="text-content px-2">
        <h1 className="text-xl">{props.org.name}</h1>
        <h2 className="text-l text-gcontent2 text-ellipsis py-2">
          {`${props.org.description.slice(0, 80)}...`}
        </h2>
      </div>
    </article>
  );
}
