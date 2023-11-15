import Organization from "@/models/org";
import Image from "next/image";

const orgs: Organization[] = [
  {
    id: 1,
    name: "منظمة الصحة العالمية",
    description:
      "loreem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    image: "next.svg",
    founding_date: "2012-12-12",
    website: "https://www.who.int/",
    hq_city: "Geneva, Switzerland",
  },
  {
    id: 2,
    name: "منظمة الصحة العالمية",
    description:
      "loreem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    image: "next.svg",
    founding_date: "2012-12-12",

    website: "google.com",
    hq_city: "Geneva, Switzerland",
  },
];
export default function Organization({
  params,
}: {
  params: { org_id: string };
}) {
  // fetch the org with the id of params.article_id
  let org: Organization;
  if (params.org_id === "1") {
    org = orgs[0];
  } else {
    org = orgs[1];
  }

  return (
    <div className="h-screen my-20 text-white flex flex-col justify-start items-center gap-5">
      <Image src={`../${org.image!}`} alt={"Image"} width={400} height={400} />
      <h1 className="text-4xl text-center">{org.name}</h1>
      <p>{org.hq_city}</p>
      <p>{org.description}</p>
      <p>{org.founding_date}</p>
      <p>Author Card To be implemented with About us page before</p>
    </div>
  );
}
