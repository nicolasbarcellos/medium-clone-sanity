import Image from "next/image";
import { AiOutlineMedium } from "react-icons/ai";

export default function Hero() {
  return (
    <section className="bg-media-blue pt-10 lg:pb-4 pb-8 border-y border-y-black">
      <div className="container flex items-center justify-center lg:justify-between">
        <div className="space-y-5 max-w-xl">
          <h2 className="text-5xl lg:text-7xl  font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to write, read, and connect
          </h2>
          <p>
            It&apos;s easy and free to post your thinking on any topic and
            connect with millions of readers.
          </p>
          <button
            className="bg-white border border-black
           rounded-full px-4 py-2"
          >
            Start Writing
          </button>
        </div>
        <div className="max-w-[400px] w-full hidden md:block mr-0 lg:mr-20">
          <AiOutlineMedium className="object-cover w-full h-full" />
        </div>
      </div>
    </section>
  );
}
