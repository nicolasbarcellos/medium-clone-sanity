import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-5 bg-media-blue">
      <div className="container flex justify-between container">
        <div className="flex items-center space-x-5">
          <Link href="/" passHref>
            <div className="relative h-[25px] w-[170px] object-cover">
              <Image
                layout="fill"
                className="object-cover cursor-pointer"
                src="/images/medium-logo.svg"
                alt="Medium"
              />
            </div>
          </Link>
          <ul className="hidden md:inline-flex items-center space-x-5">
            <li>
              <Link href="/">About</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li className="text-white bg-green-600 px-4 py-1 rounded-full">
              <Link href="/">Follow</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-5 text-green-600">
          <button className="">Sign in</button>
          <button className="border px-4 py-1 rounded-full border-green-600">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
