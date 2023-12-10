import { ReactNode } from "react";
export default function Card(props: { children: ReactNode }) {
  return (
    <div className={`p-4 shadow-2xl rounded-md bg-white`}>{props.children}</div>
  );
}
