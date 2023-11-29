import Navbar from "./Navbar";
import User from "@/models/user";

export default async function Header() {
  const res = await fetch(`http://localhost:8080/profile/`, {
    method: "GET",
    credentials: "include",
  });
  console.log(res.status);
  return <div />;
}
