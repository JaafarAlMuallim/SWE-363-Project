import Organization from "@/models/org";
import Image from "next/image";
import Link from "next/link";

export default function OrgCard(props: { org: Organization }) {
  return (
    <Link href={`/organizations/${props.org.id}`}>
      <div className="my-5 mx-5 shadow-xl px-10 rounded-lg bg-crd2 py-10">
        <Image
          src={props.org.image!}
          alt=""
          className="rounded my-10"
          width={320}
          height={320}
        />
        <div className="my-2 text-xl font-semibold text-right text-purple-500">
          <p>{props.org.founding_date}</p>
        </div>
        <div className="my-3 text-2xl font-semibold text-right text-white">
          <p>{props.org.name}</p>
        </div>
        <div className="my-5 text-xl font-semibold text-right text-white">
          <p className="">{props.org.description}</p>
        </div>
      </div>
    </Link>
  );
}
