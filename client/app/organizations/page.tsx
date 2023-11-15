import OrgCard from "./orgCard";
import Organization from "@/models/org";

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
export default async function Organizations() {
  // fetch data from server

  return (
    // TODO: map through the elements and show them
    <>
      <div>
        <hr className="w-screen" />
        <div className="my-2 text-white text-5xl text-center font-semibold">
          <span>الشركات</span>
        </div>
        <hr />
      </div>
      <div className="flex flex-col gap-10">
        {orgs.map((org) => {
          return <OrgCard org={org} key={org.id} />;
        })}
      </div>
    </>
  );
}
