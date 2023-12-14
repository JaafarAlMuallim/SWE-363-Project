import { Sriracha } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const sriracha = Sriracha({
  subsets: ["latin"],
  weight: "400",
});
export default function Footer() {
  return (
    <footer className=" flex items-center justify-between flex-col text-special px-4 py-5 max-w-screen-xl mx-auto md:px-8 ">
      <div className="mt-8 ">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className={`${sriracha.className} text-2xl text-center`}
          >
            Pitfall
          </Link>
        </div>
        <div className="mt-4 sm:mt-0">جميع الحقوق محفوظة PitFall &copy;</div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link href="/">
                <Image
                  priority
                  className="rounded-full"
                  src="/x.png"
                  height={40}
                  width={40}
                  alt="twitter"
                />
              </Link>
            </li>

            <li>
              <Link href="/">
                <Image
                  priority
                  className="rounded-full"
                  src="/instgram.svg"
                  height={40}
                  width={40}
                  alt="instagram"
                />
              </Link>
            </li>

            <li>
              <Link href="/">
                <Image
                  priority
                  className="rounded-full"
                  src="/linkedIn.svg"
                  height={40}
                  width={40}
                  alt="linkedin"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
